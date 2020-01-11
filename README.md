# ener314rt-debug
Test program to diagnose issues with ener314rt and node.

This code runs completely independently of node module, and contains a clone of energenie-ener314rt v0.3.2 with debug output enabled.

## Check you have node installed, at least version 10
``$ node -v``

## To compile code
``$ node-gyp rebuild``
If you do not have node-gyp, please install using ``$ npm install -g node-gyp``

## To run
``$ node test.js``

The program performs a continuous on/off switch of 1 OOK device (every 14 seconds) and also executes the monitor thread for FSK devices.  It also returns a discovered device list of FSK devices every 30 seconds.

You can use the OOK switch transmissions to train a 'control' or 'green button' device.

You can use the test.js file as a basis for your node based module, but please utilise the released module energenie-ener314rt instead.

# About

Raise any bugs/queries here: https://github.com/Achronite/ener314rt-debug/issues

@Achronite - January 2020, uses energenie-ener314rt v0.3.2