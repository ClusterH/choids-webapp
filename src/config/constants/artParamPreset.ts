import { IArtParams } from 'views/ArtGenerator/types'

export const ART_PRESET_LIST: { [key: string]: IArtParams[] } = {
  PRESET1: [
    {
      id: 1,
      statorColor: '#04aa6d',
      rotorColor: '#e7e9eb',
      rotate: 90,
      speed: 1,
      pencilDistance: 30,
      pencilColor: '#ffffff',
      pencilSize: 1,
      statorRadius: 200,
      rotors: [{ r: 100, isInner: true }],
    },
  ],
}
