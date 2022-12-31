import importedDriverDetails from '../../../data/racing_drivers.json';
import { DriverDetail } from '@/data/sim/f1/simDataTypes';

type DriverDetailMap = {
  [uuid: string]: DriverDetail
};

export default class DriverName {
  private readonly details: DriverDetail;
  constructor(uuid: string, driverDetails: DriverDetailMap = importedDriverDetails) {
    this.details = driverDetails[uuid];
  }

  getFamilyName(): string
  {
    return this.details.familyName;
  }

  getGivenName(): string
  {
    return this.details.givenName;
  }

  isFamilyNameFirst(): boolean
  {
    return this.details.familyNameFirst ?? false;
  }

  /**
   * In some cultures, family name is displayed before given name. For example:
   * - "Max Verstappen" - here "Max" is a given name and "Verstappen" is a family name
   * - "Zhou Guanyu" - here "Guanyu" is a given name and Zhou" is a family name
   *
   * This method returns name as it should be displayed (with either given name or family name first, depending on
   * driver's language).
   */
  getFullName(): string
  {
    const firstPart: string = this.isFamilyNameFirst() ? this.getFamilyName() : this.getGivenName();
    const secondPart: string = this.isFamilyNameFirst() ? this.getGivenName() : this.getFamilyName();
    return `${firstPart} ${secondPart}`;
  }
}
