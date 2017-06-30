"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stdin = process.stdin;
const child_process_1 = require("child_process");
// without this, we would only get streams once enter is pressed
stdin.setRawMode(true);
// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();
// i don't want binary, do you?
stdin.setEncoding('utf8');
// on any data into stdin
stdin.on('data', function (key) {
    // ctrl-c ( end of text )
    if (key === '\u0003') {
        process.exit();
    }
    else {
        if (key === '\u001B\u005B\u0041') {
            child_process_1.exec('mpc volume +1', function () { });
        }
        else if (key === '\u001B\u005B\u0042') {
            child_process_1.exec('mpc volume -1', function () { });
        }
        else {
            console.log('No control found for this key.');
        }
    }
});
