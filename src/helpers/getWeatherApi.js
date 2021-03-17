import axios from 'axios';

export async function getWeather(location) {
    const resp = await axios.get(`/api/forecast/${location}`);
    return {
        location: resp.data.City,
        weather: resp.data.Weathers
    }
}