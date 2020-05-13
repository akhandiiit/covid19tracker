import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changeableUrl = url;
    if(country){
        changeableUrl = `${url}/countries/${country}`;
    }
    try {
        const { data:{confirmed , recovered, lastUpdate, deaths} } = await axios.get(changeableUrl);
        
        
        return { confirmed, recovered, lastUpdate, deaths };
        
    } catch (error) {
        console.log('error')
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get('https://covid19.mathdro.id/api/daily')
        const modData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            deathsInChina: dailyData.deaths.china,
            date:dailyData.reportDate,
        }));
        return modData;
    } catch (error) {
        
    }

}

export const fetchCountries = async () => {
    try {
        const { data:{ countries } } = await axios.get('https://covid19.mathdro.id/api/countries');
        
        return countries.map((country) =>  country.name)
        
    } catch (error) {
        console.log('Error');
    }
}
