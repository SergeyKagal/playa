import { b1, b2, screenHeight, screenWidth, startTime } from '..';
import { PI } from './from-to';
const timeOnScreen = document.getElementById('time');

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
    return screenHeight / 3 + this.radius * Math.sin(this.fi);
  },

  changeFi() {
    this.fi += this.angleSpeed;
    if (this.fi >= 2 * PI) {
      this.fi = 0;
    }
  },
};

export const animB1ByX = () => {
  const now = Date.now();
  console.log(screenWidth, screenHeight, window.innerWidth);

  options.changeDirection();
  b1.style.left = `${options.x}px`;
  options.x += options.speed * options.direction;

  b2.style.left = `${roundOption.x}px`;
  b2.style.top = `${roundOption.y}px`;

  b2.style.transform = `rotate(${(roundOption.fi * 180) / PI}deg)`;
  roundOption.changeFi();

  requestAnimationFrame(animB1ByX);

  timeOnScreen.children[0].textContent = `: ${(
    (now - startTime) /
    1000
  ).toFixed(1)}`;
};
