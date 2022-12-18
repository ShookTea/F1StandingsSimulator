import { DataInput, DriverEntry } from '@/dataBuild/f1/dataInputTypes';

export default class Driver {
  readonly driverAbbr: string;
  readonly uuid: string;
  readonly temporary: boolean;
  readonly number: number|null;

  constructor(driverAbbr: string, dataInput: DriverEntry) {
    this.driverAbbr = driverAbbr;
    this.uuid = dataInput.uuid;
    this.temporary = dataInput.temporary ?? false;
    this.number = dataInput.number;
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
