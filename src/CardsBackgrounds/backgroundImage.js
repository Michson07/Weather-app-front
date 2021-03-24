export function getImageForWeather(weatherMain) {
    switch(weatherMain) {
        case "Clouds":
            return "clouds.jpg";
        case "Rain":
        case "Drizzle":
            return "rain.jpg";
        case "Clear":
            return "sunny.jpg";
        case "Snow":
            return "snow.jpg";
        case "Thunderstorm":
            return "thunderstorm.jpg";
        default:
            return "clouds.jpg";
    }
}