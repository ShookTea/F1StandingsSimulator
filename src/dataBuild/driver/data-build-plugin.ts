// @ts-ignore
import fs from 'node:fs';
import Driver from './Driver';
import { Driver as DataResult } from '@/data/sim/formulaDrivers/driverDataTypes';
import { DataInput } from '@/dataBuild/f1/dataInputTypes';

type SimDataDirectory = { sport: string, path: string };
type SimDataSource = { sport: string, season: string, path: string };

// keep order of "most prestigious first", i.e. F1 before F2
const simDataDirectories: SimDataDirectory[] = [
    { sport: 'Formula 1', path:'input/f1' },
];

const simDataRegex: RegExp = /^([0-9]{4})\.json$/

export function build(): DataResult[]
{
  const drivers = Driver.loadFromJson();

  simDataDirectories
    .flatMap(dir => listSourceFilesFromDirectory(dir))
    .forEach(elem => {
      const season: DataInput = JSON.parse(fs.readFileSync(elem.path, 'utf-8'));
      drivers.forEach(driver => driver.registerSeason(season, elem.sport, elem.season));
    });

  return drivers.map(driver => driver.toDataResult());
}

function listSourceFilesFromDirectory(directory: SimDataDirectory): SimDataSource[]
{
    return fs.readdirSync(directory.path)
      .filter(file => simDataRegex.test(file))
      .map(file => simDataRegex.exec(file))
      .map(regexResult => ({
          sport: directory.sport,
          season: regexResult[1],
          path: `${directory.path}/${regexResult[0]}`
      }));
}
