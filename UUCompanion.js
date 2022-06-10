let playerList = [];
const MAX_PLAYERS = 8;

// HTML imports
const playerListDiv = document.getElementById("playerListDiv");

const playerModal = document.getElementById("playerModal");
const startGameModal = document.getElementById("startGameModal");
const resetGameModal = document.getElementById("resetGameModal");
const resetAllModal = document.getElementById("resetAllModal");
const infoModal = document.getElementById("infoModal");

const addPlayerBtn = document.getElementById("addPlayer");
const startGameBtn = document.getElementById("startGame");
const resetGameBtn = document.getElementById("resetGame");
const resetAllBtn = document.getElementById("resetAllBtn");
const infoBtn = document.getElementById("infoBtn");

const playerNameInput = document.getElementById("playerName");
const submitPlayerBtn = document.getElementById("submitPlayer");
const cancelPlayerBtn = document.getElementById("closeSubmit");

const startGameInput = document.getElementById("startGameName");
const submitStartGame = document.getElementById("submitStart");
const cancelStartGame = document.getElementById("closeStart");

const cardNameInput = document.getElementById("cardName");
const cardDescInput = document.getElementById("cardDesc");
const submitCardBtn = document.getElementById("submitCard");

const declineResetGameBtn = document.getElementById("declineResetGame");
const confirmResetGameBtn = document.getElementById("confirmResetGame");

const declineResetAllBtn = document.getElementById("declineResetAll");
const confirmResetAllBtn = document.getElementById("confirmResetAll");

const closeInfo = document.getElementById("closeInfo");
//

//constructors
function Player(name, stable, playerDiv, cardsDiv) {
    this.name = name;
    this.stable = stable;
    this.playerDiv = playerDiv;
    this.cardsDiv = cardsDiv;
}
//

//functions
function addPlayer() {
    let newPlayerName = document.createElement("p");
    newPlayerName.textContent = playerNameInput.value;

    let newStable = [];

    let newPlayerDiv = document.createElement("div");
    newPlayerDiv.setAttribute("id", "playerDiv");
    playerListDiv.appendChild(newPlayerDiv);

    let playerUI = document.createElement("div");
    playerUI.setAttribute("id", "playerUI");

    let cardsLabel = document.createElement("p");
    cardsLabel.textContent = "Stable";
    cardsLabel.setAttribute("id", "cardsLabel");

    let addCardBtn = document.createElement("button");
    addCardBtn.setAttribute("id", "addCardBtn");
    addCardBtn.textContent = "Add Card";
    addCardBtn.addEventListener('click', function(e) {
        
        let addedCardDiv = document.createElement("div");
        addedCardDiv.setAttribute("id", "addedCardDiv");
        newCardsDiv.appendChild(addedCardDiv);

        let chooseCardName = document.createElement("input");
        addedCardDiv.appendChild(chooseCardName);

        let chooseCardDesc = document.createElement("input");
        addedCardDiv.appendChild(chooseCardDesc);

        let submitCardBtn = document.createElement("button");
        submitCardBtn.textContent = "Submit Card";
        submitCardBtn.addEventListener('click', function(e) {
            if (chooseCardName.value != "") {
                chooseCardName.disabled = true;

                if (chooseCardDesc.value == "") {
                    chooseCardDesc.value = "No Effect";
                }
                chooseCardDesc.disabled = true;

                deleteCardBtn.style.display = "inline";
                addedCardDiv.removeChild(submitCardBtn);
            }
        });

        let deleteCardBtn = document.createElement("button");
        deleteCardBtn.textContent = "Delete Card";
        deleteCardBtn.onclick = function(){removeCard(addedCardDiv, newCardsDiv)};
        deleteCardBtn.style.display = "none";

        addedCardDiv.appendChild(submitCardBtn);
        addedCardDiv.appendChild(deleteCardBtn);
    })

    let deletePlayerBtn = document.createElement("button");
    deletePlayerBtn.setAttribute("id", "deletePlayerBtn");
    deletePlayerBtn.textContent = "Remove Player";
    deletePlayerBtn.onclick = function(){removePlayer(newPlayerDiv, newPlayer)};

    let nextTurnButton = document.createElement("button");
    nextTurnButton.setAttribute("id", "nextTurnBtn");
    nextTurnButton.textContent = "My Turn";
    nextTurnButton.onclick = function(){nextTurn(newPlayerDiv)};

    let newCardsDiv = document.createElement("div");
    newCardsDiv.setAttribute("id", "cardsDiv");

    playerUI.appendChild(cardsLabel);
    playerUI.appendChild(addCardBtn);
    playerUI.appendChild(nextTurnButton);

    newPlayerDiv.appendChild(newPlayerName);
    newPlayerDiv.appendChild(playerUI);
    newPlayerDiv.appendChild(newCardsDiv);
    newPlayerDiv.appendChild(deletePlayerBtn);

    const newPlayer = new Player(playerNameInput.value, newStable, newPlayerDiv, newCardsDiv);
    playerList.push(newPlayer);
}

