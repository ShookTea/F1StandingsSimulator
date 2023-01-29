import { convert as f1SeasonConverter } from './f1/seasonData/data-build-plugin';
import fs from 'fs';

const F1_INPUT_PATH: string = 'input/f1/%season%.json';
const F1_OUTPUT_PATH: string = 'src/data/sim/f1/%season%.json';
const F1_SEASONS: number[] = [ 2018, 2019, 2020, 2021, 2022, 2023 ];

for (const year of F1_SEASONS) rebuildF1File(year);

function rebuildF1File(season: number): void
{
  console.log(`Building for F1 season ${season}`);
  const input = F1_INPUT_PATH.replace('%season%', season.toString());
  const output = F1_OUTPUT_PATH.replace('%season%', season.toString());

  const value = JSON.parse(fs.readFileSync(input, 'utf8'));
  const converted = f1SeasonConverter(value);
  fs.writeFileSync(output, JSON.stringify(converted, null, 4));
}
