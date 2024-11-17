import { Vector3 } from '@react-three/fiber';
import { getAvaibleQueuePositions } from '../util';

const maxSceneZ = 7;

const positions = [
  [-3, 1.5, -2],
  [3, 1.5, -2],
  [-3, 1.5, 1],
  [3, 1.5, 1],
  [-3, 1.5, 4],
  [3, 1.5, 4],
];

export const cashRegister = {
  positions: positions as Vector3[],
  avaibleQueuePositions: getAvaibleQueuePositions(
    positions.map((position) => [position[0], position[1], position[2] + 1]),

    maxSceneZ,
  ) as Vector3[][],
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
