function pluginCommand(data, callback) {
    meshserver.send({ action: 'plugin', plugin: 'polls', command: 'ask', data: data }, function(response) {
        if (callback) callback(response);
    });
}