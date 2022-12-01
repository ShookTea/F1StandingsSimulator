type Driver = string
type Team = string
type PointSchemaId = string

export interface DataInput {
    teams: TeamMap
    drivers: DriverMap
    pointSchemas: PointSchemaMap
    races: Race[]
    remainingRaces: RemainingRace[]
}

export interface AbstractRace {
    code: String
    type: PointSchemaId
    typeBeforeRace?: PointSchemaId
    label: String
}

export interface RemainingRace extends AbstractRace {}

export interface Race extends AbstractRace {
    fastestLap: Driver
    positions: Driver[]
    teamSwitch?: TeamSwitchMap
    teamPointChanges?: TeamPointChangeMap
}

export interface TeamPointChangeMap {
    [index: Team]: TeamPointChange
}

export interface TeamPointChange {
    points: number
    description: string
}

export interface TeamSwitchMap {
    [index: Driver]: TeamSwitch
}

export interface TeamSwitch {
    team: Team
    description: string
}

export interface PointSchemaMap {
    [index: PointSchemaId]: PointSchema
}

export interface PointSchema {
    points: number[]
    fastestLap: FastestLapPointDetails
    positionsCount: boolean
}

export interface FastestLapPointDetails {
    value: number
    maxPosition: number
}

export interface DriverMap {
    [index: Driver]: DriverEntry
}

export interface DriverEntry {
    uuid: string
    temporary?: boolean
    team: Team
    number: number
}

export interface TeamMap {
    [index: Team]: TeamEntry
}

export interface TeamEntry {
    uuid: string
    chassis: string
    chassisConstructor: string
    powerUnit: string
    powerUnitConstructor: string
    color: string
}
