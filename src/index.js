import { animB1ByX } from './js/anim';
import { MyCollection } from './js/collection';
import { Obj2d } from './js/from-to';
import './style/style.scss';

// тест функций управления 2д объектом

const o1 = new Obj2d();

console.log(o1.simpleMove({ x: -10, y: -15 }, { x: 120, y: -150 }, 3, 1000));
console.log(
  o1.moveFromToBySpeed({ x: -10, y: -15 }, { x: 120, y: -150 }, 0.1, 10)
);
console.log(o1.moveFromDirAxel({ x: 0, y: 0 }, 10, 45, 10, -1, 50));
console.log(o1.moveFromDirBraking({ x: 10, y: 22 }, 1, 45, 10, -1));
console.log(o1.rotate(100, 25, 1));

//-- тест методов коллекции

const myCol = new MyCollection();

myCol.set('asd', 34);
myCol.set('asd', 78);
myCol.set('name', 'Sergey');

console.log(myCol.has('asd')); // true
console.log(myCol.has('wer')); // false
console.log(myCol.hasIndex(2)); // true
console.log(myCol.get('asd')); // [34,78]
console.log(myCol.size); // 3
myCol.removeByKey('name');
console.log(myCol); // {storage: Array(2)}
console.log(myCol.size); // 2

export const b1 = document.querySelector('.b1');
export const b2 = document.querySelector('.b2');
export const screenWidth = window.innerWidth - b1.clientWidth - 20;
export const screenHeight = window.innerHeight - b1.clientHeight - 20;
export const startTime = Date.now();
animB1ByX();
