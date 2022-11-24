interface RacePositionMap {
    [index: number]: number
}

interface Standing {
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

interface Round {
    roundName: string
    standings: Standing[]
}

type Season = Round[]
