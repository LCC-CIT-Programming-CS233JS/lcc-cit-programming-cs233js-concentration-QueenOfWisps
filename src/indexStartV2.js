// Create a class called Concentration.
{
    class Concentration 
    {



    
    /*
        Add a constructor.  In the body of the constructor
        -   Create instance variables to replace the global variables
        -   Bind the class to each of the following methods
        -       this.showMatches = this.showMatches.bind(this);
        -       this.enableAllRemainingCards = this.enableAllCards.bind(this);
        -       this.enableAllRemainingCards = this.enableAllRemainingCards.bind(this);
        -       this.checkCards = this.checkCards.bind(this);
        -       this.disableAllCards = this.disableAllCards.bind(this);
        -       this.isMatch = this.isMatch.bind(this);     
        -   All of the functionality of init will happen in the constructor ... call init.
    */
    constructor()
    {
        this.imagePath = './Cards/';
        this.images = Array(20).fill(null);
        this.firstPick = -1;
        this.secondPick = -1;
        this.tries = 0;
        this.hand= Array(20).fill(null);

        this.matches = 0;
        this.showMatches = this.showMatches.bind(this);
        this.enableAllRemainingCards = this.enableAllCards.bind(this);
        this.enableAllRemainingCards = this.enableAllRemainingCards.bind(this);
        this.checkCards = this.checkCards.bind(this);
        this.disableAllCards = this.disableAllCards.bind(this);
        this.isMatch = this.isMatch.bind(this);  
        this.init();   
    }

    init()
    {
        this.fillImages();
        this.shuffleImages();
        this.showMatches()
        this.enableAllCards();
    }

    // example:  cardjh.jpg is the jack of hearts
    fillImages() {
        let values = ['a','k','q','j','t','9','8','7','6','5'];
        let suits = ['h','s'];
        let index=0; 

        for (let value =0; value<values.length;value++){
            for(let suit=0; suit<suits.length;suit++){
                this.images[index] = "card" + values[value] +suits[suit] +".jpg";
                index++;
            }

        }

    }

    shuffleImages() {


        for(let i=0;i<images.length;i++)
        {
            let rand = Math.floor(Math.random() * 19);//if doesnt work try math.floor.
            //let temp=images[i];
           // this.images[i]=this.images[rand];
            //this.images[rand]=temp;
            [this.images[i], this.images[rand]] = [this.images[rand], this.images[i]];
            //this is E6 way of swapping^ no need to do the pesky shuffle if you dont want too, 
            //the two items being swapped are enclosed with array brackets. reverse them on either side. 
        }
    
    }



    showMatches() 
    {
        let status = document.getElementById("status");
        if(this.matches<10)
        {
            status.innerHTML = "Matches" +this.matches + "Tries" +this.tries;
        }
        else
        {
            status.innerHTML = "congratulations! you have found all ten matches in "+this.tries;
        }
    } 

    showBack(index) 
    {
        let backImage = imagePath + 'black_back.jpg';
        let card = document.getElementById(index);
        card.style.backgroundImage = 'url("'+ backImage + '")';
       
    
    }
    
    // shows the back for all cards
    // calls showBack in the body of a for loop
    showAllBacks() 
    {
        let cards = document.getElementsByName("card");
        for(let i=0;i<cards.length;i++){
            this.showBack(i);
        }
    
    }

    enableAllCards() 
    {
        let cards  = document.getElementsByName("card");
           for (let i =0;i<cards.length; i++)
            {
               cards[i].onclick = this.handleClick.bind(this, i);
               cards[i].style.cursor = 'pointer';
            }
           
    }

    enableAllRemainingCards() {
        let cards  = document.getElementsByName("card");
            for (let i =0;i<cards.length; i++)
            {
                if(cards[i].backgroundImage!="none"){ 
                cards[i].onclick = this.handleClick.bind(this, i);
                cards[i].style.cursor = 'pointer';
                }
            }
        }

     handleClick(index) 
     {
      
        let cardImage = this.imagePath + this.images[index];
        document.getElementById(index).style.backgroundImage= "url('"+ cardImage +"')"; //used to refer to card clicked on
        this.disableCard(index);
            
            if(this.firstPick==-1){
                this.firstPick= index;
            }
            else {
                this.secondPick=index;
                this.disableAllCards();
                setTimeout(this.checkCards,2000);
        
            }
        
    }
    removeCard(index) 
    {
        this.card = document.getElementById(index);
        card.style.backgroundImage = 'none';

    }

    isMatch() {
        //tried to define cards here.
          //console.log(firstPick+" "+secondPick);
         
          if(this.images[firstPick].substr(4,1)==this.images[secondPick].substr(4,1)) 
          {
              return true;
          }
          else
          {
              return false;
          }
      
      }
      






    /*
        Convert each function to a method.  
        -   Move it inside the class.
        -   Remove the keyword function
        -   Add this. in front of every variable and method
        
        THREE OF THE METHODS CHANGE A LITTLE
        -   handleClick will now have a parameter, index
            -   remove the declaration / assignment of the local var index
        -   enableAllCards (and enableAllRemainingCards) have to pass the index to handleClick
            -   the line of code that calls bind must now pass both this and an index
            -   before: cards[i].onclick = this.handleClick.bind(this);
            -   should be: cards[i].onclick = this.handleClick.bind(this, i);
    */

}

// create a variable called concentration
let concentration;

// Add an event handler to the load event of the window. 
window.onload = ()=>{new Concentration();}
// Use an anonymous function or an arrow function to
// set the concentration variable to an instance of Concentration

}


