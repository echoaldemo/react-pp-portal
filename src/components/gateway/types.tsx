export interface Campaign {
  uuid: string
  name: string
}

export interface ContentProps {
  campaigns: Array<Campaign>
  searchText: string
}
