//
// This is a radio-test enabled test program for testing the radio code to diagnose issues for users
//
// You will need node.js v10+ or greater to execute
//
// run tests by:  
//
//  1) node radio-test.js
//
// @Achronite - January 2020
//
"use strict";

var path = require('path');
var switchState = false;

// This uses the local module build, replace if using actual node.js module
var ener314rt = require(path.join(__dirname, 'build/Release/ener314rt'));

// monitor thread version in ener314rt uses a callback to return monitor messages directly (collected below), it needs the callback passing in
function startMonitoringThread() {
    ener314rt.openThingsReceiveThread(10000, (msg) => {
        //console.log(`asyncOpenThingsReceive ret=${ret}`);
        console.log(`radio-test-cb: received OTmsg=${msg}`);
    });
};


// every 14 seconds toggle an OOK switch/teach message
var intervalId = setInterval(() => {
    let zone = 1;
    let switchNum = 1;
    switchState = !switchState;
    let xmits = 20;
    console.log(`radio-test: switching ${zone}:${switchNum}:${switchState}`)
    var ret = ener314rt.ookSwitch(zone, switchNum, switchState, xmits);
}, 14000);

// every 30 seconds get the discovered deviceList
var intervalId2 = setInterval(() => {
    var devices = ener314rt.openThingsDeviceList(false);
    console.log(`radio-test: deviceList=${devices}`);
}, 30000);


// Initialise radio adaptor
console.log("radio-test: Initialising");
var ret = ener314rt.initEner314rt(false);
console.log(`radio-test: N-API radio_init returned ${ret}`);