function removePlayer(selectedDiv, player) {
    for (var i = 0; i < playerList.length; i++) {
        if (playerList[i] == player) {
            playerList.splice(i, 1);
        }
    }
    playerListDiv.removeChild(selectedDiv);
}

function beginGame() {
    for (let i = 0; i < playerList.length; i++) {
        if (playerList[i].name == startGameInput.value) {
            playerList[i].playerDiv.setAttribute("id", "currentPlayerDiv");
        } else {
            playerList[i].playerDiv.setAttribute("id", "playerDiv");
        }
    }
}

function nextTurn(targetDiv) {
    for (let i = 0; i < playerList.length; i++) {
        playerList[i].playerDiv.setAttribute("id", "playerDiv");
    }

    targetDiv.setAttribute("id", "currentPlayerDiv");
}

function removeCard(selectedDiv, parent) {
    parent.removeChild(selectedDiv);
}


addPlayerBtn.addEventListener('click', function(e) {
    playerModal.style.display = "block";
});

window.addEventListener('click', function(e) {
    if (e.target == playerModal) {
        playerModal.style.display = "none";
    } else if (e.target == startGameModal) {
        startGameModal.style.display = "none";
    } else if (e.target == resetGameModal) {
        resetGameModal.style.display = "none";
    } else if (e.target == resetAllModal) {
        resetAllModal.style.display = "none";
    } else if (e.target == infoModal) {
        infoModal.style.display = "none";
    }
});

submitPlayerBtn.addEventListener('click', function(e) {
    if (playerNameInput.value != "" && playerList.length < MAX_PLAYERS) {
        addPlayer();
        playerNameInput.value = "";
        playerModal.style.display = "none";
    }
});

startGameBtn.addEventListener('click', function(e) {
    startGameModal.style.display = "block";
});

resetAllBtn.addEventListener('click', function(e) {
    resetAllModal.style.display = "block";
});

resetGameBtn.addEventListener('click', function(e) {
    resetGameModal.style.display = "block";
});

confirmResetAllBtn.addEventListener('click', function(e) {
    playerListDiv.innerHTML = "";
    playerList = [];
    resetAllModal.style.display = "none";
});

declineResetAllBtn.addEventListener('click', function(e) {
    resetAllModal.style.display = "none";
});

confirmResetGameBtn.addEventListener('click', function(e) {
    for (let i = 0; i < playerList.length; i++) {
        playerList[i].cardsDiv.innerHTML = "";
        playerList[i].playerDiv.setAttribute("id", "playerDiv");
    }
    resetGameModal.style.display = "none";
});

declineResetGameBtn.addEventListener('click', function(e) {
    resetGameModal.style.display = "none";
});

submitStartGame.addEventListener('click', function(e) {
    if (startGameInput.value != "") {
        beginGame();
        startGameInput.value = "";
        startGameModal.style.display = "none";
    }
});

infoBtn.addEventListener('click', function(e) {
    infoModal.style.display = "block";
});

cancelPlayerBtn.addEventListener('click', function(e) {
    playerModal.style.display = "none";
});

cancelStartGame.addEventListener('click', function(e) {
    startGameModal.style.display = "none";
})

closeInfo.addEventListener('click', function(e) {
    infoModal.style.display = "none";
});