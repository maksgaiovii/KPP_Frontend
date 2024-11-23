import { MeshProps } from '@react-three/fiber';

export interface I3DObject extends Pick<MeshProps, 'position' | 'rotation' | 'scale' | 'visible' | 'id' | 'layers'> {
  name?: string;
  goTo?: [number, number, number][];
}
