using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test
{
    public class Location
    {
        public string Country { get; set; }
        public string City { get; set; }
        public List<Weather> Weathers = new List<Weather>();
    }
}
