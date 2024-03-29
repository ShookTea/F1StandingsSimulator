export type Season = Round[]

export interface Round {
    roundName: string
    maxRemainingDriverPoints: number
    maxRemainingTeamPoints: number
    driverStandings: Standing<Driver>[]
    teamStandings: Standing<Team>[]
}

export interface Standing<T extends StandingOwner> {
    owner: T
    points: number
    maxPoints: number
    position: number
    maxPosition: number
    minPosition: number
    racePositions: RacePositionMap
    note: string
}

export interface StandingOwner {
    uuid: string
}

export interface RacePositionMap {
    [index: number]: number
}

export interface Driver extends StandingOwner {
    abbreviation: string
    temporary?: boolean
    team: Team
    number: number
    details: DriverDetail
}

export interface DriverDetail {
    givenName: string
    familyName: string
    familyNameFirst?: boolean
}

export interface Team extends StandingOwner {
    entry: string
    chassis: string
    chassisConstructor: string
    powerUnit: string
    powerUnitConstructor: string
    color: string
}
