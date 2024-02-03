// blackjack js
var playerTotal = 0;
var dealerTotal = 0;
var gameOver = 0;

window.onload=function(){ // wait for webpage to load; setup all button click events
    const hitButton = document.getElementById("hit");
    const startButton = document.getElementById("startB");
    const stayButton = document.getElementById("stay");

    document.getElementById("hit").style.display = "none";
    document.getElementById("stay").style.display = "none";
    
    startButton.addEventListener("click", restart);
    hitButton.addEventListener("click", hit);
    stayButton.addEventListener("click", stay);
}

function setupDeck(){
    let values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    let suits = ["H","C","D","S"];
    deck = [];

    for(let i = 0; i < suits.length; i++){
        for(let j = 0; j < values.length; j++){
            deck.push(values[j] + "-" + suits[i]);
        }
    }

    for(let i = deck.length - 1; i > 0; i --){ // some rando algorithim i stole
        const rando = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[rando]] = [deck[rando], deck[i]];
    }
}

function start(){ // using deck.pop to delete last element of array when shuffled, removing chance of dupes 
    setupDeck();
    hidden = deck.pop();
    let dealerImg = document.createElement("img");
    let dealerCard = deck.pop();
    blank = document.createElement("img");

    blank.src = "../views/Images/card back red.png";
    dealerImg.src = "../views/cards/" + dealerCard + ".png";

    dealerTotal += getVal(dealerCard) + getVal(hidden);

    document.getElementById("dealerHand").append(blank)
    document.getElementById("dealerHand").append(dealerImg);
    for (let i = 0; i < 2; i ++){ // player inital cards
        let img = document.createElement("img");
        let card = deck.pop();

        img.src = "../views/cards/" + card + ".png";
        playerTotal += getVal(card);
        document.getElementById("playerHand").append(img);
    }

    if(playerTotal == 21){
        win();
        return;
    } else if(playerTotal > 21){
        lose();
    }

    console.log(playerTotal);
}

function win(){
    blank.src = "../views/cards/" + hidden + ".png";
    document.getElementById("stay").style.display = "none";
    document.getElementById("hit").style.display = "none";
    document.getElementById("lost").innerHTML = "You Win!";

    let but = document.getElementById("startB")
    but.style.display = "revert"; // bring back the start button
}

function lose(){
    blank.src = "../views/cards/" + hidden + ".png";
    document.getElementById("stay").style.display = "none";
    document.getElementById("hit").style.display = "none";
    document.getElementById("lost").innerHTML = "You Lose!";

    let but = document.getElementById("startB")
    but.style.display = "revert"; // bring back start button
}

function stay(){
    while (dealerTotal <= 17 && dealerTotal < playerTotal){
        let newCard = deck.pop();
        dealerTotal += getVal(newCard);
        let img = document.createElement("img");
        img.src = "../views/cards/" + newCard + ".png";
    
        document.getElementById("dealerHand").append(img);
    
        if(dealerTotal > 21){
            win();
        } else if(dealerTotal == 21){
            lose();
        }
    }

    if (dealerTotal > 21){ win(); return; }


    if (playerTotal > dealerTotal){
        win();
    } else{
        lose();
    }
}

function hit(){
    let newCard = deck.pop();
    playerTotal += getVal(newCard);
    let img = document.createElement("img");
    img.src = "../../../cards/" + newCard + ".png";

    document.getElementById("playerHand").append(img);

    if(playerTotal > 21){
        lose();
    } else if(playerTotal == 21){
        win();
    }
}

function restart(){
    let pH = document.getElementById("playerHand");
    let dH = document.getElementById("dealerHand");
    while(pH.firstChild){
        pH.firstChild.remove();
    } 
    while(dH.firstChild){
        dH.firstChild.remove();
    }

    playerTotal = 0;
    dealerTotal = 0;
    let but = document.getElementById("startB")
    but.style.display = "none";
    document.getElementById("stay").style.display = "revert";
    document.getElementById("hit").style.display = "revert";
    document.getElementById("lost").innerHTML = " ";

    start();
}

function getVal(x){
    let data = x.split("-"); // "2-C" == ["4", "C"]
    let val = data[0];

    if(isNaN(val)){
        if (val == "A"){
            return 11;
        }
        return 10;
    }

    return parseInt(val);
}

