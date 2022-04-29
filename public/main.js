// Focus div based on nav button click

// Flip one coin and show coin image to match result when button clicked

// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series

// Guess a flip by clicking either heads or tails button

function showPage(pageID) {
    // alert(pageID);
    const pages = document.querySelectorAll(".page");
    const activePage = document.querySelector(`#${pageID}`);
    pages.forEach((page) => { page.classList.add("hidden") });
    activePage.classList.remove("hidden");
    // console.log(pages);
}

function rotateCoin(coin) {
    coin.setAttribute("src", "./assets/img/coin.png");
    coin.classList.add("coin-rotate");
}

function stopCoin(coin, flip) {
    const newImage = `./assets/img/${flip}.png`;
    coin.setAttribute("src", newImage);
    coin.classList.remove("coin-rotate");
}

function flip() {
    const coin = document.querySelector("#single .coin-image");
    const coinLabel = document.querySelector("#single .coin-label");
    rotateCoin(coin);
    coinLabel.innerHTML = "???";

    fetch("/app/flip").then((response) => {
        return response.json();
    }).then((result) => {
        setTimeout(() => {
            stopCoin(coin, result.flip);
            coinLabel.innerHTML = result.flip.toUpperCase();
        }, 500);
    });
}

function updateBank() {
    const input = document.querySelector("#multi-flip-count");
    const max = parseInt(input.getAttribute("max"));
    const min = parseInt(input.getAttribute("min"));
    let inputValue = parseInt(input.value);

    if ( inputValue < min) {    inputValue = min    };
    if ( inputValue > max) {    inputValue = max    };

    input.value = inputValue;
    
    console.log(inputValue, max, min);
}