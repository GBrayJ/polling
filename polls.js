// MeshCentral Polls Plugin
// Main aplication

module.exports.polls = function(parent) {
    var obj = {};
    obj.parent = parent;
    obj.meshServer = parent.parent;
    obj.db = null;

    obj.askQuestion = function(nodeid, question) {
        obj.meshServer.sendToNode(nodeid, { action: 'polls_ask', question: question });
    };

    obj.answerQuestion = function(nodeid, question, answer) {
        obj.db.run("INSERT INTO polls (nodeid, question, answer) VALUES (?, ?, ?)", [nodeid, question, answer]);
    };

    // Called when the plugin is loaded
    obj.init = function(db) {
        obj.db = db;

        // Create the polls table if it doesn't exist
        obj.db.run("CREATE TABLE IF NOT EXISTS polls (nodeid TEXT, question TEXT, answer TEXT)");

        obj.meshServer.on('agentCoreDirect', function(meshserver, module, data, nodeid) {
            if (module.name == 'polls') {
                if (data.action == 'polls_answer') {
                    obj.answerQuestion(nodeid, data.question, data.answer);
                }
            }
        });

        obj.meshServer.on('plugin', function(packet) {
            if (packet.plugin == 'polls') {
                if (packet.command == 'ask') {
                    obj.askQuestion(packet.data.nodeid, packet.data.question);
                }
            }
        });
    };

    return obj;
};