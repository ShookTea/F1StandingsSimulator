import { DataInput, TeamEntry } from '@/dataBuild/f1/dataInputTypes';

export default class Team {
  readonly entrantName: string;
  readonly uuid: string;
  readonly chassis: string;
  readonly chassisConstructor: string;
  readonly powerUnit: string;
  readonly powerUnitConstructor: string;
  readonly color: string;

  constructor(entrantName: string, data: TeamEntry) {
    this.entrantName = entrantName;
    this.uuid = data.uuid;
    this.chassis = data.chassis;
    this.chassisConstructor = data.chassisConstructor;
    this.powerUnit = data.powerUnit;
    this.powerUnitConstructor = data.powerUnitConstructor;
    this.color = data.color;
  }

  static buildAllFromInput(dataInput: DataInput): Team[]
  {
    const result: Team[] = [];

    for (const entrantName in dataInput.teams) {
      const entry = dataInput.teams[entrantName];
      result.push(new Team(entrantName, entry));
    }

    return result;
  }
}
