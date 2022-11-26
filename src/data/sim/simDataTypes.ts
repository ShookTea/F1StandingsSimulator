export interface RacePositionMap {
    [index: number]: number
}

export interface Standing {
    driver: string
    uuid: string
    temporary: boolean
    points: number
    maxPoints: number
    position: number
    maxPosition: number
    minPosition: number
    racePositions: RacePositionMap
}

export interface Round {
    roundName: string
    standings: Standing[]
}

export type Season = Round[]
