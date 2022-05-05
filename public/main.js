// Focus div based on nav button click

// Flip one coin and show coin image to match result when button clicked

// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series

// Guess a flip by clicking either heads or tails button

let singleTimeout = undefined;
let guessTimeout = undefined;
let multiTimeouts = [];
let myCall = "heads";

function showPage(pageID) {
    // alert(pageID);
    const pages = document.querySelectorAll(".page");
    const activePage = document.querySelector(`#${pageID}`);
    pages.forEach((page) => { page.classList.add("hidden") });
    activePage.classList.remove("hidden");
    // console.log(pages);
}

function clearMultiTimeouts() {
    multiTimeouts.forEach((timeout) => {    clearTimeout(timeout)   })
    multiTimeouts = [];
}

function makeCoinURL(flip) {
    return `./assets/img/${flip}.png`
}

function rotateCoin(coin) {
    coin.setAttribute("src", makeCoinURL("coin"));
    coin.classList.add("coin-rotate");
}

function stopCoin(coin, flip) {
    coin.setAttribute("src", makeCoinURL(flip));
    coin.classList.remove("coin-rotate");
}

function flip() {
clearTimeout(singleTimeout);


    const coin = document.querySelector("#single .coin-image");
    const coinLabel = document.querySelector("#single .coin-label");
    rotateCoin(coin);
    coinLabel.innerHTML = "???";

    fetch("/app/flip").then((response) => {
        return response.json();
    }).then((result) => {
        singleTimeout = setTimeout(() => {
            stopCoin(coin, result.flip);
            coinLabel.innerHTML = result.flip.toUpperCase();
        }, 500);
    });
}

function updateBank() {
    clearMultiTimeouts();
    const coinLabel = document.querySelector("#multi .coin-label");
    const coinHTML = `<img class="coin-image coin-rotate" src="./assets/img/coin.png">`;
    const bank = document.querySelector("#coin-bank");
    const input = document.querySelector("#multi-flip-count");
    const max = parseInt(input.getAttribute("max"));
    const min = parseInt(input.getAttribute("min"));
    let inputValue = parseInt(input.value);

    if ( inputValue < min) {    inputValue = min    };
    if ( inputValue > max) {    inputValue = max    };
    if ( isNaN(inputValue)) {   inputValue = min  }
    input.value = inputValue;

    let coins = "";
    for ( let i = 0; i < inputValue; i++) {
        coins = coins + coinHTML;
    }
    bank.innerHTML = coins;
    coinLabel.innerHTML = "HEADS:   0   TAILS:  0";

    // console.log(inputValue, max, min);
}

function multiflip() {
    clearMultiTimeouts();

    let headsCount = 0;
    let tailsCount = 0;
    const coinList = document.querySelectorAll("#coin-bank .coin-image");
    const coinLabel = document.querySelector("#multi .coin-label");
    const inputValue = parseInt(document.querySelector("#multi-flip-count").value);
    // console.log("Flipping " + inputValue  + " coin(s)");
    const postOptions = {
        "method": "POST", 
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        "body": JSON.stringify({    "number": inputValue   })
    }

    coinList.forEach((coin) => {    rotateCoin(coin);    })
    coinLabel.innerHTML = "HEADS:   0 TAILS:  0";

    fetch("/app/flip/coins", postOptions).then((response) => {
        return response.json();
    }).then((result) => {
        // console.log(result);
        const flipList = result.raw;
        flipList.forEach((flip, index) => {
                let timeoutID = setTimeout(() => {
                    stopCoin(coinList[index], flip);
                    if ( flip === "heads") {
                        headsCount++;
                    } else {
                        tailsCount++;
                    }
                    coinLabel.innerHTML = `HEADS:   ${headsCount} TAILS:  ${tailsCount}`;
                }, 100 + (index * 100));
                multiTimeouts.push(timeoutID);
        });
    });
}

function updateCall(call) {
    console.log("My call is " + call);
    const coinButtons = document.querySelectorAll(".coin-button");
    const activeButton = document.querySelector(`.coin-button.${call}`);
    coinButtons.forEach((button) => {   button.classList.remove("active")   })
    activeButton.classList.add("active");
    myCall = call;
}

function guessFlip() {
    clearTimeout(guessTimeout);

    const coinLabel = document.querySelector("#guess .coin-label");
    const coin = document.querySelector("#guess .coin-image");
    rotateCoin(coin);
    coinLabel.innerHTML = "What's it gonna be?"

    const postOptions = {
        "method": "POST", 
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        "body": JSON.stringify({    "guess": myCall   })
    }

    fetch("/app/flip/call", postOptions).then((response) => {
        return response.json();
    }).then((result) => {
        guessTimeout = setTimeout(() => {
            stopCoin(coin, result.flip);
            coinLabel.innerHTML = result.result === "win" ? "Beginner's luck..." : "Better luck next time! >:]"
        }, 1000)
        console.log(result);
        // const flipList = result.raw;
        // flipList.forEach((flip, index) => {
        //         let timeoutID = setTimeout(() => {
        //             stopCoin(coinList[index], flip);
        //             if ( flip === "heads") {
        //                 headsCount++;
        //             } else {
        //                 tailsCount++;
        //             }
        //             coinLabel.innerHTML = `HEADS:   ${headsCount} TAILS:  ${tailsCount}`;
        //         }, 100 + (index * 100));
        //         multiTimeouts.push(timeoutID);
        });
}