/* eslint-disable no-unused-vars */
export enum ColType {
  TODO = 'Todo',
  DOING = 'Doing',
  DONE = 'Done',
}
export enum StatusType {
  IDLE = 'Idle',
  PENDING = 'Pending',
  FULLFILED = 'Fullfiled',
  ERROR = 'Error',
}

export const TColors = {
  PRIMARY: 'primary',
  PRIMARY_LIGHT: 'primary-light',
  RED: 'red',
  RED_LIGHT: 'red-light',
  DARK: 'dark',
  LIGHT: 'light',
  BOX: 'box',
  APP: 'app',
  LIN: 'linear',
};
export type ColorsType = (typeof TColors)[keyof typeof TColors];

export * from './schemaTypes';
export * from './types';
