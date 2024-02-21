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
        dosBoxXLoc = storageManager.getValue("dosBoxLoc");
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
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "atrob-run" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('atrob-run.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from atrobots-runner!');
    });
    let run = vscode.commands.registerCommand('atrob-run.run', () => {
        const cp = require("child_process");
        if (dosBoxXLoc === "") {
            if (process.platform === 'win32') {
                if (fs.existsSync("C:\\DOSBox-X\\dosbox-x.exe")) {
                    dosBoxXLoc = "C:\\DOSBox-X\\dosbox-x.exe";
                }
                else {
                    vscode.window.showErrorMessage("DosBox-X could not be found. Please use the \"Set DosBox-X Location\" command to set the location DOSBox-X executable.");
                    return;
                }
            }
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
        if (atRobLoc === "") {
            vscode.window.showErrorMessage("AT-Robots could not be found. Please specify the location of the folder that contains AT-Robots by using the \"Set AT-Robots Location\" command.");
            console.log("A dog with human fingers");
            return;
        }
        else if (!fs.existsSync(atRobLoc)) {
            vscode.window.showErrorMessage("AT-Robots could not be found. Please specify the location of the folder that contains AT-Robots by using the \"Set AT-Robots Location\" command.");
            console.log("YO MAMAAAAAAAAAA!!! OHHHHHHH!!!");
            return;
        }
        vscode.window.showInformationMessage('This is the run function!');
    });
    let setAtRobLoc = vscode.commands.registerCommand('atrob-run.setATRobLoc', async function () {
        const tempLoc = await vscode.window.showInputBox({
            placeHolder: "AT-Robots Location",
            prompt: "Enter the folder that contains the AT-Robots executable",
        });
        if (tempLoc === '') {
            vscode.window.showErrorMessage("AT-Robots location was not specified");
        }
        if (tempLoc !== undefined) {
            console.log(tempLoc);
            atRobLoc = tempLoc;
            storageManager.setValue("atRobLoc", atRobLoc);
        }
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(run);
    context.subscriptions.push(setAtRobLoc);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map