using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test
{
    public class Weather
    {
        public string Main { get; set; }
        public string Description { get; set; }
        public int Temp { get; set; }
        public int TempMin { get; set; }
        public int TempMax { get; set; }
        public int FeelsLike { get; set; }
        public int Pressure { get; set; }
        public int WindSpeed { get; set; }
        public int RainMm { get; set; }
        public DateTime Date { get; set; }
    }
}
