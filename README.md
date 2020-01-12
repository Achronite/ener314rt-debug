# ener314rt-debug
Test program to diagnose issues with ener314rt and node.

This code runs completely independently of node module, and contains a clone of energenie-ener314rt v0.3.2 with debug output enabled.

## Check you have node installed, at least version 10
``$ node -v``

## To install and compile code
```
$ wget https://github.com/Achronite/ener314rt-debug/archive/master.zip
$ unzip master.zip
$ cd ener314*
$ node-gyp rebuild
```
If you do not have node-gyp, please install using ``$ npm install -g node-gyp``

## To run
``$ node test.js``

This program: 
* does a continuous on/off switch of 1 OOK device (every 14 seconds) - You can use this to teach a 'control' or 'green button' device.
* executes the monitor thread for FSK devices
* outputs any FSK messages received
* returns a list of discovered FSK devices every 30 seconds.

You can use the test.js file as a basis for creating a node module, but please utilise the released module **energenie-ener314rt** instead of the cloned code here to ensure you have the latest version.

# About

Raise any bugs/queries here: https://github.com/Achronite/ener314rt-debug/issues

@Achronite - January 2020, uses energenie-ener314rt v0.3.2