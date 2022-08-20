import { getDirection } from './getDirection';

export const PI = Math.PI;

export class Obj2d {
  constructor(
    posX = 0,
    posY = 0,
    direction = 0,
    speed = 0,
    axel = 0,
    anglSpeed = 0
  ) {
    this.posX = posX;
    this.posY = posY;
    this.direction = direction;
    this.speed = speed;
    this.axel = axel;
    this.anglSpeed = anglSpeed;
    this.dx = 0;
    this.dy = 0;
  }

  //from{x:0,y:0},to{x:200,y:340},dt=100(ms),duration=12000(ms)
  simpleMove(from, to, dt, duration) {
    const result = [];
    let time = 0;
    this.posX = from.x;
    this.posY = from.y;
    result.push({ time: time, currentX: this.posX, currentY: this.posY });
    const deltaX = to.x - from.x;
    const deltaY = to.y - from.y;
    this.direction = getDirection(deltaX, deltaY);
    const distance = Math.sqrt(deltaY ** 2 + deltaX ** 2);
    this.speed = distance / duration;
    this.dx = Math.cos(this.direction) * this.speed * dt;
    this.dy = Math.sin(this.direction) * this.speed * dt;

    for (let time = dt; time <= duration; time += dt) {
      this.posX += this.dx;
      this.posY += this.dy;
      result.push({
        time: time,
        currentX: Math.round(this.posX),
        currentY: Math.round(this.posY),
      });
    }

    return result;
  }

  moveFromToBySpeed(from, to, dt, speed) {
    const result = [];
    let time = 0;
    this.posX = from.x;
    this.posY = from.y;
    result.push({ time: time, currentX: this.posX, currentY: this.posY });
    const deltaX = to.x - from.x;
    const deltaY = to.y - from.y;
    this.direction = getDirection(deltaX, deltaY);
    let distance = Math.sqrt(deltaY ** 2 + deltaX ** 2);
    let ds = dt * speed;
    console.log(ds, distance);
    this.dx = Math.cos(this.direction) * speed * dt;
    this.dy = Math.sin(this.direction) * speed * dt;
    while (distance > 0) {
      distance -= ds;
      this.posX += this.dx;
      this.posY += this.dy;
      result.push({
        time: (time += dt),
        currentX: this.posX,
        currentY: this.posY,
      });
    }
    return result;
  }
}

export const o1 = new Obj2d();
