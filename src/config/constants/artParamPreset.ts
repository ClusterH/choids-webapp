import { IArtParams } from 'views/ArtGenerator/types'

export const ART_PRESET_LIST: { [key: string]: IArtParams } = {
  Shrek: {
    size: 3,
    pencilSize: 1,
    zoom: 50,
    degrees: 0,
    canvasColor: '#54ff3c6a',
    backgroundColor: '#000000',
    radii: [
      { id: 1, r: 18 },
      { id: 2, r: 45 },
      { id: 3, r: 16 },
    ],
  },
  EngineeringGoneBad: {
    size: 15,
    pencilSize: 1,
    zoom: 20,
    degrees: 0,
    canvasColor: '#e91e1e45',
    backgroundColor: '#ffe4f9',
    radii: [
      { id: 1, r: 33 },
      { id: 2, r: 77 },
      { id: 3, r: 60 },
    ],
  },
  PinkFlower: {
    size: 93,
    pencilSize: 1,
    zoom: 2,
    degrees: 0,
    canvasColor: '#3e0f0f97',
    backgroundColor: '#e142e6ff',
    radii: [
      { id: 1, r: 47 },
      { id: 2, r: 58 },
      { id: 3, r: 39 },
    ],
  },
  LostInSpace: {
    size: 73,
    pencilSize: 1,
    zoom: 1.7,
    degrees: 0,
    canvasColor: '#98ffa56d',
    backgroundColor: '#000000',
    radii: [
      { id: 1, r: 50 },
      { id: 2, r: 30 },
      { id: 3, r: 45 },
      { id: 4, r: 44 },
    ],
  },
  LOveLY: {
    size: 8,
    pencilSize: 1,
    zoom: 2.8,
    degrees: 0,
    canvasColor: '#14141468',
    backgroundColor: '#7284f5ff',
    radii: [
      { id: 1, r: 100 },
      { id: 2, r: 100 },
      { id: 3, r: 74 },
      { id: 4, r: 2 },
    ],
  },
}
