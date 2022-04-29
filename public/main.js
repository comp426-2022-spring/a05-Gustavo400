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
    rotateCoin(coin);

    fetch("/app/flip").then((response) => {
        return response.json();
    }).then((result) => {
        console.log(result);
        const flip = result.flip;
        setTimeout(() => {
            stopCoin(coin, result.flip);
        }, 500);
    });
}