import { o1 } from './js/from-to';
import './style/style.scss';
console.log(o1);
console.log(o1.simpleMove({ x: -10, y: -15 }, { x: 120, y: -150 }, 3, 1000));
console.log(
  o1.moveFromToBySpeed({ x: -10, y: -15 }, { x: 1200, y: -1500 }, 100, 1)
);
