import { IArtParams } from 'views/ArtGenerator/types'

export const ART_PRESET_LIST: { [key: string]: IArtParams } = {
  PRESET1: {
    size: 73,
    pencilSize: 1,
    canvasColor: '#000000',
    backgroundColor: '#dd0eb0',
    radii: [
      { id: 1, r: 31 },
      { id: 2, r: 110 },
      { id: 3, r: 18 },
      { id: 4, r: 41 },
      { id: 5, r: 166 },
      { id: 6, r: 2 },
    ],
  },
  PRESET2: {
    size: 186,
    pencilSize: 1,
    canvasColor: '#3d8ce1',
    backgroundColor: '#f5f5f5',
    radii: [
      { id: 1, r: 35 },
      { id: 2, r: 89 },
      { id: 3, r: 23 },
    ],
  },
}
