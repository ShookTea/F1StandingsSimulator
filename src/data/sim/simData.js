import data2021 from './2021.data';
import data2022 from './2022.data';
import data2023 from './2023.data';

const allYears = {
    2021: data2021,
    2022: data2022,
    2023: data2023,
}

export default allYears;
export const newestYear = Object.keys(allYears).sort().pop();
