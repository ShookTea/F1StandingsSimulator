import data2022 from './2022.data';
import data2021 from './2021.data';

const allYears = {
    2022: data2022,
    2021: data2021,
}

export default allYears;
export const newestYear = Object.keys(allYears).sort().pop();
