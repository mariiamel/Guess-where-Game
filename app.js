
//Actions:

// --done--  1- Time decreases
// 2- Update attempts during the level (?loop i--)
// 3- Update attempts on each level
// 4- Update levels (?loop i++)
// 5- Update message (guess ${item} / good job / you lost)
// 6- Add more boxes on levels
// 7- Add more items to guess per level
// 8- shuffle items to guess in initilize game funct(math.floor(math.random))


//event list/funct:

// endGame funct
// wonGame funct
// Initilize game funct
// chosing box function
// Start over funct
// Update clock


/* Constants */
const INITIAL_TIME = 30;

let level = [1, 2, 3, 4, 5];
let attempts = [2, 2, 2, 3, 3];
let boxesPerLevel = [3, 4, 4, 5, 5];
let amountItemsToGuess = [1, 1, 2, 2, 3];
let itemsToGuess = [
    'img/apple.png',
    'img/banana.png',
    'img/orange.png'
] 

//variable to store items to guess
// let placeToHideArr = allPlacesToHide.map(function(placeToHide) {
// })
let placeToHide = null;

/* Game Logic Variables and State */

// varaible store timer's countdown
let timeRemaining = 0
// store our timer's setInterval so we can clear it
let countdown = null

//boolean for gameOver
let gameOver = false

//variab for each lvl
let currentLevel = 0;
let currentAttempts = 0;
let currentBoxesPerLevel = 0;
let currentItemsToGuess = 0;
let currentAmountItemsToGuess = 0;


/* DOM References */
let allPlacesToHide = document.querySelectorAll('.itemsToGuess');
let guessedItemsDiv = document.querySelector('.guessedItems');
let startOverButton = document.querySelector('.startOver');
let mainMessage = document.querySelector('.message');
let attemptsMsg = document.querySelector('.attempts');
let levelMsg = document.querySelector('.level');
let timerMsg = document.querySelector('.timer');
let boxes = document.querySelectorAll('.box');
let boxContainer = document.querySelector('.box-container');


/* Functions and Game Logic */

//timer function
function updateClock() {
    if(timeRemaining <= 0) {
        endGame(false);
    } else {
        timeRemaining -= 1;
    }
    timerMsg.textContent = `Timer:00: ${timeRemaining}`;
}

// End game function
function endGame() {
    mainMessage.innerText = `You have lost! Click 'Start Over' to restart`
    boxes.forEach(box => box.removeEventListener('click', choseBox))
    gameOver = true;
}

//initial view in browser
function initialize() {
    timeRemaining = INITIAL_TIME;
    countdown = setInterval(updateClock, 1000)
    let newTimer = document.createElement('p')
    timerMsg.appendChild(newTimer);
    timerMsg.innerText = `Timer:00: ${timeRemaining}`
    gameOver = false;
    currentLevel = level[0];
    currentAttempts = attempts[0];
    currentBoxesPerLevel = boxesPerLevel[0];
    currentAmountItemsToGuess = amountItemsToGuess[0];
    //innerText for attempts
    // let newAttempts = document.createElement('p')
    // attemptsMsg.appendChild(newAttempts);
    attemptsMsg.innerText = `You have ${currentAttempts} attempts`
    //return img of closed box
    boxes.forEach(box => box.src = 'img/closed-box.png')
    
    // for (let i = 0; i < level.length; i++) {
    //     i++;
    // }
    // for (let j = 0; j < attempts.length; j++) {
    //     j++;
    // }
    // for (let x = 0; x < boxesPerLevel.length; x++) {
    //     x++;
    // }
    // for (let y = 0; y < amountItemsToGuess.length; y++) {
    //     y++;
    // }
    firstLevel()
}

//function chosing the box
function choseBox(e) {
    // console.log('target.id',e.target.id);
    e.target.src = 'img/opened-box.png'
    currentAttempts -= 1; 
    
    let boxId = e.target.id.slice(-1);
    e.target.id.innerText = boxId;
    console.log(boxId);
    console.log('placeToHide', placeToHide);
    attemptsMsg.innerText = `You have ${currentAttempts} attempts`
    if (timeRemaining == 0) {
        console.log('game Over')
        endGame()
    }
    //match them here
    //if pass the condit ==> go to next level
    if (currentLevel == level[0]){
    if (boxId == placeToHide) {      
        let rightId = document.querySelector('#place' + placeToHide);
        console.log(rightId);
        let apple = document.createElement('img');
        apple. src = 'img/apple.png';
        rightId.appendChild(apple);
        mainMessage.innerText = `Good job! You found it!`
        
        setTimeout(secondLevel, 1500);
    } else if(currentAttempts === 0 && boxId !== placeToHide){
        endGame();
    } 
    } else if (currentLevel == level[1]){
        if (boxId == placeToHide) {      
            rightId = document.querySelector('#place' + placeToHide);
            console.log(rightId);
            let banana = document.createElement('img');
            banana. src = 'img/banana.png';
            rightId.appendChild(banana);
            mainMessage.innerText = `Good job! You found it!`
            setTimeout(thirdLevel, 1500);
        } else if(currentAttempts === 0 && boxId !== placeToHide){
            endGame();
        } 
    }
}


