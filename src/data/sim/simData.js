import data2022 from './2022.data';

const allYears = {
    2022: data2022,
}

export default allYears;
export const newestYear = Object.keys(allYears)[0];
