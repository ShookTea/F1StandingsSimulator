import { convert as f1SeasonConverter } from './f1/seasonData/data-build-plugin';
import { build as driversBuilder } from './driver/data-build-plugin';
import fs from 'fs';
import { Driver as DataResult } from '@/data/sim/formulaDrivers/driverDataTypes';

const F1_INPUT_PATH: string = 'input/f1/%season%.json';
const F1_OUTPUT_PATH: string = 'src/data/sim/f1/%season%.json';
const F1_SEASONS: number[] = [ 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025 ];

for (const year of F1_SEASONS) rebuildF1File(year);
rebuildDriversFile();

function rebuildF1File(season: number): void
{
  console.log(`Building for F1 season ${season}`);
  const input = F1_INPUT_PATH.replace('%season%', season.toString());
  const output = F1_OUTPUT_PATH.replace('%season%', season.toString());

  const value = JSON.parse(fs.readFileSync(input, 'utf8'));
  const converted = f1SeasonConverter(value);
  fs.writeFileSync(output, JSON.stringify(converted, null, 4));
}

function rebuildDriversFile(): void
{
  console.log('Building drivers file');
  const output = 'src/data/sim/formulaDrivers/DriverData.ts';
  const data: DataResult[] = driversBuilder();
  const result = "// THIS FILE IS AUTOGENERATED. DO NOT EDIT.\n" +
    "import { Driver as DataResult } from '@/data/sim/formulaDrivers/driverDataTypes';\n" +
    "const result: DataResult[] = " + JSON.stringify(data, null, 4) + ";\n" +
    "export default result;\n";

  fs.writeFileSync(output, result);
}
