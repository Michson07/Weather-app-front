using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Test.Converters
{
    public class GetData
    {
        Location location = new Location();
        public GetData(string City)
        {
            location.City = char.ToUpper(City[0]) + City.Substring(1).ToLower();
        }

        private void ValuesConverter(Weather weather)
        {
            weather.Temp -= (int)273.15;
            weather.TempMin -= (int)273.15;
            weather.TempMax -= (int)273.15;
            weather.FeelsLike -= (int)273.15;
            weather.WindSpeed *= (int)3.6;
        }

        public async Task<JObject> GetWeatherAsync()
        {
            WebClient webClient = new WebClient();
            try
            {
                JObject json = JObject.Parse(await webClient.DownloadStringTaskAsync($"http://api.openweathermap.org/data/2.5/forecast?q={location.City}&appid=d5465a7862b13f2a0948c460cc4fdb00&lang=pl"));
                //JObject json = JObject.Parse(await webClient.DownloadStringTaskAsync($"http://api.openweathermap.org/data/2.5/forecast?q={location.City}&appid=f85d92db25e0dbaa0977261021930a31&lang=pl"));
                location.Country = (string)json["city"]["country"];
                foreach(JToken timeRange in json["list"])
                {
                    Weather weather = new Weather();
                    weather.Main = (string)timeRange["weather"][0]["main"];
                    weather.Description = (string)timeRange["weather"][0]["description"];
                    weather.Temp = (int)timeRange["main"]["temp"];
                    weather.TempMin = (int)timeRange["main"]["temp_min"];
                    weather.TempMax = (int)timeRange["main"]["temp_max"];
                    weather.FeelsLike = (int)timeRange["main"]["feels_like"];
                    weather.Pressure = (int)timeRange["main"]["pressure"];
                    weather.WindSpeed = (int)timeRange["wind"]["speed"];
                    weather.RainMm = timeRange["rain"] != null ? (int)timeRange["rain"]["3h"] : 0;
                    weather.Date = (DateTime)timeRange["dt_txt"];
                    ValuesConverter(weather);
                    location.Weathers.Add(weather);
                    weather = null;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
            JObject o = (JObject)JToken.FromObject(location);
            return o;
        }
    }
}
