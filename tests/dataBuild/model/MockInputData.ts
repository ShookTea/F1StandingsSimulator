import { DataInput } from '@/dataBuild/f1/dataInputTypes';

const mockData: DataInput = {
  teams: {
    TeamName1: {
      uuid: 'f700db3a-631e-4628-a434-975439e6c025',
      color: '#000000',
      chassis: 'CH1',
      chassisConstructor: 'TeamName1',
      powerUnit: 'PU1',
      powerUnitConstructor: 'PowerUnit Factory'
    },
    TeamName2: {
      uuid: 'efa91f67-1b61-43f2-893d-c55b48aa9100',
      color: '#000001',
      chassis: 'CH2',
      chassisConstructor: 'TeamName2',
      powerUnit: 'PU1',
      powerUnitConstructor: 'PowerUnit Factory'
    },
    TeamName3: {
      uuid: '22f318cf-009a-40a8-8e9b-0098e0682ec4',
      color: '#000002',
      chassis: 'CH3',
      chassisConstructor: 'TeamName3',
      powerUnit: 'PU3',
      powerUnitConstructor: 'TeamName3'
    }
  },
  drivers: {
    DR1: {
      uuid: '4e93f2c8-7db8-4c86-8953-a3ae23c10dd4',
      number: 1,
      team: {
        '001': 'TeamName1',
        '004': 'TeamName2',
      }
    },
    DR2: {
      uuid: 'cdc2c670-68bc-47fa-88e8-b8f9a20df119',
      number: 2,
      team: 'TeamName1'
    },
    DR3: {
      uuid: '7df5acef-4f2f-41f8-88b7-9938c2aa96ec',
      number: 3,
      team: {
        '001': 'TeamName2',
        '004': 'TeamName1',
      }
    },
    DR4: {
      uuid: 'b7ab89b9-3d2d-4cdb-9428-278182378c50',
      number: 4,
      team: 'TeamName2'
    },
    DR5: {
      uuid: '244cb142-f700-4450-83af-26225ef620f0',
      number: 5,
      team: 'TeamName3',
    },
    DR6: {
      uuid: '0b63330e-95e8-4cf2-9771-ee7a1f25dc90',
      number: 6,
      team: 'TeamName3',
    }
  },
  races: [
    {
      code: "001",
      type: 'race',
      label: 'Race 001',
      fastestLap: 'DR1',
      positions: [ 'DR1', 'DR2', 'DR3', 'DR5', 'DR4' ],
    }, {
      code: "002",
      type: 'sprint',
      label: 'Race 002 (sprint)',
      fastestLap: 'DR2',
      positions: [ 'DR2', 'DR5', 'DR6', 'DR3', 'DR4', 'DR1' ],
    }, {
      code: "002",
      type: 'race',
      label: 'Race 002',
      fastestLap: 'DR3',
      positions: [ 'DR3', 'DR4', 'DR1', 'DR6' ],
      teamSwitch: {
        'DR6': {
          team: 'TeamName1',
          description: '',
        }
      }
    }, {
      code: "003",
      type: 'race',
      label: 'Race 003',
      fastestLap: 'DR4',
      positions: [ 'DR3', 'DR4', 'DR1', 'DR5', 'DR6', 'DR2' ],
      teamSwitch: {
        'DR1': {
          team: 'TeamName3',
          description: '',
        }
      }
    }, {
      code: "004",
      type: 'halfRace',
      typeBeforeRace: 'race',
      label: 'Race 004, shortened',
      fastestLap: 'DR1',
      positions: [ 'DR6', 'DR4', 'DR5', 'DR1', 'DR2', 'DR3' ],
    }
  ],
  remainingRaces: [
    {
      code: "005",
      type: 'race',
      label: 'Race 005'
    }, {
      code: "006",
      type: 'sprint',
      label: 'Race 006 (sprint)'
    }, {
      code: "006",
      type: 'race',
      label: 'Race 006'
    }, {
      code: "007",
      type: 'race',
      label: 'Race 007'
    }, {
      code: "008",
      type: 'race',
      label: 'Race 008'
    },
  ],
  pointSchemas: {
    race: { points: [ 25, 18, 15, 12, 10, 8, 6, 4, 2, 1 ], fastestLap: { value: 1, maxPosition: 10 }, positionsCount: true },
    sprint: { points: [ 8, 7, 6, 5, 4, 3, 2, 1 ], fastestLap: { value: 0, maxPosition: -1 }, positionsCount: false },
    halfRace: { points: [ 12.5, 9, 7.5, 6, 5, 4, 3, 2, 1, 0.5 ], fastestLap: { value: 0, maxPosition: -1 }, positionsCount: true },
  }
};

export default mockData;
