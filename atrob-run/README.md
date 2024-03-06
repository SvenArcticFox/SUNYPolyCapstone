# atrob-run README

This extension runs AT-Robots through DOSBox-X from Visual Studio Code. This extension combined with the language support extension provides a fully featured IDE for programming robots in AT-Robots assembly.

## Features

- Set AT-Robots Location: Sets the location of the AT-Robots folder.
- Set DosBOX-X Location: Sets the location of the DOSBox-X executable/application. If no location is specified or this function is never run, the default installation location is used. (C:\\dosbox-x\\dosbox-x.exe for windows and /Applications/dosbox-x.app on macOS).
 - Run AT-Robots: Runs AT-Robots and sets the location of DOSBox-X to the default locations above if the command was never run.

## Installation Instructions
1. Clone repo
2. Copy this folder into ```~/.vscode/extensions/```, ```~``` represents your home directory.

## Setup Instructions
1. Set AT-Robots folder location
    1. Copy the absolute path to the AT-Robots folder. This can look like ```C:\path\to\at\robots\folder``` or ```/path/to/at/robots/folder```
    2. Click on the search bar on the top of the window and enter ```>AT-Robots: Set AT-Robots location``` ![Image of first step](images/setATRobLoc_Instructions/step1.png)
    3. Press enter and paste the location into the text box. ![Image of second step](images/setATRobLoc_Instructions/step2.png)
    4. Press enter and you should get a message stating the location was set successfully. ![Image of second step](images/setATRobLoc_Instructions/step3.png)