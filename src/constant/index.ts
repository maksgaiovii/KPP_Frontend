import { getAvaibleQueuePositions } from '../util';

const maxSceneZ = 7;

const positions = [
  [-3, 1.5, -4],
  [3, 1.5, -4],
  [-3, 1.5, -1],
  [3, 1.5, -1],
  [-3, 1.5, 2],
  [3, 1.5, 2],
] as [number, number, number][];

export const cashRegister = {
  positions: positions,
  avaibleQueuePositions: getAvaibleQueuePositions(
    positions.map((position) => [position[0], position[1], position[2] + 1]),
    maxSceneZ,
  ),
};

export const chefs = {
  positions: [
    [-3, 1, -1],
    [4, 1, 2],
    [-3, 1, 2],
    [2, 1, 0],
  ] as [number, number, number][],
  ovenPositions: [
    [-2, 0, -3.5],
    [4, 0, -3.5],
    [0, 0, -3.5],
    [2, 0, -3.5],
  ] as [number, number, number][],
};

// avaibleQueuePositions
// casa - c, 0 - avaible places
//    c
//    00000
//        0
//    c   0
//    00000
//       00
//    c  00
//    00000
//      000
//      000
