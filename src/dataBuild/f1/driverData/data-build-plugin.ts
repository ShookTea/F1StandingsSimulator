// @ts-ignore
import fs from 'node:fs';
import drivers from '../../../data/racing_drivers.json';

const fileRegex: RegExp = /sim\/formulaDrivers\/driver\.data$/;

type SimDataDirectory = { sport: string, path: string };
type SimDataSource = { sport: string, season: string, path: string };

const simDataDirectories: SimDataDirectory[] = [
    { sport: 'Formula 1', path:'src/data/sim/f1' },
];

const simDataRegex: RegExp = /^([0-9]{4})\.data$/

export default {
    name: 'data-build',
    transform(src: string, id: string): string {
        if (!fileRegex.test(id)) {
            return;
        }
        // const data: DataInput = JSON.parse(src);
        // const converted: Season = convert(data)

        // fs.readFileSync('../../../data/sim/f1/2019.data');
        const files: SimDataSource[] = simDataDirectories
          .flatMap(dir => listSourceFilesFromDirectory(dir))
        ;
        return 'export default ' + JSON.stringify({foo: 'bar'});
    }
};

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
