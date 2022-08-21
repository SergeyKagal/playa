import { o1 } from './js/from-to';
import './style/style.scss';

console.log(o1.simpleMove({ x: -10, y: -15 }, { x: 120, y: -150 }, 3, 1000));
console.log(
  o1.moveFromToBySpeed({ x: -10, y: -15 }, { x: 120, y: -150 }, 0.1, 10)
);
console.log(o1.moveFromDirAxel({ x: 0, y: 0 }, 10, 45, 10, -1, 50));
console.log(o1.moveFromDirBraking({ x: 10, y: 22 }, 1, 45, 10, -1));
