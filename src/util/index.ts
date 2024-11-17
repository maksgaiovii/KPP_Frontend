export const getAvaibleQueuePositions = (positions: [number, number, number][], maxSceneZ: number) =>
  positions.map((position, index, { length }) => {
    const arr = getPathToRightOrLeft([0, 0, 0], index, length + 1, Math.sign(position[0]));
    const last = [...(arr[arr.length - 1] || [0, 0, 0])];
    return [
      ...arr,
      ...Array.from({ length: maxSceneZ - position[2] }, (_, i) => [last[0], last[1], last[2] + i + 1]),
    ].map((pos) => [pos[0] + position[0], pos[1] + position[1], pos[2] + position[2]]);
  });

const getPathToRightOrLeft = (
  srart: number[],
  current: number,
  length: number,
  sign: number = 1,
): [number, number, number][] =>
  Array.from({ length: Math.floor((length - current) / 2) }, (_, i) => [srart[0] - i * sign, srart[1], srart[2]]);

export const getDistance = (a: [number, number, number], b: [number, number, number]) =>
  Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
