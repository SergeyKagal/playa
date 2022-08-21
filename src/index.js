import { o1 } from './js/from-to';
import './style/style.scss';

console.log(o1.simpleMove({ x: -10, y: -15 }, { x: 120, y: -150 }, 3, 1000));
console.log(
  o1.moveFromToBySpeed({ x: -10, y: -15 }, { x: 120, y: -150 }, 0.1, 10)
);
console.log(o1.moveFromDir({ x: 0, y: 0 }, 1, 45, 0, 10, 10));
