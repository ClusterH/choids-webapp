import { IArtParams } from 'views/ArtGenerator/types'

export const ART_PRESET_LIST: { [key: string]: IArtParams } = {
  PRESET1: {
    size: 73,
    pencilSize: 1,
    zoom: 1,
    canvasColor: '#000000',
    backgroundColor: '#dd0eb0',
    radii: [
      { id: 1, r: 15 },
      { id: 2, r: 55 },
      { id: 3, r: 9 },
      { id: 4, r: 20 },
    ],
  },
  PRESET2: {
    size: 93,
    pencilSize: 1,
    zoom: 1,
    canvasColor: '#3d8ce1',
    backgroundColor: '#f5f5f5',
    radii: [
      { id: 1, r: 18 },
      { id: 2, r: 45 },
      { id: 3, r: 12 },
    ],
  },
}
