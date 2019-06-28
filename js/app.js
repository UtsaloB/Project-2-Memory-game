//todo 
// create gameboard
// Flip cards and compare
// Number of clicks per star
// refresh icon
// Move counter
// congratulations!
// game over - stars below 0, timer up


let currentlyFlippedCard;
const STAR_LOSS_MOVES = 2;
const GAME_TIME = 2 * 60000; // 2 minute game time
let incorrectMoves = 0;
let timer = null;
let moveCounter = 0;
let matchCounter = 0;
let timeRemaining = 0;
let gameTime = 0;
createGameBoard()

document.querySelector('.restart').addEventListener('click', function(){
    console.log("Refreshed")
    // remove all listeners on card
    // remove cards from deck
    // clear moves
    // reset stars
    restartGame()
})

function restartGame() {
    let deck = document.querySelector('.deck');
    deck.innerHTML = null;
    currentlyFlippedCard = null;
    moveCounter = 0;
    matchCounter = 0;
    timeRemaining = 0;
    createGameBoard();
}

function createStars(){
    let starList = [
        'fa-star',
        'fa-star',
        'fa-star',
        'fa-star',
        'fa-star'
    ]
    let stars = document.querySelector('.stars')
    let starHtml = starList.map((star)=>{
        return generateListItem(star)
    })
    
    stars.innerHTML = starHtml.join(``);
    // console.log('stars ', stars)
}

function updateStarRating() {
    if(incorrectMoves == STAR_LOSS_MOVES) {
        let stars = document.querySelector('.stars')
        // check if stars are all gone before removing.
        if(stars.lastChild) {
            stars.removeChild(stars.lastChild)
        } 
        if(stars.childElementCount <= 0) {
            //game over
            endGame()
        }
        incorrectMoves = 0
    } else {
        ++incorrectMoves
    }
}

function createGameBoard(){
    // create cards
    // shuffle cards
    // position cards
                    
    createStars()
    document.getElementById("moves").textContent = " Moves: 0";
    let cards = createCards();
    let deck = document.querySelector('.deck');
    let cardHtml = cards.map(function(card){
        return generateListItem(card, 'card')
    });

    deck.innerHTML = cardHtml.join(``);
    let allCards = document.querySelectorAll('.card');

    allCards.forEach(function(card) {
        card.addEventListener('click', function(e){
            if(currentlyFlippedCard === card || card.classList.contains('open')) return;
            // console.log(e)
            // console.log('onClick card ', card.innerHTML)
            if(!currentlyFlippedCard) {
                // first click
                card.classList.add('open', 'show')
                currentlyFlippedCard = card;
                // console.log("if currentlyFlippedCard ", currentlyFlippedCard.innerHTML)
            } else {
                // second click
                // console.log("currentlyFlippedCard else", currentlyFlippedCard.innerHTML)
                card.classList.add('open', 'show')
                updateMoveCounter()
                compareCards(card)
                // console.log(listElement)
            }
        })
    })

    createTimer(new Date())
}

function updateMoveCounter() {
    let text = (moveCounter === 0) ? " Moves: "+ ++moveCounter : ' Moves: '+ ++moveCounter  
    document.getElementById("moves").textContent = text
}

function generateListItem(item, listClass) {
    if(listClass) {
        return `<li class="${listClass}"><i class="fa ${item}"></i></li>`
    } else {
        return `<li><i class="fa ${item}"></i></li>`

    }
}

function createCards(){
    // create cards array for 8 pairs of symbols.
    const cards = [
        'fa-diamond', 'fa-diamond',
        'fa-paper-plane-o', 'fa-paper-plane-o',
        'fa-anchor', 'fa-anchor',
        'fa-bolt', 'fa-bolt',
        'fa-cube', 'fa-cube',
        'fa-anchor', 'fa-anchor',
        'fa-leaf', 'fa-leaf',
        'fa-bicycle', 'fa-bicycle'
    ]
    return shuffle(cards);
}

function createTimer(date) {
    if(date) {
        if(timer) clearInterval(timer)
        // document.getElementById("timer").innerHTML = "Time up!";
        let countdownTime = new Date(new Date().getTime() + GAME_TIME).getTime();
        gameTime = countdownTime;
        console.log('gametime is ', gameTime)
        timer = setInterval(() => {
            let now = new Date().getTime()
            timeRemaining = countdownTime - now
            document.getElementById("timer").textContent = getFormattedTime()
            
            if (timeRemaining < 1000) {
                if(timer) {
                    clearInterval(timer);
                }
                document.getElementById("timer").innerHTML = "Time up!";
                endGame()
            }
        }, 1000)
    }
}

function getFormattedTime() {
    let minutesLeft, secondsLeft;

        //regular countdown
        minutesLeft = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        secondsLeft = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        console.log('getFormattedTime timer ')

    return minutesLeft + " m" + " : " + secondsLeft + " s";
}

function getTimeTakenToWin() {
    let minutesLeft, secondsLeft;
    console.log('time remaining is ', timeRemaining)
    console.log('game time is ', gameTime)
    // let currentTime = gameTime - timeRemaining;
    // console.log('current time is ', (currentTime % (1000 * 60 * 60)) / (1000 * 60))
    // minutes = Math.floor(currentTime );
    // seconds = Math.floor((currentTime % (1000 * 60)) / 1000);
    minutesLeft = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    secondsLeft = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    gameTimeMins = Math.floor((gameTime % (1000 * 60 * 60)) / (1000 * 60));
    gameTimeSecs = Math.floor((gameTime % (1000 * 60)) / 1000);

    console.log('gameTimeMins ', gameTimeMins, ' gameTimeSecs ', gameTimeSecs)
    console.log('minutesLeft ', minutesLeft, ' secondsLeft ', secondsLeft)
    return gameTimeMins - minutesLeft + ' m' + " : " + gameTimeSecs - secondsLeft + ' s';

}

function flipCards(card){
    // set isFlipped property of card to inverse.
    // need to have a currently flipped card variable.
    // if currentlyFlippedCard  === (null || undefined) set cfc = card
    // else compareCards
    if(currentlyFlippedCard) {
        if(card.classList.contains()) {}

    } else {
        card.classList.add('open', 'show')
        // if(currentlyFlippedCard.classList.contains)
    }
}

function compareCards(card){
    // compare

    if(card.innerHTML === currentlyFlippedCard.innerHTML) {
        console.log('Match found!!!')
        ++matchCounter
        setTimeout(() => {
            card.classList.add('open', 'show', 'match')
            currentlyFlippedCard.classList.add('open', 'show', 'match')
            currentlyFlippedCard = null;
            console.log('Match counter ', matchCounter);
            if(matchCounter === 8) { // 8 pairs == 16 cards on deck
                winner()
            }
        }, 300)
    } else {
        console.log('no match')
        updateStarRating()
        setTimeout(function() {
            card.classList.remove('open', 'show', 'match')
            currentlyFlippedCard.classList.remove('open', 'show', 'match')
            currentlyFlippedCard = null;
        }, 300)
    }
}

function endGame(){
    // clear out cards array
    alert(`Oops! Game Over! You moved ${moveCounter} times`)
    restartGame()
}

function winner() {
    alert(`Yay!! You rock! you won the game in ${getTimeTakenToWin()} and it took you ${moveCounter} moves` )
    restartGame()
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    console.log('b4 shuffling ', array)
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    console.log('after shuffling ', array)
    return array;
}