function firstLevel() {
        currentAttempts = attempts[0];
        currentBoxesPerLevel = boxesPerLevel[0];
        currentAmountItemsToGuess = amountItemsToGuess[0];
        mainMessage.innerText = `Guess where is apple?`
        placeToHide = Math.floor(Math.random() * currentBoxesPerLevel);
        console.log('placeToHide', placeToHide);
    }

// Second lvl plan:
// set interval
// remove guessed items
// close boxes
// update lvl, attempts and time
// change mainMsg
// CreateElement <did> for newBox
// append it to box container
// give a class(box) and id(box-3) and src="./img/closed" to newBox element
// slice an id
// compare id and place to hide

function secondLevel() {
    clearInterval(countdown);
    timeRemaining = INITIAL_TIME;
    countdown = setInterval(updateClock, 1000)

    let items = document.querySelectorAll('.itemsToGuess');
    for (guessedItems of items) {
        console.log(guessedItems)
        guessedItems.classList.add('hidden');
    }
    guessedItems.classList.remove('hidden');

    currentAttempts = attempts[1];
    currentLevel = level[1];
    currentBoxesPerLevel = boxesPerLevel[1];
    currentAmountItemsToGuess = amountItemsToGuess[1];
    // let attemptP = document.createElement('p')
    // attemptsMsg.appendChild(attemptP)
    attemptsMsg.innerText = `You have ${currentAttempts} attempts`;
    mainMessage.innerText = `Guess where is banana?`
    levelMsg.innerText = `Level: ${currentLevel}`
    
    //create newBox
    let fourthBox = document.createElement('img');
    fourthBox.className = 'box';
    fourthBox.id = 'box-3';
    boxContainer.appendChild(fourthBox);
    boxes = document.querySelectorAll('.box');
    console.log(boxes)
    // boxes.push(thirdBox);
    fourthBox.addEventListener('click', choseBox)
    boxes.forEach(box => box.src = 'img/closed-box.png')
    

    //newPlaceTo Hide
    let thirdPlaceToHide = document.createElement('div');
    thirdPlaceToHide.className = 'itemsToGuess';
    thirdPlaceToHide.id = 'place3';
    guessedItemsDiv.appendChild(thirdPlaceToHide);

    placeToHide = Math.floor(Math.random() * currentBoxesPerLevel);
    console.log('placeToHide',placeToHide);
}

function thirdLevel() {
        currentAttempts = attempts[2];
        currentBoxesPerLevel = boxesPerLevel[2];
        currentAmountItemsToGuess = amountItemsToGuess[2];
        mainMessage.innerText = `Guess where is apple and banana?`
        placeToHide = Math.floor(Math.random() * currentBoxesPerLevel);
        console.log('placeToHide',placeToHide);
}

function fourthLevel() {
    currentAttempts = attempts[3];
        currentBoxesPerLevel = boxesPerLevel[3];
        currentAmountItemsToGuess = amountItemsToGuess[3];
        mainMessage.innerText = `Guess where is banana and orange?`
        placeToHide = Math.floor(Math.random() * currentBoxesPerLevel);
        console.log('placeToHide',placeToHide);
}

function fifthLevel() {
        currentAttempts = attempts[4];
        currentBoxesPerLevel = boxesPerLevel[4];
        currentAmountItemsToGuess = amountItemsToGuess[4];
        mainMessage.innerText = `Guess where is apple, banana and orange?`
        placeToHide = Math.floor(Math.random() * currentBoxesPerLevel);
        console.log('placeToHide',placeToHide);
}

//wonGameFunction
function wonGame() {
    let wonGameMsg = document.querySelector('h2');
    mainMessage.appendChild(wonGameMsg);
    mainMessage.innerText = `Congratulations! You won!`;
}

//startOver button funct
function startOverFunct() {
    while(guessedItemsDiv.firstChild) {
        guessedItemsDiv.removeChild(guessedItemsDiv.firstChild);
    }
    boxes.forEach(box => box.addEventListener('click', choseBox))
    clearInterval(countdown);
    initialize()
}


/* Event Listeners */
startOverButton.addEventListener('click', startOverFunct)
document.addEventListener('DOMContentLoaded', initialize)

boxes.forEach(box => box.addEventListener('click', choseBox))




