export const possibleCountries = [
    "Polska",
    "Niemcy",
    "Wielka Brytania",
    "Hiszpania",
    "Włochy",
    "USA",
    "Egipt",
    "Skandynawskie państwa"
];

const polandCities = ["Warszawa", "Kraków", "Wrocław", "Gdańsk", "Szczecin", "Zakopane", "Białystok", "Poznań", "Kielce", "Olsztyn", "Rzeszów"];
const germanCities = ["Berlin", "Frankurt", "Hamburg", "Dortmund", "Monachium", "Hanower", "Lipsk", "Dusseldorf"];
const gbCities = ["Londyn", "Manchester", "Bristol", "Newcastle", "Liverpool", "Leeds", "Edynburg", "Leicester"];
const spainCities = ["Madryt", "Barcelona", "Sewilla", "Walencja", "Bilbao", "Malaga", "San Sebastian"];
const italyCities = ["Rzym", "Mediolan", "Florencja", "Wenecja", "Neapol", "Bolonia", "Palermo", "Werona"]
const usaCities = ["Nowy Jork", "Los Angeles", "San Francisco", "Waszyngton", "Chicago", "Las Vegas", "Miami", "San Diego"]
const egyptCities = ["Kair", "Giza", "Memfis", "Luksor", "Hurghada"];
const scandinaviaCities = ["Oslo", "Trondheim", "Bergen", "Kopenhaga", "Sztokholm", "Lillehammer"];
const basicCities = [polandCities[0], germanCities[0], gbCities[0], spainCities[0], italyCities[0], usaCities[0], egyptCities[0], scandinaviaCities[0]];

export function suggestedForCountry(country) {
    switch(country) {
        case "Polska":
            return polandCities;
        case "Niemcy":
            return germanCities;
        case "Wielka Brytania":
            return gbCities;
        case "Hiszpania":
            return spainCities;
        case "Włochy":
            return italyCities;
        case "USA":
            return usaCities;
        case "Egipt":
            return egyptCities;
        case "Skandynawskie państwa":
            return scandinaviaCities;
        default:
            return basicCities;
    }
}