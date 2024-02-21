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

	let run = vscode.commands.registerCommand('atrob-run.run', () =>  {

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
		

		if (process.platform === 'win32') {
			// run DosBox-x with AT-Robots
		}
		else if (process.platform === 'darwin') {
			cp.exec("open -a " + dosBoxXLoc + " -n --args -c \"mount c " + atRobLoc + "\" -c \"c:\" -c \"atrobs\" -c \"exit\"", (err, stdout, stderr) => {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (err) {
					console.log('error: ' + err);
				}
			});
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

// This method is called when your extension is deactivated
export function deactivate() {}