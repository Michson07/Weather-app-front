function getAllPropertiesToArrays(airPolutionData) {
    return {
        Co: { data: airPolutionData.map(d => d.co), backgroundColor: 'red' },
        No2: { data: airPolutionData.map(d => d.no25), backgroundColor: 'yellow' },
        O3: { data: airPolutionData.map(d => d.o3), backgroundColor: 'orange' },
        So2: { data: airPolutionData.map(d => d.so2), backgroundColor: 'black' },
        Pm25: { data: airPolutionData.map(d => d.pm25), backgroundColor: 'gray' } ,
        Pm10: { data: airPolutionData.map(d => d.pm10), backgroundColor: 'green' },
        Nh3: { data: airPolutionData.map(d => d.nh3), backgroundColor: 'purple' },
    }
}

export function toChartData(airPolutionData) {
    const dataArrays = getAllPropertiesToArrays(airPolutionData);
    const datasetsArray = [];
    Object.keys(dataArrays).forEach(d => {
        datasetsArray.push({
            label: d,
            data: dataArrays[d]["data"],
            fill: false,
            backgroundColor: dataArrays[d]["backgroundColor"],
            borderColor: dataArrays[d]["backgroundColor"],
            pointRadius: 1,
        })
    })

    const chartData = {
        labels: airPolutionData.map(d => new Date(d.date * 1000)),
        datasets: datasetsArray
    }

    if(chartData.labels.length > 1) {
        return chartData;
    } else {
        const oneDayArray = [];
        Object.keys(dataArrays).forEach(d => {
            oneDayArray.push({
                label: d,
                data: dataArrays[d]["data"],
                fill: false,
                backgroundColor: dataArrays[d]["backgroundColor"],
            });
        })
        console.log(oneDayArray);
        return {
            //labels: Object.keys(dataArrays),
            datasets: oneDayArray
        }
    }
}

export function toMainData(airPolutionData) {
    const data = airPolutionData.map(d => d.main);
    const results = [
        { label: "Dobry", data: data.filter(d => d === "Dobry").length, backgroundColor: "green" },
        { label: "Niezły", data: data.filter(d => d === "Niezły").length, backgroundColor: "yellow" },
        { label: "Umiarkowany", data: data.filter(d => d === "Umiarkowany").length, backgroundColor: "orange" },
        { label: "Słaby", data: data.filter(d => d === "Słaby").length, backgroundColor: "red" },
        { label: "Fatalny", data: data.filter(d => d === "Fatalny").length, backgroundColor: "black" },
        { label: "Nieznany", data: data.filter(d => d === "Nieznany").length, backgroundColor: "grey" }
    ];
   
    return {
        labels: results.map(r => r.label),
        datasets: [{
            data: results.map(r => r.data),
            backgroundColor: results.map(r => r.backgroundColor)
        }]
    }
    
}