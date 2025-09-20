let allCoins = []
let container = document.querySelector(".container");

function loadcrypto(currency){
   let API_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=40&page=1&sparkline=false`;

    fetch(API_URL)
    .then(response => response.json())
    .then(data => {

        allCoins = data
        displayCards(allCoins , currency)

    })  
    .catch(error => console.error("Error fetching crypto data:", error));


}



function displayCards(coins , currency){

    container.innerHTML = ""
        coins.forEach(coin => {
            
            let card = document.createElement("div");
    card.classList.add("card");

    // Image
    let img = document.createElement("img");
    img.src = coin.image;
    img.alt = coin.name;

    // Title
    let title = document.createElement("h2");
    title.textContent = `${coin.name} (${coin.symbol.toUpperCase()})`;

    // Price
    var price = document.createElement("p");
    price.textContent = `Price: ${coin.current_price}  ${currency.toUpperCase()}`;

    // Market Cap
    let marketCap = document.createElement("p");
    marketCap.textContent = `Market Cap: ${coin.market_cap}`;

    let change = document.createElement("p");
    change.textContent = `24h Change %: ${coin.price_change_percentage_24h}`;

    if (coin.price_change_percentage_24h >= 0) {
          change.style.color = "green";
        } else {
          change.style.color = "red";
        }

    // Append children to card
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(marketCap);
    card.appendChild(change)

        container.appendChild(card)

        });



}


loadcrypto("usd")


let drop_down = document.querySelector("#currency")



drop_down.addEventListener("change" , (e) => {
    
    loadcrypto(e.target.value)
    
    
})


let inp = document.querySelector("#search")

inp.addEventListener("input" , (e) => {
  
    let searchTerm = e.target.value.toLowerCase()
    let newCards = allCoins.filter(card => {
        return card.name.toLowerCase().includes(searchTerm)
    })
    
    displayCards(newCards , drop_down.value)
})