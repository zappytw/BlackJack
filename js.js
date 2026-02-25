
let deck;
let userValue = 0;
let dealerValue = 0;
let dealerCards = [];
let userAceCount = 0
let dealerAceCount = 0
let hitButtonStatus = {"isclickable": true}
let standButtonStatus = {"isclickable": true}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const hitButton = document.getElementById("hitButton")
const standButton = document.getElementById("standButton")
const resetButton = document.getElementById("resetButton")

const playingHand = document.getElementById("playingHand")
const userValueDisplay = document.getElementById("userValueDisplay")

const dealerHand = document.getElementById("dealerHand")
const dealerValueDisplay = document.getElementById("dealerValueDisplay")

async function generateDeck() {
    let response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    let responsejson = await response.json();
    deck = await responsejson.deck_id
}
initGame();
async function getCard(deckId) {
    let response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    let card = await response.json();
    return card
}

async function addCard(op) {
    let card = await getCard(deck)
    let cardValue = card.cards[0].value
    if(Number.isInteger(Number(cardValue))){
        cardValue = Number(cardValue)
    } else {
        if(cardValue === "ACE"){
            if(op === 1){
                userAceCount += 1
                    cardValue = 11
            } else {
                dealerAceCount += 1
                cardValue = 11
            }
        } else {
            cardValue = 10;
        }
    }
    let cardImg = document.createElement("img")
    cardImg.classList.add("card")
    cardImg.src = card.cards[0].images.png

    if(op === 1){ //1 es para user
        userValue += cardValue
        userValueDisplay.textContent = "Value: " + userValue

        playingHand.append(cardImg)
    } else if (op === 0) { // 0 es para la primera carta del dealer
        dealerValue += cardValue
        dealerValueDisplay.textContent = "Value: " + dealerValue
        dealerCards.push(card)

        dealerHand.append(cardImg)
    } else { // cualquier otra cosa es para las demas, que estan escondidas
        dealerValue += cardValue
        dealerCards.push(card)
        cardImg.src = "media/back.png"
        dealerHand.append(cardImg)
    }
}

async function initGame(){
    hideReset();
    dealerCards = []
    hitButtonStatus.isclickable = true
    standButtonStatus.isclickable = true
    dealerAceCount= 0
    userAceCount= 0
    dealerValue = 0
    userValue = 0
    dealerHand.innerHTML=""
    playingHand.innerHTML=""

    await generateDeck();
    
    await addCard(1)
    await addCard(1)

    await addCard(0)
    await addCard(2)
}
function endGame(){
    showReset();
    hitButtonStatus.isclickable = false
    standButtonStatus.isclickable = false
    if(userValue>dealerValue){
        userValueDisplay.textContent="You Win!!"
    } else if(userValue<dealerValue){
        userValueDisplay.textContent="You Lose!!"
    } else {
        userValueDisplay.textContent="It's a Draw!!"
    }

}
async function dealerTurn(){
    while(dealerValue<=16 || (dealerValue === 17 && dealerAceCount > 0)){
        await addCard(2);
        if(dealerValue>21){
            if(dealerAceCount>0){
                dealerValue-= 10
                dealerAceCount-=1
            }
        }
        await sleep(200)
    }
    await sleep(200)
    if(dealerValue>16){
        dealerHand.innerHTML=""
        for (const card of dealerCards){
            let cardImg = document.createElement("img")
            cardImg.classList.add("card")
            cardImg.src = card.cards[0].images.png
            dealerHand.append(cardImg)
        }
    }
    dealerValueDisplay.textContent="Value: " + dealerValue
    if(dealerValue>21){
            showReset();
            userValueDisplay.textContent="Dealer busted! You Win!!"
            hitButtonStatus.isclickable = false
            standButtonStatus.isclickable = false
    } else {
        endGame();
    }
    }

function showReset() {
    resetButton.style.opacity="1"
    resetButton.style.display="block"
    resetButton.style.pointerEvents="all"
}
function hideReset() {
    resetButton.style.opacity="0"
    resetButton.style.display="none"
    resetButton.style.pointerEvents="none"
}
hitButton.addEventListener("click", async () =>{
    if (hitButtonStatus.isclickable === true){
    await addCard(1);
    if(userValue>21){
        while (userValue>21){
            if(userAceCount>0){
                userValue-=10
                userAceCount-=1
                userValueDisplay.textContent="Value: " + userValue
            } else {
                showReset();
                userValueDisplay.textContent="You are over 21! You're Busted"
                hitButtonStatus.isclickable = false
                standButtonStatus.isclickable = false
                break
            }
        }
    }
}
})

standButton.addEventListener("click", async () =>{
    if (standButtonStatus.isclickable === true){
        hitButtonStatus.isclickable = false
        standButtonStatus.isclickable = false
        await dealerTurn()
        
    }
})

resetButton.addEventListener("click", () =>{
    initGame();
})