import Card from "./card-class.js";

const container = document.getElementById("container");
const fieldGame = document.getElementById("game");
const result = document.getElementById("result");
let firstCard = null;
let secondCard = null;

function setSizeCard(count) {
  switch (count) {
    case 4:
      fieldGame.style = `grid-template-columns: repeat(${2}, 1fr);`;
      break;
    case 8:
      fieldGame.style = `grid-template-columns: repeat(${4}, 1fr);`;
      break;
    case 12:
      fieldGame.style = `grid-template-columns: repeat(${3}, 1fr);`;
      break;
    case 16:
      fieldGame.style = `grid-template-columns: repeat(${4}, 1fr);`;
      break;
    case 20:
      fieldGame.style = `grid-template-columns: repeat(${4}, 1fr);`;
      break;
  }
}

function createNumbersArray(count) {
  let array = [];
  for (let i = 1; i <= count; i++) {
    array.push(i, i);
  }
  return array;
}

function shuffle(array) {
  let shuffleArray = array.sort(() => Math.random() - 0.5);
  return shuffleArray;
}

function createGameForm() {
  let form = document.createElement("form");
  let input = document.createElement("input");
  let button = document.createElement("button");

  form.classList.add("form");
  input.classList.add("input");
  input.setAttribute("type", "number");
  input.placeholder = "Укажите количество карт: 2, 4, 6, 8 или 10 пар";
  button.classList.add("button");
  button.setAttribute("disabled", "");
  button.innerHTML = addStyleBtn('Начать игру');

  input.addEventListener("input", function () {
    if (input.value !== "") {
      button.disabled = false;
    } else {
      result.textContent = "";
      button.disabled = true;
    }
  });

  form.append(input);
  form.append(button);

  return {
    form,
    input,
    button,
  };
}

function flip(card) {
  if (card.open === true || card.success === true) {
    return;
  }

  if (firstCard !== null && secondCard !== null) {
    firstCard.open = false;
    secondCard.open = false;
    firstCard.img.style.display = "none";
    secondCard.img.style.display = "none";
    firstCard = null;
    secondCard = null;
  }

  card.open = true;
  card.img.style.display = "block";

  if (firstCard === null) {
    firstCard = card;
  } else {
    secondCard = card;
  }

  if (firstCard !== null && secondCard !== null) {
    if (firstCard.cardNumber === secondCard.cardNumber) {
      firstCard.success = true;
      secondCard.success = true;
      firstCard.img.style.display = "block";
      secondCard.img.style.display = "block";
      firstCard = null;
      secondCard = null;
    }
  }
}

function addStyleBtn(textContent) {
  return `<span class="button-text">${textContent}<span class="reflection"></span></span>`;
}

function createBtnRestart(cardsArray) {
  let buttonRestart = document.createElement("button");
  buttonRestart.classList.add("button");
  buttonRestart.innerHTML = addStyleBtn('Сыграть ещё раз');
  result.append(buttonRestart);

  buttonRestart.addEventListener("click", () => {
    let shuffleArray = shuffle(cardsArray);
    buttonRestart.remove();
    fieldGame.innerHTML = "";
    createListCards(shuffleArray);
  });

  return buttonRestart;
}

function createListCards(cardsArray) {
  for (let item in cardsArray) {
    const card = new Card(fieldGame, cardsArray[item], flip);

    card.cardElement.addEventListener("click", () => {
      if (cardsArray.length === document.querySelectorAll(".success").length) {
        if (document.querySelector(".button")) {
          return;
        } else {
          createBtnRestart(cardsArray);
        }
      }
    });
  }
}

function startGame() {
  let gameForm = createGameForm();
  container.append(gameForm.form);

  gameForm.form.addEventListener("submit", function(e) {
    e.preventDefault();
    if (!gameForm.input.value) {
      return;
    }

    let count = gameForm.input.value;

    if (count % 2 == 0 && count <= 10) {
      count;
      result.textContent = "";
    } else {
      gameForm.input.value = "4";
      result.textContent =
        'Введено некорректное значение! Выберите чётное количество карт от 2 до 10, или оставьте 4 и нажмите "Начать игру"';
      return;
    }
    setSizeCard(count * 2);

    let array = createNumbersArray(count);
    gameForm.form.remove();
    let shuffleArray = shuffle(array);
    createListCards(shuffleArray);
  });
}
startGame();
