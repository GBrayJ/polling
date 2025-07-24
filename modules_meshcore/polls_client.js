const fs = require('fs');
const os = require('os');
const path = require('path');

function showQuestion(question) {
    const dialog = require('electron').dialog;
    const answer = dialog.showInputBox({ title: 'Poll', message: question });
    return answer;
}

function handlePluginMessage(msg) {
    if (msg.action === 'polls_ask') {
        const answer = showQuestion(msg.question);
        const response = {
            action: 'polls_answer',
            question: msg.question,
            answer: answer
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