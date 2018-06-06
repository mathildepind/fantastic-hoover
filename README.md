# Fantastic Hoover

The program navigates a robotic hoover through a room to clean up patches of dirt.

## The brief

The objective was to take the instructions in a .txt file and process it. The instructions includes:
 * room dimensions (range defined by X, Y coordinates)
 * location of dirt patches (X, Y)
 * hoover location (X, Y)
 * driving instructions (N,S,E,W)

The program outputs the final hoover position and number of patches of dirt cleaned up by the robot.

### The features

The program reads the input.txt file and creates an object containing the room dimensions, location of dirt patches, hoover location and driving instructions.
The program then uses the data in the object to navigate the hoover around the room and to determine the final location of the hoover.
The program also makes a count of how many (if any) patches of dirt was cleaned up by the hoover.

The program outputs the result in two lines:
* The first line displays the X and Y coordinates marking the position of the hoover after processing all commands
* The second line of the program displays the number of patches of dirt the robot clean up.

### Frameworks used 

The program was created using JavaScript and Node.js
The program uses the fs node module to read from input.txt.

### Test the code

#### Skills you need and technologies you need to have set up on your machine

* [Skill: Forking a repo and setting it up on your machine](https://blog.scottlowe.org/2015/01/27/using-fork-branch-git-workflow/)
* [Skill & tech: Using npm](https://docs.npmjs.com/)
* [Skill & tech: Using node](https://nodejs.org/en/)

#### Set up

* Fork the repo and set it up on your local machine.
* Open the terminal / command line and use it to navigate to just outside the main project folder. If you're using Linux, you may be able to do this by going to there first, right clicking, and selecting Terminal. Otherwise you need to look up how to navigate using command line in your operating system. Use `cd` to move inside the project folder.

#### Deployment

* Once you're inside the project folder, run, in this order:
  * `npm install` to obtain all the modules used.
  * `npm run` to build the app.
  * `node app.js` to run the program start the server - after you do this step, you should be able to see the output from the program in the terminal / command line


