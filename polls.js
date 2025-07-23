const path = require('path');
const db = require('SimpleDataStore');

module.exports.polls = function (parent) {
    const obj = {};
    obj.parent = parent;
    obj.meshserver = parent.parent;
    obj.pluginName = 'polls';
    obj.db = new db({filename: path.join(obj.meshserver.datapath, 'polls.db'), backup: true});

    obj.handleAdminReq = function (req, res, user) {
        if (req.body && req.body.action === 'sendQuestion') {
            const { deviceId, question, questionType, options } = req.body;
            obj.meshserver.toDevice(deviceId, {
                action: 'askQuestion',
                question: question,
                questionType: questionType,
                options: options
            });
            res.json({ success: true });
            return;
        }

        obj.meshserver.getAllDevices(function (err, devices) {
            obj.db.find({}, function (err, results) {
                const adminTemplatePath = path.join(__dirname, 'views', 'admin');
                res.render(adminTemplatePath, { pluginName: obj.pluginName, devices: devices, results: results });
            });
        });
    };

    obj.onDeviceConnect = function (mesh, user, device) {
        device.on('message', function (msg) {
            if (msg.action === 'answerQuestion') {
                msg.deviceName = device.name;
                obj.db.insert(msg);
            }
        });

        // Inject client-side script
        obj.meshserver.toDevice(device._id, {
            action: 'eval',
            value: `
                const meshcentral = require('meshcentral');
                meshcentral.on('message', function (msg) {
                    if (msg.action === 'askQuestion') {
                        let answer;
                        if (msg.questionType === 'boolean') {
                            answer = confirm(msg.question);
                        } else if (msg.questionType === 'mc') {
                            const options = msg.options.split(',');
                            let promptText = msg.question + '\n\n';
                            for (let i = 0; i < options.length; i++) {
                                promptText += (i + 1) + '. ' + options[i] + '\n';
                            }
                            answer = prompt(promptText);
                        } else {
                            answer = prompt(msg.question);
                        }

                        meshcentral.send({
                            action: 'answerQuestion',
                            question: msg.question,
                            answer: answer,
                            questionType: msg.questionType
                        });
                    }
                });
            `
        });
    };

    obj.server_startup = function() {
        // TODO: Implement logic on server startup
    };

    // Expose the handleAdminReq function to the parent module
    obj.parent.handleAdminReq = obj.handleAdminReq;

    return obj;
};