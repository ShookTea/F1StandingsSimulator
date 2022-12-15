import drivers from '../../../data/racing_drivers.json';

export default class Driver {
  readonly uuid: string
  readonly givenName: string
  readonly familyName: string
  readonly familyNameFirst: boolean

  constructor(uuid: string, givenName: string, familyName: string, familyNameFirst: boolean) {
    this.uuid = uuid;
    this.givenName = givenName;
    this.familyName = familyName;
    this.familyNameFirst = familyNameFirst;
  }

  static loadFromJson(): Driver[] {
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
