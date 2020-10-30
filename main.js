const content = document.getElementById("content");
const input = document.getElementById("input");
const sortBtn = document.getElementById("sort");

//reset input
input.value = "";

//fetch data from API
fetch("https://api.coinlore.com/api/tickers/")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    // console.log(data.data);
    let duomenys = data.data;

    //add cards inittialy
    const cards = duomenys.forEach((el) => {
      content.appendChild(
        createCard(el.name, el.symbol, el.price_usd, el.percent_change_24h)
      );
    });

    //get input value
    input.addEventListener("keyup", (e) => {
      content.innerHTML = "";
      //check if name contains value
      duomenys.forEach((el) => {
        if (el.name.toLowerCase().includes(input.value)) {
          //add cards
          content.appendChild(
            createCard(el.name, el.symbol, el.price_usd, el.percent_change_24h)
          );
        }
      });
    });

    //sort
    sortBtn.addEventListener("click", (e) => {
      content.innerHTML = "";

      if (e.target.innerText === "Sort A-Z") {
        duomenys.sort(compareA).forEach((el) => {
          content.appendChild(
            createCard(el.name, el.symbol, el.price_usd, el.percent_change_24h)
          );
        });

        //change text
        e.target.innerText = "Sort Z-A";
      } else {
        duomenys.sort(compareB).forEach((el) => {
          content.appendChild(
            createCard(el.name, el.symbol, el.price_usd, el.percent_change_24h)
          );
        });

        //change text
        e.target.innerText = "Sort A-Z";
      }
    });
  });

const compareA = (a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  return nameA === nameB ? 0 : nameA < nameB ? -1 : 1;
};

const compareB = (a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  return nameA === nameB ? 0 : nameA < nameB ? 1 : -1;
};

const createCard = (name, symbol, price, priceChange) => {
  //card
  let card = document.createElement("div");
  card.className = "card";

  //card left
  let cardLeft = document.createElement("div");
  cardLeft.className = "card__left";
  let cardLeftTitle = document.createElement("h2");
  cardLeftTitle.className = "card__left-title";
  cardLeftTitle.innerText = name;
  let cardLeftSymbol = document.createElement("span");
  cardLeftSymbol.className = "card__left-symbol";
  cardLeftSymbol.innerText = symbol;

  cardLeft.appendChild(cardLeftTitle);
  cardLeft.appendChild(cardLeftSymbol);

  card.appendChild(cardLeft);

  //card right
  let cardRight = document.createElement("div");
  cardRight.className = "card__right";
  let cardRightPrice = document.createElement("h3");
  cardRightPrice.className = "card__right-price";
  cardRightPrice.innerText = price + " $";
  //change
  let change = document.createElement("div");
  change.className = "change";
  let changeTitle = document.createElement("h4");
  changeTitle.className = "change__title";
  changeTitle.innerText = "Price change 24h";
  let changeNumber = document.createElement("span");
  changeNumber.className = "change__number";
  changeNumber.innerText = priceChange + "%";

  change.appendChild(changeTitle);
  change.appendChild(changeNumber);

  cardRight.appendChild(cardRightPrice);
  cardRight.appendChild(change);

  card.appendChild(cardRight);

  return card;
};
