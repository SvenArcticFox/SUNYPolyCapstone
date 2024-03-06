# atrob-run README

This extension runs AT-Robots through DOSBox-X from Visual Studio Code. This extension combined with the language support extension provides a fully featured IDE for programming robots in AT-Robots assembly.

This extension does not currently support Linux!

## Features

- Set AT-Robots Location: Sets the location of the AT-Robots folder.
- Set DosBOX-X Location: Sets the location of the DOSBox-X executable/application. If no location is specified or this function is never run, the default installation location is used. (```C:\\dosbox-x\\dosbox-x.exe``` for windows and ```/Applications/dosbox-x.app``` on macOS).
 - Run AT-Robots: Runs AT-Robots and sets the location of DOSBox-X to the default locations above if the command was never run.

## Installation Instructions
1. Clone repo
2. Copy this folder into ```~/.vscode/extensions/```, ```~``` represents your home directory.

## Setup Instructions
### Set AT-Robots folder location
1. Copy the absolute path to the AT-Robots folder. This can look like ```C:\path\to\at\robots\folder``` or ```/path/to/at/robots/folder```
2. Click on the search bar on the top of the window and enter ```>AT-Robots: Set AT-Robots location``` ![Image of first step](images/setATRobLoc_Instructions/step1.png)
3. Press enter and paste the location into the text box. ![Image of second step](images/setATRobLoc_Instructions/step2.png)
4. Press enter and you should get a message stating the location was set successfully set. ![Image of second step](images/setATRobLoc_Instructions/step3.png)

### **Optional** Set DOSBox-X location.
- If DOSBox-X is installed to the installation location, ```C:\\dosbox-x\\dosbox-x.exe``` on Windows and ```/Applications/dosbox-x.app``` on macOS, you do not need to perform this step.
1. Copy the absolute path to the DOSBox-X application/executable. This can look like ```C:\path\to\dosbox-x``` or ```/path/to/dosbox-x```
2. Click on the search bar on the top of the window and enter ```>AT-Robots: Set DOSBox-X location``` [Image of second step](images/setDosboxXLoc_instructions/step1.png)
3. Press enter and paste the location into the text box. [Image of first step](images/setDosboxXLoc_instructions/step2.png)
4. Press enter and you should get a message stating the location was successfully set. [Image of third step](images/setDosboxXLoc_instructions/step3.png)
- **Note:** If you want to reset the DOSBox-X location in VS Code back to the default installtion location, perform the steps above except instead of pasting in the path to DOSBox-X, just leave the text box blank and press enter. You will get a message stating that the location has been reset.  

[Image of blank text box](images/setDosboxXLoc_instructions/blankbox.png) 

[Image of reset](images/setDosboxXLoc_instructions/reset.png)
