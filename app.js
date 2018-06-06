const fs = require("fs");

fs.readFile('input.txt', function (err, data) {
   if (err) {
      return console.error(err);
   }
   const inputArray = data.toString().split("\n");
   const instructions = createInstructionsObject(inputArray);
   const navigatedSquares = navigateRoboHoover(instructions);
   const finalPosition = navigatedSquares[navigatedSquares.length-1];
   const cleanSquares = cleanUpDirtPatches(instructions, navigatedSquares);
   console.log(finalPosition);
   console.log(cleanSquares);
});



function createInstructionsObject(instructionsArray) {
    const copyArr = [...instructionsArray];
    const roomDimensions = copyArr[0].split(' ');
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



function navigateRoboHoover(instructionsObject) {
    const drivingInstructions = instructionsObject.drivingInstructions;
    const initPosition = instructionsObject.initPosition;

    const currentX = parseInt(initPosition[0]);
    const currentY = parseInt(initPosition[1]);
    let currentPosition = [currentX, currentY];
    let visitedSquares = [currentPosition];

    const goNorth = ([x,y]) => [x,y+1];
    const goSouth = ([x,y]) => [x,y-1];
    const goEast = ([x,y]) => [x+1,y];
    const goWest = ([x,y]) => [x-1,y];

    for (let direction in drivingInstructions) {
        switch(drivingInstructions[direction]) {
            case 'N':
                currentPosition = goNorth(currentPosition);
                visitedSquares.push(currentPosition);
                break;
            case 'S':
                currentPosition = goSouth(currentPosition);
                visitedSquares.push(currentPosition);
                break;
            case 'E':
                currentPosition = goEast(currentPosition);
                visitedSquares.push(currentPosition);
                break;
            case 'W':                
                currentPosition = goWest(currentPosition);
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
    const dirtPatches = instructionsObject.dirtPatches;
    let cleanSquares = 0;
    for (let item in dirtPatches) {
        if(visitedSquares.includes(dirtPatches[item])) {
            cleanSquares += 1;
        }
    }
    return cleanSquares;
};


