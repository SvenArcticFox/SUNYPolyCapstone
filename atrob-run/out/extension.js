"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const localStorage_1 = require("./localStorage");
const fs = __importStar(require("fs"));
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    let storageManager = new localStorage_1.LocalStorageService(context.globalState);
    let dosBoxXLoc;
    let atRobLoc;
    if (storageManager.getValue("dosBoxXLoc") !== undefined) {
        dosBoxXLoc = storageManager.getValue("dosBoxXLoc");
    }
    else {
        dosBoxXLoc = "";
    }
    if (storageManager.getValue("atRobLoc") !== undefined) {
        atRobLoc = storageManager.getValue("atRobLoc");
    }
    else {
        atRobLoc = "";
    }
    console.log("AT-Robots Runner active!");
    let run = vscode.commands.registerCommand('atrob-run.run', () => {
        const cp = require("child_process");
        if (dosBoxXLoc === "" || dosBoxXLoc === undefined) {
            // if windows
            if (process.platform === 'win32') {
                if (fs.existsSync("C:\\DOSBox-X\\dosbox-x.exe")) {
                    dosBoxXLoc = "C:\\DOSBox-X\\dosbox-x.exe";
                }
                else {
                    vscode.window.showErrorMessage("DosBox-X could not be found. Please use the \"Set DosBox-X Location\" command to set the location DOSBox-X executable.");
                    return;
                }
            }
            // if mac os
            else if (process.platform === 'darwin') {
                if (fs.existsSync("/Applications/dosbox-x.app")) {
                    dosBoxXLoc = "/Applications/dosbox-x.app";
                }
                else {
                    vscode.window.showErrorMessage("DosBox-X could not be found. Please use the \"Set DosBox-X Location\" command to set the location DOSBox-X executable.");
                    return;
                }
            }
            else {
                vscode.window.showErrorMessage("Sorry, your system is not supported by this extension.");
                return;
            }
            storageManager.setValue("dosBoxXloc", dosBoxXLoc);
        }
        console.log(atRobLoc);
        if (atRobLoc === "" || atRobLoc === undefined) {
            vscode.window.showErrorMessage("AT-Robots could not be found. Please specify the location of the folder that contains AT-Robots by using the \"Set AT-Robots Location\" command.");
            console.log("AT-Robots variable is left blank");
            return;
        }
        if (process.platform === 'win32') {
            cp.exec("\"" + dosBoxXLoc + "\" -c \"mount c " + atRobLoc + "\" -c \"c:\" -c \"atrobs\" -c \"exit\"", (err, stdout, stderr) => {
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (err) {
                    console.log('error: ' + err);
                }
            });
        }
        else if (process.platform === 'darwin') {
            cp.exec("export atRobLoc=" + atRobLoc + "; export dosBoxXLoc=" + dosBoxXLoc + "; open \"${dosBoxXLoc}\" -n --args -c \"mount c ${atRobLoc}\" -c \"c:\" -c \"atrobs\" -c \"exit\"", (err, stdout, stderr) => {
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (err) {
                    console.log('error: ' + err);
                }
            });
        }
        vscode.window.showInformationMessage('AT-Robots is now running within DOSBox-X!');
    });
    let setAtRobLoc = vscode.commands.registerCommand('atrob-run.setATRobLoc', async function () {
        var tempLoc = await vscode.window.showInputBox({
            placeHolder: "AT-Robots Location",
            prompt: "Enter the folder that contains the AT-Robots executable. Please make sure that path name does not have quotes around it or has any spaces.",
        });
        if (tempLoc === '') {
            vscode.window.showErrorMessage("AT-Robots location was not specified");
        }
        else if (tempLoc !== undefined) {
            //removes quotes from ends of string
            if (tempLoc?.charAt(0) == "\"") {
                tempLoc = tempLoc.split("\"")[1];
            }
            if (fs.existsSync(tempLoc)) {
                //add single quotes to temp location to counteract whitespace
                if (process.platform === 'win32') {
                    tempLoc = "\'" + tempLoc;
                    tempLoc = tempLoc + "\'";
                }
                else if (process.platform === 'darwin') {
                    tempLoc = "\"" + tempLoc;
                    tempLoc = tempLoc + "\"";
                    tempLoc = "\'" + tempLoc;
                    tempLoc = tempLoc + "\'";
                }
                console.log(tempLoc);
                atRobLoc = tempLoc;
                storageManager.setValue("atRobLoc", atRobLoc);
                vscode.window.showInformationMessage('AT-Robots location successfully set!');
            }
            else {
                vscode.window.showErrorMessage("Specified AT-Robots location does not exist. Please specify a new location.");
            }
        }
    });
    let setDosBoxXLoc = vscode.commands.registerCommand('atrob-run.setDosBoxXLoc', async function () {
        var tempLoc = await vscode.window.showInputBox({
            placeHolder: "DosBox-X location",
            prompt: "Enter the location of the DosBOX-X executable/application. Leave the text box blank to reset the location of DOSBox-X in VS Code back to the default installation location.",
        });
        // Resets the DOSBox-X location to the default location if the input box was left blank.
        if (tempLoc === '') {
            vscode.window.showInformationMessage("DosBOX-X location was not specified. Setting to default location.");
            // Resets the DOSBox-X location to the default location if the input box was left blank.
            // if windows
            if (process.platform === 'win32') {
                if (fs.existsSync("C:\\DOSBox-X\\dosbox-x.exe")) {
                    dosBoxXLoc = "C:\\DOSBox-X\\dosbox-x.exe";
                }
                else {
                    vscode.window.showErrorMessage("DosBox-X could not be found. Please install DOSBox-X into C:\\dosbox-x. The location in VS Code has not been changed.");
                    return;
                }
            }
            // if mac os
            else if (process.platform === 'darwin') {
                if (fs.existsSync("/Applications/dosbox-x.app")) {
                    dosBoxXLoc = "/Applications/dosbox-x.app";
                }
                else {
                    vscode.window.showErrorMessage("DosBox-X could not be found. Please put dosbox-x.app into /Applications. The location in VS Code has not been changed.");
                    return;
                }
            }
            else {
                vscode.window.showErrorMessage("Sorry, your system is not supported by this extension. Could not set default location. The location in VS Code is unchanged.");
                return;
            }
            storageManager.setValue("dosBoxXLoc", dosBoxXLoc);
        }
        else if (tempLoc !== undefined) {
            //removes quotes from ends of string
            if (tempLoc?.charAt(0) == "\"") {
                tempLoc = tempLoc.split("\"")[1];
            }
            if (fs.existsSync(tempLoc)) {
                console.log(tempLoc);
                dosBoxXLoc = tempLoc;
                storageManager.setValue("dosBoxXLoc", dosBoxXLoc);
                vscode.window.showInformationMessage('AT-Robots location successfully set!');
            }
            else {
                vscode.window.showErrorMessage("Specified AT-Robots location does not exist. Please specify a new location.");
            }
        }
    });
    context.subscriptions.push(run);
    context.subscriptions.push(setAtRobLoc);
    context.subscriptions.push(setDosBoxXLoc);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map