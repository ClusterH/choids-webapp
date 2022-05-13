import { IArtParams } from 'views/ArtGenerator/types'

export const ART_PRESET_LIST: { [key: string]: IArtParams } = {
  PRESET1: {
    size: 60,
    pencilSize: 1,
    canvasColor: '#cdffd7',
    backgroundColor: '#000000',
    radii: [
      { id: 1, r: 115 },
      { id: 2, r: 191 },
      { id: 3, r: 110 },
    ],
  },
  PRESET2: {
    size: 80,
    pencilSize: 2,
    canvasColor: '#01e930',
    backgroundColor: '#be4613',
    radii: [
      { id: 1, r: 50 },
      { id: 2, r: 120 },
    ],
  },
}
