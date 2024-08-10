const cards = document.querySelectorAll('.card'); 
let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0; 

function flipCard(e){ 
    let clickedCard = e.target; //getting user clicked card
    if(clickedCard !== cardOne && !disableDeck){ 
        clickedCard.classList.add('flip');
        if(!cardOne){
            return cardOne = clickedCard; //return the cardOne value to clickedCard
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector('img').src, 
        cardTwoImg = cardTwo.querySelector('img').src; 
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2){ 
    if(img1 === img2){ // if two cards img matched
        matchedCard++; //increment matched value by one
        if(matchedCard == 8){ // if matched value is 8 that means user has matched all the cards
            setTimeout(() => {
                showCongratulations(); // Show the congratulations message
            }, 1000); // Show the message after 1 second
        }
        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        cardOne = cardTwo = '';
        disableDeck = false;
    } else {
        setTimeout(() => { // if two cards do not match
            cardOne.classList.add('shake');
            cardTwo.classList.add('shake');
        }, 400);

        setTimeout(() => { 
            cardOne.classList.remove('shake', 'flip');
            cardTwo.classList.remove('shake', 'flip');
            cardOne = cardTwo = '';
            disableDeck = false;
        }, 1200);
    }
}

function showCongratulations() {
    const congratsMessage = document.getElementById('congratsMessage');
    congratsMessage.style.display = 'block';

    setTimeout(() => {
        congratsMessage.style.display = 'none';
        resetGame(); // Reset the game after showing the message
    }, 3000); // Show message for 3 seconds before resetting the game
}

function resetGame() {
    matchedCard = 0;
    cardOne = cardTwo = "";
    shuffleCard();
}

function shuffleCard(){
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]; //creating array of 16 items and each item is repeated twice
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);//sorting array item randomly

    cards.forEach((card, index) => { 
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);

        let imgTag = card.querySelector('img');
        imgTag.src = `images/img-${arr[index]}.png`;
    });
}

shuffleCard();

cards.forEach(card => { // adding click event to all cards
    card.addEventListener('click', flipCard); 
});
