import { Season } from '@/data/sim/simDataTypes';

// @ts-ignore
import data2021 from './2021.data';
// @ts-ignore
import data2022 from './2022.data';
// @ts-ignore
import data2023 from './2023.data';

interface SimulationData {
    2021: Season
    2022: Season
    2023: Season
}

const allYears: SimulationData = {
    2021: data2021,
    2022: data2022,
    2023: data2023,
}

export const availableYears = Object.keys(allYears).sort();

export default allYears;
export const newestYear = availableYears[availableYears.length - 1];
