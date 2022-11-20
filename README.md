# CS-4360-DungeonAndDragonsTracker
To Do List
- [X] Update Characters from main
- [X] Update Monsters from main
- [X] Update NPC from main
- [ ] Save Off Characters locally for import
- [ ] Save Off Monsters locally for import
- [ ] Save Off NPCs locally for import
- [ ] Add Spell durration and counter to Combat
- [ ] Add input validation everywhere
- [ ] Remember what tab you are on reload/charater

## Environment setup

To set up environment follow these steps:

1. Set up an up-to-date NPM and NodeJS  instances globally on computer.

- Follow this link to set up npm and NodeJS-> https://www.npmjs.com/get-npm

2. Navigate to the github and clone the project to a local folder.
- Follow link to public github -> https://github.com/devond5/CS-4360-DungeonAndDragonsTracker.git

3. NSet up Apache Cordova and start developing.

- IMPORTANT* Don't set up a new project. That is the folder you created for the github

- install cordova globally, change directory to D&D folder and run for browser 

```
> npm install -g cordova
> cd [your D&D Github folder]
> npm i
> cordova run browser
```


- Follow this link for the official set up -> https://cordova.apache.org/

- Open your favorite text editor and start developing, but **IMPORTANT** FOR DEVELOPMENT ONLY CHANGE FILES IN WWW do not touch the PLATFORM files

- We will start out by developing for broswer and andrioid (eventually this could change change)


***

## Seting up an Android development environment

- Follow this link for instructions -> https://cordova.apache.org/docs/en/latest/guide/platforms/android/

- You will need Android Studio and Android SDK

 - Once this is finished, in the command line run 

 ```
> cordova run android
 ```

 - Sometimes the emmulator is finicky so if that doesn't work you can run the following code *might need to be done twice once to start the emmulator once to load project to emmulator

 ```
> cordova emulate android
 ```

***

## Cordova Tutorials

- https://ccoenraets.github.io/cordova-tutorial/create-cordova-project.html

- https://www.tutorialspoint.com/cordova/