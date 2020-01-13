//
// This is a test.js enabled test program for testing the radio code to diagnose issues for users
//
// You will need node.js v10+ or greater to execute
//
// run tests by:  
//
//  node test.js
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
        console.log(`test.js-cb: received OTmsg=${msg}`);
    });
};


// every 14 seconds toggle an OOK switch/teach message
var intervalId = setInterval(() => {
    let zone = 1;
    let switchNum = 1;
    switchState = !switchState;
    let xmits = 20;
    console.log(`test.js: switching ${zone}:${switchNum}:${switchState}`)
    var ret = ener314rt.ookSwitch(zone, switchNum, switchState, xmits);
}, 14000);

// every 30 seconds get the discovered deviceList
var intervalId2 = setInterval(() => {
    var devices = ener314rt.openThingsDeviceList(false);
    console.log(`test.js: deviceList=${devices}`);
}, 30000);

// Capture ^C, stop monitoring
process.on('SIGINT', function () {
    console.log("test.js: Caught interrupt signal, stopping...");
    ener314rt.stopMonitoring();

    // Allow time for monitor thread to complete after timeout and close properly, do this as a cb to not block main event loop
    setTimeout(function () {
        console.log("test.js: finalizing close");
        ener314rt.closeEner314rt();
        process.exit();
    },10000);
});

// Initialise radio adaptor
console.log("test.js: Initialising board");
var ret = ener314rt.initEner314rt(false);
if (ret != 0) {
    console.log(`test.js: ERROR: Cannot initialise ENER314-RT board, status=${ret}`);
    console.log("test.js: Quitting");
    process.exit();
} else {
    // start monitoring thread
    console.log("test.js: Starting monitoring...");
    startMonitoringThread();
}