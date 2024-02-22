// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { LocalStorageService } from './localStorage';
import * as fs from 'fs';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	let storageManager = new LocalStorageService(context.globalState);
	let dosBoxXLoc : string;
	let atRobLoc : string;

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

	console.log("AT-Robots Runner active!");

	let run = vscode.commands.registerCommand('atrob-run.run', () =>  {

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
			cp.exec("\"" +dosBoxXLoc + "\" -c \"mount c " + atRobLoc + "\" -c \"c:\" -c \"atrobs\" -c \"exit\"", (err, stdout, stderr) => {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (err) {
					console.log('error: ' + err);
				}
			});
		}
		else if (process.platform === 'darwin') {
			cp.exec("open -a \"" + dosBoxXLoc + "\" -n --args -c \"mount c " + atRobLoc + "\" -c \"c:\" -c \"atrobs\" -c \"exit\"", (err, stdout, stderr) => {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (err) {
					console.log('error: ' + err);
				}
			});
		}
		
		

		vscode.window.showInformationMessage('DOSBox is now running!');
	});

	let setAtRobLoc = vscode.commands.registerCommand('atrob-run.setATRobLoc', async function () {

		var tempLoc  = await vscode.window.showInputBox({
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
				tempLoc = "\'" + tempLoc;
				tempLoc = tempLoc + "\'";
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

	context.subscriptions.push(run);
	context.subscriptions.push(setAtRobLoc);
}

// This method is called when your extension is deactivated
export function deactivate() {}