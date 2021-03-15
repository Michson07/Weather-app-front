using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Test.Converters;

namespace Test.Controllers
{
    [Route("api/[controller]/{City}")]
    [ApiController]
    public class ForecastController : ControllerBase
    {
        public async Task<string> GetAsync(string City)
        {
            GetData getData = new GetData(City);
            JObject json = await getData.GetWeatherAsync();
            return json != null ? json.ToString() : "Nie znaleziono miasta";
        }
    }
}