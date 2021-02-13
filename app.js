
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
let mainMessage = document.querySelector('.message');
let attemptsMsg = document.querySelector('.attempts');
let levelMsg = document.querySelector('.level');
let timerMsg = document.querySelector('.timer');
let boxes = document.querySelectorAll('.box');
let boxContainer = document.querySelector('.box-container');


//initial view in browser
initialize = () => {
    currentLevel = level[0];
    currentBoxesPerLevel = boxesPerLevel[0];
    boxes.forEach(box => box.addEventListener('click', choseBox))
    mainMessage.classList.remove('redText');
    mainMessage.classList.remove('greenText');
    gameOver = false;
    nextLevel();
}

//lists all levels(with contitions on each lvl)
nextLevel = () => {
    clearInterval(countdown);
    timeRemaining = INITIAL_TIME;
    countdown = setInterval(updateClock, 1000)
    timerMsg.innerText = `Timer:00: ${timeRemaining}`
    if (!gameOver) {
        levelMsg.innerText = `Level: ${currentLevel + 1}`
    }

    boxes.forEach(box => box.src = 'img/closed-box.png')
    removeFruit();
    
    currentAttempts = attempts[currentLevel];
    currentBoxesPerLevel = boxesPerLevel[currentLevel];
    currentAmountItemsToGuess = amountItemsToGuess[currentLevel];

        if (currentLevel === level[0]){
            currentItemsToGuess = itemsToGuess[0];
            itemsToGuess[1].src = 'img/apple.png'
            mainMessage.innerText = `Guess where is ${nameOfItemsToGuess[0]} ?`
            attemptsMsg.innerText = `You have ${currentAttempts} attempts`
            
        } else if (currentLevel === level[1]){
            currentItemsToGuess = itemsToGuess[1];
            itemsToGuess[1].src = 'img/banana.png'
            mainMessage.innerText = `Guess where is ${nameOfItemsToGuess[1]} ?`
            attemptsMsg.innerText = `You have ${currentAttempts} attempts`
            
            //create newBox
            let fourthBox = document.createElement('img');
            fourthBox.id = 'box-3';
            fourthBox.className = 'box';
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

        } else  if (currentLevel === level[2]){
            currentItemsToGuess = itemsToGuess[0], itemsToGuess[1];
            mainMessage.innerText = `Guess where is ${nameOfItemsToGuess[1]} and ${nameOfItemsToGuess[2]} ?`
            attemptsMsg.innerText = `You have ${currentAttempts} attempts`
            
        } else  if (currentLevel === level[3]){
            currentItemsToGuess = itemsToGuess[1], itemsToGuess[2];
            mainMessage.innerText = `Guess where is ${nameOfItemsToGuess[1]} and ${nameOfItemsToGuess[2]}?`
            attemptsMsg.innerText = `You have ${currentAttempts} attempts`
            //create newBox
            let fifthBox = document.createElement('img');
            fifthBox.id = 'box-4';
            fifthBox.className = 'box';
            boxContainer.appendChild(fifthBox);
            boxes = document.querySelectorAll('.box');
            console.log(boxes)
            
            fifthBox.addEventListener('click', choseBox)
            boxes.forEach(box => box.src = 'img/closed-box.png')

            //newPlaceTo Hide
            let fourthPlaceToHide = document.createElement('div');
            fourthPlaceToHide.className = 'itemsToGuess';
            fourthPlaceToHide.id = 'place4';
            guessedItemsDiv.appendChild(fourthPlaceToHide);
            
        } else  if (currentLevel === level[4]){
            currentItemsToGuess = itemsToGuess[0], itemsToGuess[1], itemsToGuess[2];
            mainMessage.innerText = `Guess where is ${nameOfItemsToGuess[0]} , ${nameOfItemsToGuess[1]} and ${nameOfItemsToGuess[2]} ?`
            attemptsMsg.innerText = `You have ${currentAttempts} attempts`

            //create newBox
            let sixthBox = document.createElement('img');
            sixthBox.id = 'box-5';
            sixthBox.className = 'box';
            boxContainer.appendChild(sixthBox);
            boxes = document.querySelectorAll('.box');
            console.log(boxes)
            
            sixthBox.addEventListener('click', choseBox)
            boxes.forEach(box => box.src = 'img/closed-box.png')

            //newPlaceTo Hide
            let fifhPlaceToHide = document.createElement('div');
            fifhPlaceToHide.className = 'itemsToGuess';
            fifhPlaceToHide.id = 'place5';
            guessedItemsDiv.appendChild(fifhPlaceToHide);
        }
            currentLevel += 1;
            placeToHide = Math.floor(Math.random() * currentBoxesPerLevel);
            console.log('placeToHide',placeToHide);
    // }
}

//function chosing the box
function choseBox(e) {
    e.target.src = 'img/opened-box.png'
    currentAttempts -= 1; 
    
    let boxId = e.target.id.slice(-1);
    e.target.id.innerText = boxId;
    console.log(boxId);
    // console.log('placeToHide', placeToHide);
    attemptsMsg.innerText = `You have ${currentAttempts} attempts`
    
    if (timeRemaining == 0) {
        console.log('game Over')
        endGame()
    } 
    else if (boxId == placeToHide) {      
        let rightId = document.querySelector('#place' + placeToHide);
        // console.log(rightId);
        console.log(currentLevel);
        
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
        if (currentLevel !== level[5]){
            mainMessage.innerText = `Good job! You found it!`
            // setTimeout(nextLevel, 1500);
        } else {
            wonGame()
        }
        
        setTimeout(nextLevel, 1500);
    
            } else if (currentAttempts === 0 && boxId !== placeToHide) {
                console.log('game Over')
                endGame()
            }
}
 
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

//startOver button funct
startOverFunct = () => {
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

//timer function
updateClock = () => {
    if(timeRemaining <= 0) {
        endGame(false);
    } else {
        timeRemaining -= 1;
    }
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

/* Event Listeners */
startOverButton.addEventListener('click', startOverFunct)
document.addEventListener('DOMContentLoaded', initialize)
boxes.forEach(box => box.addEventListener('click', choseBox))




