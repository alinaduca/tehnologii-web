// Data
var data = {
	labels: ["Bradley Cooper", "Al Pacino", "Brad Pitt"],
	datasets: [{
		label: "Nominations",
		data: [3, 5, 2],
		backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
        borderColor: "#000000s",
        borderWidth: 1,
        fontColor: "#000000"
	}]
};

// Configuration
var config = {
	type: 'bar',
	data: data,
	options: {
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero: true
				}
			}]
		}
	}
};

// Create chart
var myChart = new Chart(
	document.getElementById('myChart'),
	config
);




// Data
var data2 = {
    labels: ["2020", "2021", "2022"],
    datasets: [{
        label: "Bradley Cooper",
        data: [7000, 9000, 12000],
        fill: false,
        borderColor: "#3e95cd",
        borderWidth: 2,
        pointBackgroundColor: "#3e95cd",
        pointRadius: 5
    }, {
        label: "Brad Pitt",
        data: [6000, 7000, 15000],
        fill: false,
        borderColor: "#8e5ea2",
        borderWidth: 2,
        pointBackgroundColor: "#8e5ea2",
        pointRadius: 5
    }, {
        label: "Al Pacino",
        data: [8000, 6000, 12500],
        fill: false,
        borderColor: "#3cba9f",
        borderWidth: 2,
        pointBackgroundColor: "#3cba9f",
        pointRadius: 5
    }]
};

// Configuration
var config2 = {
    type: 'line',
    data: data2,
    options: {
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
};

// Create chart
var myChart2 = new Chart(
    document.getElementById('myChart2'),
    config2
);