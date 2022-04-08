export interface IRoadMapItem {
  label?: 'COMPLETED' | 'ONGOING' | 'WE ARE HERE'
  title: string
  detail: string
}

export interface IOurTeamMember {
  name: string
  image: string
  role: string
  twitter?: string
  youtube?: string
  about: Array<{ text: string }>
}
