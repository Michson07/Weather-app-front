import axios from 'axios';

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

export async function getCurrentLocation() {
    return new Promise((resolve, reject) => { navigator.geolocation.getCurrentPosition(
        position => { const coords = position.coords; resolve({ x: coords.latitude, y: coords.longitude }) }, 
        () => { return null }, 
        options)
    })
}

export async function getCurrentCity() {
    const z = await getCurrentLocation();
    const resp = await axios.get(`/api/location`, { params: { x: z.x, y: z.y }});
    return resp.data;
}
