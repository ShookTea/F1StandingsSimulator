import drivers from '../../../data/racing_drivers.json';
import { Driver as DataResult, DriverDetails } from '@/data/sim/formulaDrivers/driverDataTypes';
import { DataInput } from '@/dataBuild/f1/dataInputTypes';
import SeasonEntry from './SeasonEntry';

export default class Driver {
  private readonly driverDetails: DriverDetails

  constructor(uuid: string, givenName: string, familyName: string, familyNameFirst: boolean) {
    const fullName = `${familyNameFirst ? familyName : givenName} ${familyNameFirst ? givenName : familyName}`;
    const routePart = `${fullName}-${uuid.split('-')[0]}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s/, '-');

    this.driverDetails = {
      uuid, givenName, familyName, familyNameFirst, fullName, routePart,
    };
  }

  toDataResult(): DataResult
  {
    return {
      driverDetails: this.driverDetails,
    };
  }

  registerSeason(seasonData: DataInput, sport: string, season: string): void
  {
    if (!seasonData.drivers.hasOwnProperty(this.driverDetails.uuid)) return;
    SeasonEntry.buildSeasonEntry(seasonData, sport, season, this.driverDetails.uuid);
  }

  static loadFromJson(): Driver[]
  {
    const result: Driver[] = [];

    for (const driverUuid in drivers) {
      const driverData = drivers[driverUuid];
      result.push(new Driver(
        driverUuid,
        driverData.givenName,
        driverData.familyName,
        driverData.familyNameFirst ?? false,
      ));
    }

    return result;
  }
}
