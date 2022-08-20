const PI = Math.PI;

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
}

export const o1 = new Obj2d();

function getDirection(deltaX, deltaY) {
  if (deltaX > 0 && deltaY === 0) {
    return 0;
  }
  if (deltaX < 0 && deltaY === 0) {
    return PI;
  }
  if (deltaX === 0 && deltaY > 0) {
    return PI / 2;
  }
  if (deltaX === 0 && deltaY < 0) {
    return (PI * 3) / 2;
  }
  if (deltaX > 0 && deltaY > 0) {
    return Math.atan(deltaY / deltaX);
  }
  if (deltaX < 0 && deltaY > 0) {
    return Math.atan(Math.abs(deltaY / deltaX)) + PI / 2;
  }
  if (deltaX < 0 && deltaY < 0) {
    console.log('***');
    return Math.atan(deltaY / deltaX) + PI;
  }
  if (deltaX > 0 && deltaY < 0) {
    return PI * 2 - Math.atan(Math.abs(deltaY / deltaX));
  }
  return 0;
}
