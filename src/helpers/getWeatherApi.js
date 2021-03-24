import axios from 'axios';

export async function getWeather(location) {
    const resp = await axios.get(`/api/forecast/${location}`);
    return {
        location: resp.data.City,
        weather: resp.data.Weathers
    }
}
export async function getAirPolution(latitude, longitude, startDate, endDate) {
    const resp = startDate && endDate ? 
        await axios.get(`api/AirPolution?latitude=${latitude}&longitude=${longitude}&startDate=${startDate}&endDate=${endDate}`) :
        await axios.get(`api/AirPolution?latitude=${latitude}&longitude=${longitude}`);

    return resp.data;
}
