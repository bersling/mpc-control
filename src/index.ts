#!/usr/bin/env node

var stdin: any = process.stdin;

import { exec } from 'child_process';

// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding( 'utf8' );

// on any data into stdin
stdin.on( 'data', function( key ){

  // ctrl-c ( end of text )
  if ( key === '\u0003' ) {
    process.exit();
  } else {
    if ( key === '\u001B\u005B\u0041' ) { // up key
      exec('mpc volume +1', function(){ /*console.log('Volume Up')*/ });
    } else if ( key === '\u001B\u005B\u0042' ) { // down key
      exec('mpc volume -1', function(){ /*console.log('Volume Down')*/ });
    } else if ( parseInt(key)  ) { // keys from 1 - 9
      exec(`mpc play ${key}`);
    } else if ( key === 'p') {
      exec('mpc play');
    } else if ( key === 's') {
      exec('mpc stop');
    } else {
      console.log('No control found for this key.');
    }
  }

});
