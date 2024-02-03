// blackjack js
var playerTotal = 0;
var dealerTotal = 0;
var gameOver = 0;
var round = 0;

window.onload=function(){ // wait for webpage to load; setup all button click events
    hitButton = document.getElementById("hit");
    startButton = document.getElementById("startB");
    stayButton = document.getElementById("stay");
    pVal = document.getElementById("pVal");
    dVal = document.getElementById("dVal");

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

    blank.src = "../../../Images/card back red.png";
    dealerImg.src = "../../../cards/" + dealerCard + ".png";

    dealerTotal += getVal(dealerCard) + getVal(hidden);

    document.getElementById("dealerHand").append(blank)
    document.getElementById("dealerHand").append(dealerImg);
    for (let i = 0; i < 2; i ++){ // player inital cards
        let img = document.createElement("img");
        let card = deck.pop();

        img.src = "../../../cards/" + card + ".png";
        playerTotal += getVal(card);
        document.getElementById("playerHand").append(img);
    }
    
    dVal.innerHTML = (dealerTotal - getVal(hidden)).toString();
    pVal.innerHTML = playerTotal.toString();
    
    if(playerTotal == 21){
        win();
        return;
    } else if(playerTotal > 21){
        lose();
    }

    round = 1;
}

function win(){
    blank.src = "../../../cards/" + hidden + ".png";
    stayButton.style.display = "none";
    hitButton.style.display = "none";
    document.getElementById("lost").innerHTML = "You Win!";
    pVal.innerHTML = playerTotal.toString();
    dVal.innerHTML = dealerTotal.toString();

    startButton.style.display = "revert"; // bring back the start button
}

function lose(){
    blank.src = "../../../cards/" + hidden + ".png";
    stayButton.style.display = "none";
    hitButton.style.display = "none";
    document.getElementById("lost").innerHTML = "You Lose!";
    pVal.innerHTML = playerTotal.toString();
    dVal.innerHTML = dealerTotal.toString();

    startButton.style.display = "revert"; // bring back start button
}

function draw(){
    blank.src = "../../../cards/" + hidden + ".png";
    stayButton.style.display = "none";
    hitButton.style.display = "none";
    document.getElementById("lost").innerHTML = "Draw!";
    pVal.innerHTML = playerTotal.toString();
    dVal.innerHTML = dealerTotal.toString();

    startButton.style.display = "revert"; // bring back start button
}

function stay(){
    while (dealerTotal <= playerTotal && dealerTotal < 17){
        let newCard = deck.pop();
        dealerTotal += getVal(newCard);
        let img = document.createElement("img");
        img.src = "../../../cards/" + newCard + ".png";
    
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
    }else if(dealerTotal == playerTotal){
        draw();
    }else{
        lose();
    }
}

function hit(){
    let newCard = deck.pop();
    playerTotal += getVal(newCard);
    let img = document.createElement("img");
    img.src = "../../../cards/" + newCard + ".png";

    document.getElementById("playerHand").append(img);
    pVal.innerHTML = playerTotal.toString();

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
    startButton.style.display = "none";
    stayButton.style.display = "revert";
    hitButton.style.display = "revert";
    document.getElementById("lost").innerHTML = " ";

    start();
}   

function getVal(x){
    let data = x.split("-"); // "2-C" == ["4", "C"]
    let val = data[0];

    if(isNaN(val)){
        if (val == "A"){
            if (round == 0){
                round = 1;
                return 11;
            } else if (round == 1){
                return 1;
            }
        }
        return 10;
    }

    return parseInt(val);
}

