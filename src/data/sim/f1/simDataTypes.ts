export type Season = Round[]
export interface Round {
    roundName: string
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
}

export interface StandingOwner {}

export interface RacePositionMap {
    [index: number]: number
}

export interface Driver extends StandingOwner {
    abbreviation: string
    uuid: string
    temporary: boolean
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
    uuid: string
    chassis: string
    chassisConstructor: string
    powerUnit: string
    powerUnitConstructor: string
    color: string
}