type Driver = string
type PointSchemaId = string

interface DataInput {
    drivers: DriverMap
    pointSchemas: PointSchemaMap
    races: Race[]
    remainingRaces: RemainingRace[]
}

interface AbstractRace {
    code: String
    type: PointSchemaId
    label: String
}

interface RemainingRace extends AbstractRace {}

interface Race extends AbstractRace {
    fastestLap: Driver
    positions: Driver[]
}

interface PointSchemaMap {
    [index: PointSchemaId]: PointSchema
}

interface PointSchema {
    points: number[]
    fastestLap: FastestLapPointDetails
    positionsCount: boolean
}

interface FastestLapPointDetails {
    value: number
    maxPosition: number
}

interface DriverMap {
    [index: Driver]: DriverEntry
}

interface DriverEntry {
    uuid: string
}