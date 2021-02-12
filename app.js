
/* Constants */
const INITIAL_TIME = 30;
// varaible store timer's countdown
let timeRemaining = 0
// store our timer's setInterval so we can clear it
let countdown = null
//variable to store items to guess
let placeToHide = null;
//boolean for gameOver
let gameOver = false

let level = [1, 2, 3, 4, 5];
let attempts = [2, 2, 2, 3, 3];
let boxesPerLevel = [3, 4, 4, 5, 5];
let amountItemsToGuess = [1, 1, 2, 2, 3];
let nameOfItemsToGuess = ['apple', 'banana', 'orange']
let itemsToGuess = ['img/apple.png', 'img/banana.png', 'img/orange.png'] 

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


//initial view in browser
function initialize() {
    boxes.forEach(box => box.addEventListener('click', choseBox))
    gameOver = false;
    currentLevel = level[0];
    currentBoxesPerLevel = boxesPerLevel[0];
    nextLevel();
}

// ! Actions on each lvl:
// update timer
// close boxes
// remove fruit
// randomly set placeToHide
//
// conditions for lvls:
//change places to hide
//change items to hide
//add more boxes
//add more items
//add more attempts

//lists all levels(with contitions on each lvl)
function nextLevel () {
    clearInterval(countdown);
    timeRemaining = INITIAL_TIME;
    countdown = setInterval(updateClock, 1000)
    timerMsg.innerText = `Timer:00: ${timeRemaining}`
    levelMsg.innerText = `Level: ${currentLevel}`

    boxes.forEach(box => box.src = 'img/closed-box.png')
    removeFruit();

    currentAttempts = attempts[currentLevel];
    currentBoxesPerLevel = boxesPerLevel[currentLevel];
    currentAmountItemsToGuess = amountItemsToGuess[currentLevel];

        if (currentLevel == level[0]){
            currentItemsToGuess = itemsToGuess[0];
            itemsToGuess[1].src = 'img/apple.png'
            mainMessage.innerText = `Guess where is ${nameOfItemsToGuess[0]} ?`
            attemptsMsg.innerText = `You have ${currentAttempts} attempts`
            
        } else if (currentLevel == level[1]){
            currentItemsToGuess = itemsToGuess[1];
            itemsToGuess[1].src = 'img/banana.png'
            mainMessage.innerText = `Guess where is ${nameOfItemsToGuess[1]} ?`
            attemptsMsg.innerText = `You have ${currentAttempts} attempts`
            
            //create newBox
            let fourthBox = document.createElement('img');
            fourthBox.className = 'box';
            fourthBox.id = 'box-3';
            boxContainer.appendChild(fourthBox);
            boxes = document.querySelectorAll('.box');
            console.log(boxes)
            
            fourthBox.addEventListener('click', choseBox)
            boxes.forEach(box => box.src = 'img/closed-box.png')

            //newPlaceTo Hide
            let thirdPlaceToHide = document.createElement('div');
            thirdPlaceToHide.className = 'itemsToGuess';
            thirdPlaceToHide.id = 'place3';
            guessedItemsDiv.appendChild(thirdPlaceToHide);

        } else  if (currentLevel == level[2]){
            currentItemsToGuess = itemsToGuess[0], itemsToGuess[1];
            mainMessage.innerText = `Guess where is ${nameOfItemsToGuess[1]} and ${nameOfItemsToGuess[2]} ?`
            attemptsMsg.innerText = `You have ${currentAttempts} attempts`
            
        } else  if (currentLevel == level[3]){
            currentItemsToGuess = itemsToGuess[1], itemsToGuess[2];
            mainMessage.innerText = `Guess where is ${nameOfItemsToGuess[0]} ?`
            attemptsMsg.innerText = `You have ${currentAttempts} attempts`
            //create newBox
            let fifthBox = document.createElement('img');
            fifthBox.className = 'box';
            fifthBox.id = 'box-3';
            boxContainer.appendChild(fifthBox);
            boxes = document.querySelectorAll('.box');
            console.log(boxes)
            
            fifthBox.addEventListener('click', choseBox)
            boxes.forEach(box => box.src = 'img/closed-box.png')

            //newPlaceTo Hide
            let fourthPlaceToHide = document.createElement('div');
            fourthPlaceToHide.className = 'itemsToGuess';
            fourthPlaceToHide.id = 'place3';
            guessedItemsDiv.appendChild(fourthPlaceToHide);
            
        } else  if (currentLevel == level[4]){
            currentItemsToGuess = itemsToGuess[0], itemsToGuess[1], itemsToGuess[2];
            mainMessage.innerText = `Guess where is ${nameOfItemsToGuess[0]} ?`
            attemptsMsg.innerText = `You have ${currentAttempts} attempts`

            //create newBox
            let sixthBox = document.createElement('img');
            sixthBox.className = 'box';
            sixthBox.id = 'box-3';
            boxContainer.appendChild(sixthBox);
            boxes = document.querySelectorAll('.box');
            console.log(boxes)
            
            sixthBox.addEventListener('click', choseBox)
            boxes.forEach(box => box.src = 'img/closed-box.png')
            //newPlaceTo Hide
            let fifhPlaceToHide = document.createElement('div');
            fifhPlaceToHide.className = 'itemsToGuess';
            fifhPlaceToHide.id = 'place3';
            guessedItemsDiv.appendChild(fifhPlaceToHide);
        }
    currentLevel += 1;
    placeToHide = Math.floor(Math.random() * currentBoxesPerLevel);
    console.log('placeToHide',placeToHide);
}

//function chosing the box
function choseBox(e) {
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
    // if (currentLevel == level[0]){
    else if (boxId == placeToHide) {      
        let rightId = document.querySelector('#place' + placeToHide);
        // console.log(rightId);

        let itemToGuess = document.createElement('img');
        itemToGuess.className = 'fruitImg';
        itemToGuess. src = 'img/apple.png';
        rightId.appendChild(itemToGuess);

        mainMessage.innerText = `Good job! You found it!`
        setTimeout(nextLevel, 1500);

    } else if (currentAttempts === 0 && boxId !== placeToHide) {
        console.log('game Over')
        endGame()
    }
    // }   else if (currentLevel == level[1]){
    //     if (boxId == placeToHide) {      
    //         rightId = document.querySelector('#place' + placeToHide);
    //         console.log(rightId);
    //         let banana = document.createElement('img');
    //         banana. src = 'img/banana.png';
    //         rightId.appendChild(banana);
    //         mainMessage.innerText = `Good job! You found it!`
    //         setTimeout(nextLevel, 1500);
    //     } 
}
 
function removeFruit() {
    var fruitImg = document.querySelectorAll(".fruitImg");
    while (itemsToGuess of fruitImg) {
        console.log(fruitImg)
        itemsToGuess.parentNode.removeChild(fruitImg);
    }
    // let items = document.querySelectorAll('.itemsToGuess');
    // for (guessedItems of items) {
    //     console.log(guessedItems)
    //     guessedItems.classList.add('hidden');
    // }
    // guessedItems.classList.remove('hidden');
}
function removeFruit() {
    for (let i = 0; i < allPlacesToHide.length; i++) {
        let items = document.querySelectorAll('.itemsToGuess');
        for (guessedItems of items) {
            console.log(guessedItems)
            guessedItems.classList.add('hidden');
        }
        guessedItems.classList.remove('hidden');
    }

//startOver button funct
function startOverFunct() {
    initialize()
}

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


/* Event Listeners */
startOverButton.addEventListener('click', startOverFunct)
document.addEventListener('DOMContentLoaded', initialize)
boxes.forEach(box => box.addEventListener('click', choseBox))




