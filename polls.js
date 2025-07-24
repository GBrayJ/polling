// MeshCentral Polls Plugin
// Main aplication

module.exports.polls = function(parent) {
    var obj = {};
    obj.parent = parent;
    obj.meshServer = parent.parent;
    obj.db = null;

    obj.askQuestion = function(nodeid, question, type, options) {
        obj.meshServer.sendToNode(nodeid, { action: 'polls_ask', question: question, type: type, options: options });
    };

    obj.answerQuestion = function(nodeid, question, answer, type, options) {
        obj.db.run("INSERT INTO polls (nodeid, question, answer, type, options) VALUES (?, ?, ?, ?, ?)", [nodeid, question, answer, type, options]);
    };

    // Called when the plugin is loaded
    obj.init = function(db) {
        obj.db = db;

        // Create the polls table if it doesn't exist
        obj.db.run("CREATE TABLE IF NOT EXISTS polls (nodeid TEXT, question TEXT, answer TEXT, type TEXT, options TEXT)");

        obj.meshServer.on('agentCoreDirect', function(meshserver, module, data, nodeid) {
            if (module.name == 'polls') {
                if (data.action == 'polls_answer') {
                    obj.answerQuestion(nodeid, data.question, data.answer, data.type, data.options);
                }
            }
        });

        obj.meshServer.on('plugin', function(packet) {
            if (packet.plugin == 'polls') {
                if (packet.command == 'ask') {
                    obj.askQuestion(packet.data.nodeid, packet.data.question, packet.data.type, packet.data.options);
                }
            }
        });
    };

    return obj;
};