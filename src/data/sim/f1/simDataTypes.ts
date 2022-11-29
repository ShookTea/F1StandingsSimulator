export type Season = Round[]
export interface Round {
    roundName: string
    standings: Standing[]
}

export interface Standing {
    driver: Driver
    points: number
    maxPoints: number
    position: number
    maxPosition: number
    minPosition: number
    racePositions: RacePositionMap
}

export interface RacePositionMap {
    [index: number]: number
}

export interface Driver {
    abbreviation: string
    uuid: string
    temporary: boolean
    team: string
    number: number
    details: DriverDetail
}

export interface DriverDetail {
    givenName: string
    familyName: string
    familyNameFirst?: boolean
}
