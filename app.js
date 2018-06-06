const fs = require("fs");

fs.readFile('input.txt', function (err, data) {
    // reads data from input.txt file
    if (err) {
        return console.error(err);
    }
    const inputArray = data.toString().split("\n");
    const instructions = createInstructionsObject(inputArray);
    const navigatedSquares = navigateRobotHoover(instructions);
    const finalPosition = navigatedSquares[navigatedSquares.length-1];
    const cleanSquares = cleanUpDirtPatches(instructions, navigatedSquares);
    console.log(finalPosition);
    console.log(cleanSquares);
});


function createInstructionsObject(instructionsArray) {
    // input = array of data read from input.txt file
    // creates an object containing data from the input in accessible format
    // keys are human readable names and values are processed data from array
    // returns object

    const copyArr = [...instructionsArray];

    let roomDimensions = copyArr[0].split(' ');
    const roomWidth = parseInt(roomDimensions[0]);
    const roomHeight = parseInt(roomDimensions[1])
    roomDimensions = [roomWidth, roomHeight];

    const initPosition = copyArr[1].split(' ');

    let dirtPatches = [];
    for (let i=2; i<copyArr.length-1; i++) {
        dirtPatches.push(copyArr[i]);
    }

    const drivingInstructions = copyArr[copyArr.length-1].split('');

    const instr = {
        roomDimensions,
        initPosition,
        dirtPatches,
        drivingInstructions,
    };
    return (instr);
};



function navigateRobotHoover(instructionsObject) {
    // input = object with instructions
    // loops through drivingInstructions to navigate the robo hoover around the room
    // according to room dimensions
    // returns an array of coordinates the robo hoover has visited

    const drivingInstructions = instructionsObject.drivingInstructions;
    const initPosition = instructionsObject.initPosition;
    const roomDimensions = instructionsObject.roomDimensions;
    const roomMin = [0,0];

    const currentX = parseInt(initPosition[0]);
    const currentY = parseInt(initPosition[1]);
    let currentPosition = [currentX, currentY];
    let newPosition = [];
    let visitedSquares = [currentPosition];

    const goNorth = ([x,y]) => [x,y+1];
    const goSouth = ([x,y]) => [x,y-1];
    const goEast = ([x,y]) => [x+1,y];
    const goWest = ([x,y]) => [x-1,y];

    const canRobotMakeMove = (newPosition, currentPosition, roomDimensions, roomMin) => {
        let moveY;
        let moveX;
        if (newPosition[0] <= roomDimensions[0] && newPosition[0] >= roomMin[0])  {
          moveX = newPosition[0];
        } else {
          moveX = currentPosition[0];
        } 
        if (newPosition[1] <= roomDimensions[1] && newPosition[1] >= roomMin[1])  {
          moveY = newPosition[1];
        } else {
          moveY = currentPosition[1];
        } 
        return [moveX,moveY];
      };

    for (let direction in drivingInstructions) {
        switch(drivingInstructions[direction]) {
            case 'N':
                newPosition = goNorth(currentPosition);
                currentPosition = canRobotMakeMove(newPosition, currentPosition, roomDimensions, roomMin);
                visitedSquares.push(currentPosition);
                break;
            case 'S':
                newPosition = goSouth(currentPosition);
                currentPosition = canRobotMakeMove(newPosition, currentPosition, roomDimensions, roomMin);
                visitedSquares.push(currentPosition);
                break;
            case 'E':
                newPosition = goEast(currentPosition);
                currentPosition = canRobotMakeMove(newPosition, currentPosition, roomDimensions, roomMin);
                visitedSquares.push(currentPosition);
                break;
            case 'W':                
                newPosition = goWest(currentPosition);
                currentPosition = canRobotMakeMove(newPosition, currentPosition, roomDimensions, roomMin);
                visitedSquares.push(currentPosition);
                break;
            default:
                console.log('Sorry, that is not a direction, I am familiar with');
        }
    }

    let navigatedSquares = [];
    for (let square in visitedSquares) {
        navigatedSquares.push(visitedSquares[square].join(' '))
    }
    return navigatedSquares;
};



function cleanUpDirtPatches(instructionsObject, visitedSquares) {
    // input = object with instructions
    // compares the array of dirtPatches with the array of visitedSquares
    // to determine whether there are matches
    // returns a number

    const dirtPatches = instructionsObject.dirtPatches;
    let cleanSquares = 0;
    for (let item in dirtPatches) {
        if(visitedSquares.includes(dirtPatches[item])) {
            cleanSquares += 1;
        }
    }
    return cleanSquares;
};


