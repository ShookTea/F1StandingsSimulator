import { DataInput, DriverEntry } from '@/dataBuild/f1/dataInputTypes';
import AbstractDriverTeamStrategy from './teamStrategy/AbstractDriverTeamStrategy';
import TeamStrategyBuilder from './teamStrategy/TeamStrategyBuilder';

export default class Driver {
  readonly driverAbbr: string;
  readonly uuid: string;
  readonly temporary: boolean;
  readonly number: number|null;
  readonly team: AbstractDriverTeamStrategy;

  constructor(driverAbbr: string, dataInput: DriverEntry) {
    this.driverAbbr = driverAbbr;
    this.uuid = dataInput.uuid;
    this.temporary = dataInput.temporary ?? false;
    this.number = dataInput.number;
    this.team = TeamStrategyBuilder.buildStrategy(this, dataInput);
  }

  static buildAllFromInput(dataInput: DataInput): Driver[]
  {
    const result: Driver[] = [];

    for (const driverAbbr in dataInput.drivers) {
      result.push(new Driver(driverAbbr, dataInput.drivers[driverAbbr]));
    }

    return result;
  }
}
