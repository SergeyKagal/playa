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
  //Функция моделирует движение из одной заданной точки в другую за определенное время, принимает в качестве параметров координаты начальной и конечной точек, продолжительность интервалов времени и продолжительность времени движения. Функция возвращает массив объектов содержащих текущее время и координаты объекта.
  //from{x:0,y:0},to{x:200,y:340},dt=100(ms),duration=12000(ms)---пример параметров
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
  //Функция моделирует движение из одной заданной точки в другую с заданной постоянной скоростью, принимает в качестве параметров координаты начальной и конечной точек, продолжительность интервалов времени и модуль скорости. Функция возвращает массив объектов содержащих текущее время и координаты объекта.
  //from{x:0,y:0},to{x:200,y:340},dt=100(ms), speed=1 ---пример параметров
  moveFromToBySpeed(from, to, dt, speed) {
    const deltaX = to.x - from.x;
    const deltaY = to.y - from.y;
    let distance = Math.sqrt(deltaY ** 2 + deltaX ** 2);
    let duration = distance / speed;
    return this.simpleMove(from, to, dt, duration);
  }

  // Функция движение из заданной точки с постоянным ускорением, возвращает массив объектов содержащих текущее время, координаты в данный момент времени, текущую скорость.
  //принимаемые параметры - коодинаты стартовой точки, dt - продолжительность промежутка времени(интервал), напрвление движения в градусах, начальная скорость, ускорение, продолжительность движения
  //from{x:3,y;4},dt=100(ms),direction=45(градусы),startSpeed=0,axel=3,duration=12000(ms) - пример параметров
  moveFromDirAxel(from, dt, direction, startSpeed, axel, duration) {
    const result = [];
    let currentTime = 0;
    while (currentTime <= duration) {
      this.speed = startSpeed + currentTime * axel;
      this.posX =
        from.x +
        Math.cos((direction * PI) / 180) *
          currentTime *
          (startSpeed + (axel * currentTime) / 2);

      this.posY =
        from.y +
        Math.sin((direction * PI) / 180) *
          currentTime *
          (startSpeed + (axel * currentTime) / 2);

      result.push({
        currentTime: currentTime,
        currentX: this.posX,
        currentY: this.posY,
        currentSpeed: this.speed,
      });
      currentTime += dt;
    }
    return result;
  }

  // Функция моделирует торможение , принимает в качестве параметров координаты начальной точки, длительность интервала времени, направление в градусах, модуль скорости, ускорение(должно быть отрицательным), возвращает массив объектов содержащих текущее время, координаты в данный момент времени, текущую скорость.
  moveFromDirBraking(from, dt, direction, startSpeed, axel) {
    if (axel >= 0 || startSpeed <= 0 || dt <= 0) {
      console.log('Wrong parameters');
      return [{ currentTime: 0, currentX: from.x, currentY: from.y }];
    }
    let duration = Math.abs(startSpeed / axel);
    return this.moveFromDirAxel(
      from,
      dt,
      direction,
      startSpeed,
      axel,
      duration
    );
  }
  // поворот вокруг собственной оси - принимаемые параметры: угол поворота(градусы), угловая скорость (градусы/сек), длительность интервалов времени (сек), функция возвращает массив объектов содержащих текущее значение времени и значение угла направления в текущий момент
  rotate(angle, anglSpeed, dt) {
    this.direction = 0; // - стартовое значение угла направления объекта
    const sign = angle / Math.abs(angle);
    const result = [];

    let currentTime = 0;
    let time = Math.abs(angle / anglSpeed);
    let steps = Math.floor(time / dt);
    const lastStepDuration = time % dt;
    const tmp = this.direction;
    for (let stepNum = 0; stepNum <= steps; stepNum++) {
      currentTime = dt * stepNum;
      this.direction = currentTime * Math.abs(anglSpeed) * sign + tmp;
      result.push({
        currentTime: currentTime,
        currentAngle: this.direction % 360,
      });
    }
    if (lastStepDuration) {
      currentTime += lastStepDuration;
      this.direction = currentTime * Math.abs(anglSpeed) * sign + tmp;
      result.push({
        currentTime: currentTime,
        currentAngle: this.direction % 360,
      });
    }

    this.direction >= 0
      ? (this.direction %= 360)
      : (this.direction = 360 - Math.abs(this.direction % 360));
    return result;
  }
}
