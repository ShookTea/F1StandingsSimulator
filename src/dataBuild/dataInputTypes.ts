type Driver = string
type PointSchemaId = string

export interface DataInput {
    drivers: DriverMap
    pointSchemas: PointSchemaMap
    races: Race[]
    remainingRaces: RemainingRace[]
}

export interface AbstractRace {
    code: String
    type: PointSchemaId
    label: String
}

export interface RemainingRace extends AbstractRace {}

export interface Race extends AbstractRace {
    fastestLap: Driver
    positions: Driver[]
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
}