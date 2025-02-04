export default class Card {

  constructor(container, cardNumber, flip) {
    this.container = container;
    this.cardNumber = cardNumber;
    this.flip = flip;
    this.createElement()
  }

  set cardNumber(value) {
    this._cardNumber = value;
  }
  get cardNumber() {
    return this._cardNumber;
  }

  set open(value) {
    if (value) {
      this.cardElement.classList.add('open');
    } else {
      this.cardElement.classList.remove('open');
    }
  }
  get open() {
    if (this.cardElement.classList.contains('open')) {
      return true;
    }
    return false;
  }

  set success(value) {
    if (value) {
      this.cardElement.classList.add('success');
    } else {
      this.cardElement.classList.remove('success');
    }
  }
  get success() {
    if (this.cardElement.classList.contains('success')) {
      return true;
    }
    return false;
  }

  createElement() {
    const card = document.createElement('li');
    card.classList.add('card');
    this.img = document.createElement('img');
    this.img.src = `./img/${this.cardNumber}.webp`;
    this.img.style.display = 'none';
    card.append(this.img);
    this.container.append(card);
    this.cardElement = card;

    this.cardElement.addEventListener('click', () => {
      this.flip(this);
    });

    return card;
  }
}
