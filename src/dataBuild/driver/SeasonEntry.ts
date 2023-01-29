import { DataInput, DriverEntry } from '@/dataBuild/f1/dataInputTypes';

type DriverEntryWithAbbr = {
  driverEntry: DriverEntry
  abbr: string
}

export default class SeasonEntry {
  readonly season: string
  readonly sport: string
  readonly driverAbbr: string
  readonly driverNumber: number
  readonly temporary: boolean

  constructor(seasonData: DataInput, sport: string, season: string, driverEntry: DriverEntryWithAbbr) {
    this.season = season;
    this.sport = sport;
    this.driverAbbr = driverEntry.abbr;
    this.driverNumber = driverEntry.driverEntry.number;
    this.temporary = driverEntry.driverEntry.temporary ?? false;
  }

  static buildSeasonEntry(seasonData: DataInput, sport: string, season: string, driverUuid: string): SeasonEntry
  {
    const driverEntry = SeasonEntry.findDriverEntry(seasonData, driverUuid);
    if (driverEntry === null) {
      throw new Error(`Could not find driver ${driverUuid} in season ${season} of ${sport}`);
    }

    const entry = new SeasonEntry(seasonData, sport, season, driverEntry);

    return entry;
  }

  private static findDriverEntry(seasonData: DataInput, driverUuid: string): DriverEntryWithAbbr|null
  {
    for (const abbr in seasonData.drivers) {
      const driverEntry: DriverEntry = seasonData.drivers[abbr];
      if (driverEntry.uuid === driverUuid) {
        return  { driverEntry, abbr };
      }
    }

    return null;
  }
}

