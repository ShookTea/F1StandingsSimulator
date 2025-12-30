export type Season = {
    rounds: Round[];
    driversPerRace: number;
}

export interface Round {
    roundName: string
    maxRemainingDriverPoints: number
    maxRemainingTeamPoints: number
    driverStandings: Standing<Driver>[]
    teamStandings: Standing<Team>[]
    driverHeadToHeads: HeadToHead[]
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

export interface HeadToHead {
    leadPosition: number;
    drivers: string[]; // abbreviations
    optionsByDriver: {
        [driverAbbr: string]: HeadToHeadOptionForDriver[]
    }
}

export interface HeadToHeadOptionForDriver {
    position: number; // 1-indexed position in a race
    championship: number; // 1-indexed guaranteed position in a championship, given position of driver and rivals
    rivals: {
        [driverAbbr: string]: number; // 1-indexed position of each rival
    }
}