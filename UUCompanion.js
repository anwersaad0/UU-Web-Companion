let playerList = [];

// HTML imports
const playerListDiv = document.getElementById("playerListDiv");
const playerModal = document.getElementById("playerModal");
const cardModal = document.getElementById("cardModal");

const addPlayerBtn = document.getElementById("addPlayer");
const startGameBtn = document.getElementById("startGame");
const resetGameBtn = document.getElementById("resetGame");
const resetAllBtn = document.getElementById("resetAll");

const playerNameInput = document.getElementById("playerName");
const submitPlayerBtn = document.getElementById("submitPlayer");

const cardNameInput = document.getElementById("cardName");
const cardDescInput = document.getElementById("cardDesc");
const submitCardBtn = document.getElementById("submitCard");
//

//constructors
function Player(name, stable, ifTurn, playerDiv) {
    this.name = name;
    this.stable = stable;
    this.ifTurn = ifTurn;
    this.playerDiv = playerDiv;
}

function Card(name, description) {
    this.name = name;
    this.description = description;
}
//

//functions
function addPlayer() {
    let newPlayerName = document.createElement("p");
    newPlayerName.textContent = playerNameInput.value;

    let newStable = [];

    let newIfTurn = false;

    let newPlayerDiv = document.createElement("div");
    newPlayerDiv.setAttribute("id", "playerDiv");
    playerListDiv.appendChild(newPlayerDiv);

    let playerUI = document.createElement("div");
    playerUI.setAttribute("id", "playerUI");

    let cardsLabel = document.createElement("p");
    cardsLabel.textContent = "Cards";
    cardsLabel.setAttribute("id", "cardsLabel");

    let addCardBtn = document.createElement("button");
    addCardBtn.setAttribute("id", "addCardBtn");
    addCardBtn.textContent = "Add Card";
    addCardBtn.addEventListener('click', function(e) {
        cardModal.style.display = "block";
    })

    let deletePlayerBtn = document.createElement("button");
    deletePlayerBtn.setAttribute("id", "deletePlayerBtn");
    deletePlayerBtn.textContent = "Remove Player";
    deletePlayerBtn.onclick = function(){removePlayer(newPlayerDiv, newPlayer)};

    let nextTurnButton = document.createElement("button");
    nextTurnButton.setAttribute("id", "nextTurnBtn");
    nextTurnButton.textContent = "Next Turn";

    let cardsDiv = document.createElement("div");
    cardsDiv.setAttribute("id", "cardsDiv");

    const newPlayer = new Player(playerNameInput.value, newStable, newIfTurn, newPlayerDiv);

    playerUI.appendChild(cardsLabel);
    playerUI.appendChild(addCardBtn);
    playerUI.appendChild(nextTurnButton);

    newPlayerDiv.appendChild(newPlayerName);
    //newPlayerDiv.appendChild(addCardBtn);
    newPlayerDiv.appendChild(playerUI);
    newPlayerDiv.appendChild(cardsDiv);
    newPlayerDiv.appendChild(deletePlayerBtn);
}

function removePlayer(selectedDiv, player) {
    playerListDiv.removeChild(selectedDiv);
    for (var i = 0; i < playerList; i++) {
        if (playerList[i] == player) {
            playerList.splice(i, i + 1);
        }
    }

}

function nextTurn() {
    //switch the border colors of the active player to the next active player
    for (let i = 0; i < playerList.length; i++) {
        if (playerList[i].ifTurn == true) {
            playerList[i].ifTurn = false;
            playerList[i].playerDiv.setAttribute("id, playerDiv");
            // change player border accordingly

            if (i == playerList.length) {
                playerlist[0].ifTurn = true;
                playerList[0].playerDiv.setAttribute("id, currentPlayerDiv");
            } else {
                playerlist[i + 1].ifTurn = true;
                playerList[i + 1].playerDiv.setAttribute("id, currentPlayerDiv");
            }
            //change player border accordingly
        }
    }
}

function addCard(card) {
    //add a card's name and details to a player's stable
}
//

addPlayerBtn.addEventListener('click', function(e) {
    playerModal.style.display = "block";
});

/*function openCardModal() {
    cardModal.style.display = "block";
}*/

window.addEventListener('click', function(e) {
    if (e.target == playerModal) {
        playerModal.style.display = "none";
    } else if (e.target == cardModal) {
        cardModal.style.display = "none";
    }
});

submitPlayerBtn.addEventListener('click', function(e) {
    if (playerNameInput.value != "") {
        addPlayer();
        playerNameInput.value = "";
        playerModal.style.display = "none";
    }
});

submitCardBtn.addEventListener('click', function(e) {
    if (cardNameInput.value != "") {
        //addCard();
        cardNameInput.value = "";
        cardDescInput.value = "";
        cardModal.style.display = "none";
    }
});