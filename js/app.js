/*
 Referenced :  https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript
 
 Referenced : https://matthewcranford.com/category/blog-posts/walkthrough/memory-game/
 
 Referenced : https://stackoverflow.com/questions/38530368/append-nodelist-to-html-element 
 node list

*/
/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//TO DO

//CREATE THE MODAL

// GLOBAL VARIABLES

//tracks the number of moves a player has
let moves = 0; 

//holds potential matches
let matches = [];

//holds confirmed matches
let confirmMatches = [];

//parent element of list items cards
let deck = document.querySelector('.deck');

// creates an HTMLCollection array it is not Array.prototype
let card_deck = document.querySelectorAll('.card');

//put items from the HTMLCollection into a javascript array
let cards = [...card_deck];

let boardScore = document.querySelector('.moves') ;

let stars = document.querySelectorAll('.stars li');

let interval;


function startGame(){
//add click event listenter to each card
for(var i = 0; i< cards.length; i++){
    cards[i].addEventListener('click',showCard)
 }

let shuffledCards = shuffle(cards);

for (var i= 0; i < shuffledCards.length; i++){
  
  deck.appendChild(shuffledCards[i])
 }
  gameTimer();

}
startGame();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//push cards into the matches array
function addCard(clickedCard){
  matches.push(clickedCard)
}


//check to see if the cards selected match 

function isMatching(){
  if(matches.length == 2){
    //need to disable clicking for all other cards
     if (matches[0].childNodes[1].className === matches[1].childNodes[1].className){
       console.log('its a match');
       matches[0].classList.add("match");
       matches[1].classList.add("match");
       
      matches[0].classList.remove("show", "open");
      matches[1].classList.remove("show", "open");
      confirmMatches.push(matches[0].childNodes[1].className)
      matches = []
      scoreKeeper()
     } //end of if statement
    else{
       console.log('its not a match');
      //timeout function, then remove show and open
      setTimeout(function (){
        matches[0].classList.remove("show", "open");
        matches[1].classList.remove("show", "open");
        matches = [];
        scoreKeeper()
      }, 2000)
      
     } //end of else statement
    
  } //end of matches array length check
} // end of isMatching function


// + increment the move counter and display it on the page (put this //functionality in another function that you call from this one
function scoreKeeper(){
  //keep track of how many moves
   moves++;
   boardScore.innerHTML = moves;
   //console.log(moves);
  
  //keep track of the stars
  if(moves >=12){
    //remove star
    stars[2].style.visibility = "hidden";
  }
  if(moves >= 18){
    //remove another star
    stars[1].style.visibility = "hidden";
  }
  
}




// this function reveals card when user clicks on it
//binds the class to the eventlistener
//check out how the dom binds this
function showCard(card){
  //add + remove class show
  this.classList.toggle('show');
  
  //add + remove class open
  this.classList.toggle('open');
 
  //invokes card matching methods
  addCard(this);
  isMatching();
  gameEnd();
}



//final score 
// + if all cards have matched, display a message with the final score (put //this functionality in another function that you call from this one)
function gameEnd(){
  if(confirmMatches.length === 8){
    //console.log('You won!');
    clearInterval(interval);
   
    alert('You won!')
    //show modal
    let starRating = document.querySelector(".stars").innerHTML;
    let modalTimer = document.querySelector('.timer').innerHTML;
    let modalMoves = document.querySelector('.moves').innerHTML;
    
  }
}

function resetGame(){
  //show all starts
  //moves to 0
  //start game
  
  let resetButton = document.querySelector('.fa-repeat');
  
  resetButton.addEventListener('click',function(){
    //console.log('Reset button working, working!')
    moves = 0;
    boardScore.innerHTML = moves;
    
    stars[2].style.visibility = "visible";
    stars[1].style.visibility = "visible";
    counter = 0;
    confirmMatches = [];
    for(var i = 0; i< cards.length; i++){
       cards[i].remove("match");
    }
   
    startGame();
     
  })
  
}

resetGame();


function gameTimer(){
  //counter for timer
    let counter = 0;
    interval  = setInterval(function(){
      counter++
      let clock = document.querySelector('.timer');
      
      let minutes = Math.floor(counter/60);
      let seconds = Math.floor(counter%60);
      clock.innerHTML = `Timer ${minutes}:${seconds}`;
    }, 1000);
   
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
