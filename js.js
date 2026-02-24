
let deck;
let userValue = 0;
let dealerValue = 0;
let dealerCards = [];
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
            cardValue = 1

        } else {
            cardValue = 10;
        }}

    let cardImg = document.createElement("img")
    cardImg.src = await card.cards[0].images.png

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
    await generateDeck();
    
    await addCard(1)
    await addCard(1)

    await addCard(0)
    await addCard(2)
}

function dealerTurn(){
    while(dealerValue<16){
        addCard(2);
    }
}
const hitButton = document.getElementById("hitButton")
const standButton = document.getElementById("standButton")

const playingHand = document.getElementById("playingHand")
const userValueDisplay = document.getElementById("userValueDisplay")

const dealerHand = document.getElementById("dealerHand")
const dealerValueDisplay = document.getElementById("dealerValueDisplay")

hitButton.addEventListener("click", async () =>{
    await addCard(1);
    if(userValue>21){
        userValueDisplay.textContent="You are over 21! You're Busted"
    }
})

standButton.addEventListener("click", async () =>{
    dealerTurn()
})