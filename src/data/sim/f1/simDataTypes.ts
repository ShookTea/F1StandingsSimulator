export interface RacePositionMap {
    [index: number]: number
}

export interface Standing {
    driver: Driver
    abbreviation: string
    uuid: string
    temporary: boolean
    points: number
    maxPoints: number
    position: number
    maxPosition: number
    minPosition: number
    racePositions: RacePositionMap
}

export interface Driver {
    abbreviation: string
    uuid: string
    temporary: boolean
    team: string
    number: number
}

export interface Round {
    roundName: string
    standings: Standing[]
}

export type Season = Round[]
