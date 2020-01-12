# ener314rt-debug
Test program to diagnose issues with ener314rt and node.

This code runs completely independently of the node module it is based on, and contains a clone of the energenie-ener314rt v0.3.2 code, but with debug output enabled.

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

The program will continue until manually stopped (use **Ctrl-C**).

This program: 
* does a continuous on/off switch of 1 OOK device (every 14 seconds) - You can use this to teach a 'control' or 'green button' device.
* executes the monitor thread for FSK devices
* outputs any FSK messages received
* returns a list of discovered FSK devices every 30 seconds.

You can use the test.js file as a basis for creating a node module, but please utilise the released module **energenie-ener314rt** instead of the cloned code here to ensure you have the latest version.

## Example output
```
pi@raspberrypi:~/ener314rt-debug-master $ node test.js
napi_energenie.Init() called
radio-test: Initialising
init_ener314(): initialising
init_ener314(): mutex created & locked
radio_init
radio_ver=36
radio_standby
_wait_ready
radio_standby
_wait_ready
radio-test: N-API radio_init returned 0
radio-test: switching 1:1:true
ook_send: Zone=1, Switch=1, state=1
_wait_ready
radio_mod_transmit()
_wait_ready
_wait_txready
radio_send_payload(): 20 tx payloads
|**|*|*|*|*|*|*|*|*|**|*|*|*|*|*|*|*|*|*|**_wait_ready
radio-test: switching 1:1:false
ook_send: Zone=1, Switch=1, state=0
radio_mod_transmit()
_wait_ready
_wait_txready
radio_send_payload(): 20 tx payloads
*|*|*|*|*|*|*|*|*|*|**|*|*|*|*|*|*|*|*|**|*_wait_ready
openthings_deviceList(): called
openthings_deviceList(): Returning: {"numDevices":0, "devices":[
]}
radio-test: deviceList={"numDevices":0, "devices":[
]}
^C
```

# Troubleshooting
*radio_ver=0*: Check that you **do not** have hardware SPI enabled.  On raspbian if the hardware SPI driver was loaded, you will see the device /dev/spidev0.0.  If you see this switch hardware SPI OFF.

# About

Raise any bugs/queries here: https://github.com/Achronite/ener314rt-debug/issues

@Achronite - January 2020, uses energenie-ener314rt v0.3.2