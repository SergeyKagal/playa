import './style/style.scss';

const b1 = document.querySelector('.b1');
const b2 = document.querySelector('.b2');
const screenWidth = window.innerWidth - b1.clientWidth - 20;
const screenHeight = window.innerHeight - b1.clientHeight - 20;
const PI = Math.PI;

const duration = 2500;

const options = {
  x: 0,
  speed: 5,
  direction: -1,
  duration: 10000,

  changeDirection() {
    if (this.x > screenWidth || this.x < 0) {
      this.direction *= -1;
    }
  },
};

const roundOption = {
  radius: 100,
  fi: 0,
  angleSpeed: 0.05,
  get x() {
    return screenWidth / 2 + this.radius * Math.cos(this.fi);
  },
  get y() {
    return screenHeight / 2 + this.radius * Math.sin(this.fi);
  },

  changeFi() {
    this.fi += this.angleSpeed;
    if (this.fi >= 2 * PI) {
      this.fi = 0;
    }
  },
};
let alfa = 0;
let now = new Date();
const animB1ByX = () => {
  const time = new Date();
  options.changeDirection();
  b1.style.left = `${options.x}px`;
  options.x += options.speed * options.direction;

  b2.style.left = `${roundOption.x}px`;
  b2.style.top = `${roundOption.y}px`;

  b2.style.transform = `rotate(${(roundOption.fi * 180) / PI}deg)`;
  roundOption.changeFi();
  if (time - now >= duration) {
    console.log('stop');
    return;
  }
  requestAnimationFrame(animB1ByX);

  console.log(time - now);
};

animB1ByX();
