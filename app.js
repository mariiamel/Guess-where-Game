
/* Constants */
const INITIAL_TIME = 30;
// varaible store timer's countdown
let timeRemaining = 0
// store our timer's setInterval so we can clear it
let countdown = null
//variable to store items to guess
let placeToHide = null;
let placeToHide2 = null;
let placeToHide3 =null;
//boolean for gameOver
let gameOver = false

let level = [0, 1, 2, 3, 4, 5];
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
let boxContainer = document.querySelector('.box-container');
let mainMessage = document.querySelector('.message');
let attemptsMsg = document.querySelector('.attempts');
let levelMsg = document.querySelector('.level');
let timerMsg = document.querySelector('.timer');
let boxes = document.querySelectorAll('.box');

//initial view in browser
initialize = () => {
    boxes.forEach(box => box.addEventListener('click', choseBox))
    mainMessage.classList.remove('redText');
    mainMessage.classList.remove('greenText');
    gameOver = false;
    nextLevel();
}

//lists all levels(with contitions on each lvl)
nextLevel = () => {
    removeFruit();
    boxes.forEach(box => box.src = 'img/closed-box.png')
    clearInterval(countdown);
    timeRemaining = INITIAL_TIME;
    countdown = setInterval(updateClock, 1000)
    timerMsg.innerText = `Timer:00: ${timeRemaining}`
    if (!gameOver) {
        levelMsg.innerText = `Level: ${currentLevel + 1}`
    }
    
    currentAttempts = attempts[currentLevel];
    currentBoxesPerLevel = boxesPerLevel[currentLevel];
    currentAmountItemsToGuess = amountItemsToGuess[currentLevel];

        if (currentLevel === level[0]){
            mainMessage.innerText = `Guess where is ${nameOfItemsToGuess[0]} ?`
            attemptsMsg.innerText = `You have ${currentAttempts} attempts`
            // randomPlaceToHide();
            
        } else if (currentLevel === level[1]){
            mainMessage.innerText = `Guess where is ${nameOfItemsToGuess[1]} ?`
            attemptsMsg.innerText = `You have ${currentAttempts} attempts`
            // randomPlaceToHide();
            
            //create newBox
            let fourthBox = document.createElement('img');
            fourthBox.id = 'box-3';
            fourthBox.className = 'box';
            boxContainer.appendChild(fourthBox);
            boxes = document.querySelectorAll('.box');
            //add eventLis to this box
            fourthBox.addEventListener('click', choseBox)
            boxes.forEach(box => box.src = 'img/closed-box.png')
            // create newPlaceTo Hide
            let thirdPlaceToHide = document.createElement('div');
            thirdPlaceToHide.className = 'itemsToGuess';
            thirdPlaceToHide.id = 'place3';
            guessedItemsDiv.appendChild(thirdPlaceToHide);

        } else  if (currentLevel === level[2]){
            mainMessage.innerText = `Guess where is ${nameOfItemsToGuess[1]} and ${nameOfItemsToGuess[2]} ?`
            attemptsMsg.innerText = `You have ${currentAttempts} attempts`
            // randomPlaceToHide();
            // randomPlaceToHide2();
            
        } else  if (currentLevel === level[3]){
            mainMessage.innerText = `Guess where is ${nameOfItemsToGuess[1]} and ${nameOfItemsToGuess[2]}?`
            attemptsMsg.innerText = `You have ${currentAttempts} attempts`
            // randomPlaceToHide();
            // randomPlaceToHide2();

            //create newBox
            let fifthBox = document.createElement('img');
            fifthBox.id = 'box-4';
            fifthBox.className = 'box';
            boxContainer.appendChild(fifthBox);
            boxes = document.querySelectorAll('.box');
            //add eventLis to this box
            fifthBox.addEventListener('click', choseBox)
            boxes.forEach(box => box.src = 'img/closed-box.png')
            //newPlaceTo Hide
            let fourthPlaceToHide = document.createElement('div');
            fourthPlaceToHide.className = 'itemsToGuess';
            fourthPlaceToHide.id = 'place4';
            guessedItemsDiv.appendChild(fourthPlaceToHide);
            
        } else  if (currentLevel === level[4]){
            mainMessage.innerText = `Guess where is ${nameOfItemsToGuess[0]} , ${nameOfItemsToGuess[1]} and ${nameOfItemsToGuess[2]} ?`
            attemptsMsg.innerText = `You have ${currentAttempts} attempts`
            // randomPlaceToHide();
            // randomPlaceToHide2();
            // randomPlaceToHide3();

            //create newBox
            let sixthBox = document.createElement('img');
            sixthBox.id = 'box-5';
            sixthBox.className = 'box';
            boxContainer.appendChild(sixthBox);
            boxes = document.querySelectorAll('.box');
            //add eventLis to this box
            sixthBox.addEventListener('click', choseBox)
            boxes.forEach(box => box.src = 'img/closed-box.png')
            //newPlaceTo Hide
            let fifhPlaceToHide = document.createElement('div');
            fifhPlaceToHide.className = 'itemsToGuess';
            fifhPlaceToHide.id = 'place5';
            guessedItemsDiv.appendChild(fifhPlaceToHide);
        }
    currentLevel += 1;
    randomPlaceToHide();
}

