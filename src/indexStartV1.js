// start with these global variables
// the folder where your card images are stored
var imagePath = './Cards/';
// an array that stores the images for each card
var images = Array(20).fill(null);
// the index of the first card picked by the user
var firstPick = -1;
// the index of the second card picked by the user
var secondPick = -1;
// statistics about this "round"
var matches = 0;
//tried defining cards here.
//var cards  = document.getElementsByName("card");
// tried making the array a global var, then indicated the cards(firstpick).substr



var tries = 0;



// PART 1 //
// when the page loads, call the function init

window.onload = init;
// this function initializes the page
function init()
{
    fillImages();
    shuffleImages();
    
    showMatches()
    enableAllCards();

    for(var i=0;i< images.length; i++){
        var cardImage = imagePath +images[i];
        var card = document.getElementById(i);
        card.style.backgroundImage= "url('"+ cardImage +"')";

    }
   
    showAllBacks();
   
}

// shows the number of matches and tries in the status element on the page


// fills the array images with 10 pairs of card filenames
// card filenames follow this pattern:  cardvs.jpg where
// v is the first char of the value of the card and 
// s is the first char of the suit of the card
// example:  cardjh.jpg is the jack of hearts
function fillImages() {
    var values = ['a','k','q','j','t','9','8','7','6','5'];
    var suits = ['h','s'];
    var index=0; 

    for (var value =0; value<values.length;value++){
        for(var suit=0; suit<suits.length;suit++){
            images[index] = "card" + values[value] +suits[suit] +".jpg";
            index++;
        }

    }

}

// shuffles the elements in the images array
function shuffleImages() {


    for(var i=0;i<images.length;i++){
        var rand = Math.floor(Math.random() * 19);//if doesnt work try math.floor.
        var temp=images[i];
        images[i]=images[rand];
        images[rand]=temp;


    }
  
// 

}

// assigns the handleclick function to the onclick event for all cards
// on the page.  All cards have the name attribute set to card.
// It also sets the cursor (part of the style) to 'pointer'
function enableAllCards() {
 var cards  = document.getElementsByName("card");
    for (var i =0;i<cards.length; i++){
        cards[i].onclick = handleClick;
        cards[i].style.cursor = 'pointer';

    }
    

}

// enables (see enable all) only the cards whose backgroundImage
// style property is not 'none'
function enableAllRemainingCards() {
    var cards  = document.getElementsByName("card");
        for (var i =0;i<cards.length; i++){
            if(cards[i].backgroundImage!="none"){ 
            cards[i].onclick = handleClick;
            cards[i].style.cursor = 'pointer';
            }
        }
    }
// shows the back of one card based on it's index
// each card has an id attribute set to it's index in the html page
// the backgroundImage (style) is set to the url of the image
// for a card back to "show the back"
function showBack(index) {
    var backImage = imagePath + 'black_back.jpg';
    var card = document.getElementById(index);
    card.style.backgroundImage = 'url("'+ backImage + '")';
   

}

// shows the back for all cards
// calls showBack in the body of a for loop
function showAllBacks() {
    var cards = document.getElementsByName("card");
    for(var i=0;i<cards.length;i++){
        showBack(i);
    }

}



function handleClick() {
// fires when the user clicks on a card^
    // declare the variable index and assign it to the current card's id attribute
    var index = this.id;
  
    // declare cardImage and assign it to the image for this card
    // set the backgroundImage to the url of the cardImage
    var cardImage = imagePath +images[index];
    this.style.backgroundImage= "url('"+ cardImage +"')";

    // disable the card 
    disableCard(index);
    // if this is the first card picked
    if(firstPick==-1){
        firstPick= index;
    }
    else {
        secondPick=index;
        disableAllCards();
        setTimeout(checkCards,2000);

    }

}

// disable one card based on it's index
function disableCard(index) {
    let card = document.getElementById(index);
    card.onclick = () => {}; 
    card.style.cursor = 'none';
   
    
}

// disable all of the cards
function disableAllCards() {
  
    document.getElementsByName("card").onclick=()=> {};

}
// END PART 2 - TEST TO HERE //

// PART 3 //
// checks the 2 cards that have been picked for matches 
function checkCards() {
    tries++
    if(isMatch()==true){
        matches++
        removeCard(firstPick);
        removeCard(secondPick);
    
        if(matches<10){
                enableAllRemainingCards();
        }
    }
    else
    {
        showBack(firstPick);
        showBack(secondPick);
        enableAllRemainingCards();
    }
    
    showMatches();
    firstPick=-1;
    secondPick=-1;
    // reset the firstpick to -1
    // reset the secondpick to -1
    }

// determines if the images in firstPick and secondPick are a matche
// 2 cards are a match if they have the same value
// cardvs.jpg is the pattern for card file names
function showMatches() {
   var status = document.getElementById("status");
   if(matches<10){
       status.innerHTML = "Matches" +matches + "Tries" +tries;
   }
   else
   {
       status.innerHTML = "congratulations! you have found all ten matches in "+tries;
   }
 
     
 } 
 
function isMatch() {
  //tried to define cards here.
    //console.log(firstPick+" "+secondPick);
   
    if(images[firstPick].substr(4,1)==images[secondPick].substr(4,1)) 
    {
        return true;
    }
    else
    {
        return false;
    }

}

// removes one card from the board based on it's index
// set the backgroundImage to 'none' to remove the card
function removeCard(index) {
var card = document.getElementById(index);
card.style.backgroundImage = 'none';
//add the disabled card to the hand which is not really a hand but a graveyard.
}
// END PART 3 - TEST THE ENTIRE APP //


