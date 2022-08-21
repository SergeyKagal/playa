import { PI } from './from-to';

export const getDirection = (deltaX, deltaY) => {
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
    return Math.atan(deltaY / deltaX) + PI;
  }
  if (deltaX > 0 && deltaY < 0) {
    return PI * 2 - Math.atan(Math.abs(deltaY / deltaX));
  }
  return 0;
};