//function chosing the box
function choseBox(e) {
    e.target.src = 'img/opened-box.png'
    currentAttempts -= 1; 
    attemptsMsg.innerText = `You have ${currentAttempts} attempts`
    
    let boxId = e.target.id.slice(-1);
    e.target.id.innerText = boxId;

    if (boxId == placeToHide) {      
        let rightId = document.querySelector('#place' + placeToHide);
    // } else if (boxId == placeToHide2) {      
    //     let rightId2 = document.querySelector('#place' + placeToHide2);
    // } else if (boxId == placeToHide3) {      
    //     let rightId3 = document.querySelector('#place' + placeToHide3);
        
        if (currentLevel == level[1]){
            let apple = document.createElement('img');
            apple.className = 'fruitImg';
            apple. src = 'img/apple.png';
            rightId.appendChild(apple);
            } else  if (currentLevel == level[2]){
                let banana = document.createElement('img');
                banana. src = 'img/banana.png';
                banana.className = 'fruitImg';
                rightId.appendChild(banana);
                } else  if (currentLevel == level[3]){
                    let newBanana = document.createElement('img');
                    newBanana. src = 'img/banana.png';
                    newBanana.className = 'fruitImg';
                    rightId.appendChild(newBanana);
                    let orange = document.createElement('img');
                    orange. src = 'img/orange.png';
                    orange.className = 'fruitImg';
                    rightId.appendChild(orange);
                        } else  if (currentLevel == level[4]){
                            let newApple = document.createElement('img');
                            newApple. src = 'img/apple.png';
                            newApple.className = 'fruitImg';
                            rightId.appendChild(newApple);
                            let newOrange = document.createElement('img');
                            newOrange. src = 'img/orange.png';
                            newOrange.className = 'fruitImg';
                            rightId.appendChild(newOrange);
                                } else  if (currentLevel == level[5]){
                                    let newApple2 = document.createElement('img');
                                    newApple2. src = 'img/apple.png';
                                    newApple2.className = 'fruitImg';
                                    rightId.appendChild(newApple2);
                                    let newBanana2 = document.createElement('img');
                                    newBanana2. src = 'img/banana.png';
                                    newBanana2.className = 'fruitImg';
                                    rightId.appendChild(newBanana2);
                                    let newOrange2 = document.createElement('img');
                                    newOrange2. src = 'img/orange.png';
                                    newOrange2.className = 'fruitImg';
                                    rightId.appendChild(newOrange2);
                                }
        //message condition
        currentLevel !== level[5] ? mainMessage.innerText = `Good job! You found it!` : wonGame();
        //if passed conditions above--> go to next lvl
        setTimeout(nextLevel, 1500);
        //endGame conditions
        } else if (timeRemaining == 0 || currentAttempts === 0 && boxId !== placeToHide) {
            endGame()
        }
}

 randomPlaceToHide = () => {
    placeToHide = Math.floor(Math.random() * currentBoxesPerLevel);
    console.log('placeToHide',placeToHide);
 }
//  randomPlaceToHide2 = () => {
//     placeToHide2 = Math.floor(Math.random() * currentBoxesPerLevel);
//     console.log('placeToHide',placeToHide2);
//  }
//  randomPlaceToHide3 = () => {
//     placeToHide3 = Math.floor(Math.random() * currentBoxesPerLevel);
//     console.log('placeToHide',placeToHide3);
//  }
 

removeFruit = () => {
    for (let i = 0; i < allPlacesToHide.length; i++) {
        let items = document.querySelectorAll('.fruitImg');
        for (guessedItems of items) {
            // console.log(guessedItems)
            guessedItems.classList.add('hidden');
            // guessedItems.parentNode.removeChild(guessedItems);
        }
    }
}

//timer function
updateClock = () => {
    timeRemaining <= 0 ? endGame(false) : timeRemaining -= 1;
    timerMsg.textContent = `Timer:00: ${timeRemaining}`;
}

//wonGame Fun
 wonGame = () => {
    mainMessage.innerText = `You won this Game! Click 'Start Over' to play again.`
    mainMessage.classList.add('greenText');
    boxes.forEach(box => box.removeEventListener('click', choseBox))
    gameOver = true;
 }

// End game function
endGame = () => {
    mainMessage.classList.add('redText');
    mainMessage.innerText = `You have lost! Click 'Start Over' to restart`
    boxes.forEach(box => box.removeEventListener('click', choseBox))
    gameOver = true;
}

//startOver button funct
startOverFunct = () => {
    location.reload();
    //remove aditional boxes
    // clearBoxes()
    initialize()
}

// clearBoxes = () => {
//     let box3ToRemove = document.getElementById('box-3');
//     boxContainer.parentNode.removeChild(box3ToRemove);
//     let box4ToRemove = document.getElementById('box-4');
//     boxContainer.parentNode.removeChild(box4ToRemove);
//     let box5ToRemove = document.getElementById('box-5');
//     boxContainer.parentNode.removeChild(box5ToRemove);
// }


/* Event Listeners */
startOverButton.addEventListener('click', startOverFunct)
document.addEventListener('DOMContentLoaded', initialize)
boxes.forEach(box => box.addEventListener('click', choseBox))




