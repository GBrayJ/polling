const fs = require('fs');
const os = require('os');
const path = require('path');

function showQuestion(question, type, options) {
    const dialog = require('electron').dialog;
    if (type === 'boolean') {
        const result = dialog.showMessageBoxSync({ title: 'Poll', message: question, buttons: ['Yes', 'No'] });
        return result === 0 ? 'Yes' : 'No';
    } else if (type === 'multiple-choice') {
        const result = dialog.showMessageBoxSync({ title: 'Poll', message: question, buttons: options });
        return options[result];
    } else {
        const answer = dialog.showInputBox({ title: 'Poll', message: question });
        return answer;
    }
}

function handlePluginMessage(msg) {
    if (msg.action === 'polls_ask') {
        const answer = showQuestion(msg.question, msg.type, msg.options);
        const response = {
            action: 'polls_answer',
            question: msg.question,
            answer: answer,
            type: msg.type,
            options: msg.options
        };
        process.stdout.write(JSON.stringify(response));
    }
}

process.stdin.on('data', (data) => {
    try {
        const msg = JSON.parse(data.toString());
        handlePluginMessage(msg);
    } catch (e) {}
});