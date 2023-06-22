function saveGraphicToServer(title) {
	console.log('aici');
	fetch(`/save-graphic/${title}`, {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({ title }),
	})
	  .then(response => {
		if (response.ok) {
		  console.log('Graphic data saved to server successfully.');
		} else {
		  console.error('Error saving graphic data to server:', response.statusText);
		}
	  })
	  .catch(error => {
		console.error('Error saving graphic data to server:', error);
	  });
  }

function filterResults(year) {
	fetch(`/bargraphql/${year}`)
	.then(response => response.json())
	.then(data => {
		const actors = [];
		const nominations = [];
		for(actor of data) {
			actors.push(actor.name);
			nominations.push(actor.number_of_nominations);
		}
		var data = [
		{
			x: actors,
			y: nominations,
			type: 'bar'
		}];
		var layout = {
			xaxis: {
				tickangle: -45,
				automargin: true
			},
			yaxis: {
				automargin: true
			},
			margin: {
				t: 150,
				b: 20 
			},

		// plot_bgcolor: "rgba(0, 0, 0, 0)",
		// paper_bgcolor: "rgba(0, 0, 0, 0)",
			title: `Number of nominations at SAG Awards (${year})`
		};
		
		Plotly.newPlot('chart', data, layout);
	});
}

function filterResults1(year) {
	fetch(`/piegraphql/${year}`)
	.then(response => response.json())
	.then(data => {
		const actors = [];
		const nominations = [];
		let i = 0;
		for(actor of data) {
			if(i < 20) {
				actors.push(actor.name);
				nominations.push(actor.number_of_nominations);
			}
			i++;
		}
		var data = [
			{
				labels: actors,
				values: nominations,
				type: 'pie'
			}
		];
		
		var layout = {
			title: `Winners of SAG Awards (${year})`
		};
			
		Plotly.newPlot('pie', data, layout);
	});
}

function filterResults3(year) {
	fetch(`/linegraphql/${year}`)
	.then(response => response.json())
	.then(data => {
		const shows = [];
		const actors = [];
		for(show of data) {
			shows.push(show.show);
			actors.push(show.number_of_actors);
		}
		var data = [
			{
			  x: shows,
			  y: actors,
			  mode: 'lines+markers',
			  type: 'scatter',
			  line: {
				color: 'blue',
				width: 2,
			  },
			  marker: {
				symbol: 'circle',
				size: 6,
				color: 'blue',
			  },
			},
		  ];
		var layout = {
			xaxis: {
				title: 'Shows',
				tickangle: -45,
				automargin: true,
			  },
			  yaxis: {
				title: 'Number of actors',
			  },
			margin: {
				t: 150,
				b: 200 
			},

		// plot_bgcolor: "rgba(0, 0, 0, 0)",
		// paper_bgcolor: "rgba(0, 0, 0, 0)",
			title: `Number of actors per show nominated for SAG Awards (${year})`
		};
		
		Plotly.newPlot('chart3', data, layout);
	});
}

const yearElements = document.querySelectorAll('.year');

yearElements.forEach(yearElement => {
  yearElement.addEventListener('click', () => {
    yearElements.forEach(element => {
      element.classList.remove('active-year');
    });
    yearElement.classList.add('active-year');
    const selectedYear = yearElement.id;
    filterResults(selectedYear);
	filterResults1(selectedYear);
	filterResults3(selectedYear);
  });
});

let defaultYear = document.querySelector('.active-year');
filterResults(defaultYear.id);
filterResults1(defaultYear.id);
filterResults3(defaultYear.id);

// Function to export the chart data as CSV format
function exportAsCSV(year) {
	fetch(`/bargraphql/${year}`)
	.then(response => response.json())
	.then(data => {
		saveGraphicToServer(`Number of nominations at SAG Awards (${year})`);
		const actors = [];
		const nominations = [];
		for(actor of data) {
			actors.push(actor.name);
			nominations.push(actor.number_of_nominations);
		}
		const csvContent = "data:text/csv;charset=utf-8," + [
			['Actor', 'Number of Nominations'],
			...actors.map((actor, index) => [actor, nominations[index]])
			.map(row => row.map(field => `"${field}"`).join(',')) // Escape fields with double quotes
		].join('\n');
		
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "chart_data.csv");
		document.body.appendChild(link); // Required for Firefox
		link.click();
	});
}

// Function to export the chart as WebP format
function exportAsWebP() {
	Plotly.toImage('chart', { format: 'webp', width: 800, height: 600 })
        .then(function (url) {
			const link = document.createElement('a');
            link.href = url;
            link.download = 'chart.webp';
            document.body.appendChild(link); // Required for Firefox
            link.click();
            link.parentNode.removeChild(link);
        });
	}
	
	// Function to export the chart as SVG format
	function exportAsSVG() {
		Plotly.downloadImage('chart', { format: 'svg', width: 800, height: 600, filename: 'chart' });
	}
	
	// Add event listeners to export items
	document.getElementById('export-csv').addEventListener('click', () => {
	exportAsCSV(defaultYear.id);
});
document.getElementById('export-webp').addEventListener('click', exportAsWebP);
document.getElementById('export-svg').addEventListener('click', exportAsSVG);

	
// Function to export the chart data as CSV format
function exportAsCSV1(year) {
	fetch(`/piegraphql/${year}`)
	.then(response => response.json())
	.then(data => {
		const actors = [];
		const nominations = [];
		for(actor of data) {
			actors.push(actor.name);
			nominations.push(actor.number_of_nominations);
		}
		const csvContent = "data:text/csv;charset=utf-8," + [
			['Actor', 'Number of Nominations'],
			...actors.map((actor, index) => [actor, nominations[index]])
			.map(row => row.map(field => `"${field}"`).join(',')) // Escape fields with double quotes
		].join('\n');
		
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "chart_data.csv");
		document.body.appendChild(link); // Required for Firefox
		link.click();
	});
}

// Function to export the chart as WebP format
function exportAsWebP1() {
	Plotly.toImage('pie', { format: 'webp', width: 800, height: 600 })
        .then(function (url) {
			const link = document.createElement('a');
            link.href = url;
            link.download = 'chart.webp';
            document.body.appendChild(link); // Required for Firefox
            link.click();
            link.parentNode.removeChild(link);
        });
	}
	
	// Function to export the chart as SVG format
	function exportAsSVG1() {
		Plotly.downloadImage('pie', { format: 'svg', width: 800, height: 600, filename: 'chart' });
	}
	
	// Add event listeners to export items
	document.getElementById('export-csv1').addEventListener('click', () => {
	exportAsCSV1(defaultYear.id);
});
document.getElementById('export-webp1').addEventListener('click', exportAsWebP1);
document.getElementById('export-svg1').addEventListener('click', exportAsSVG1);

const apiKey = '20b2f2eac97828b0328fd08d0039264c'; // înlocuiește cu cheia ta reală de la TMDb
const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGIyZjJlYWM5NzgyOGIwMzI4ZmQwOGQwMDM5MjY0YyIsInN1YiI6IjY0ODk3Mzk1ZTI3MjYwMDBlOGMzMDlhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MwlA_KvNWITCgQzesL6MSktQoeHTDtHXiRYszXtyBgY'; // înlocuiește cu tokenul tău real de acces

function searchActorByName(actorName) {
	const searchUrl = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${encodeURIComponent(actorName)}`;
  
	return fetch(searchUrl, {
	  headers: {
		Authorization: `Bearer ${accessToken}`,
	  },
	})
	  .then(response => response.json())
	  .then(data => {
		const actor = data.results.find(actor => actor.name.toLowerCase() === actorName.toLowerCase());
		if (actor) {
		  const actorId = actor.id;
		  const actorDetailsUrl = `https://api.themoviedb.org/3/person/${actorId}?api_key=${apiKey}`;
  
		  return fetch(actorDetailsUrl, {
			headers: {
			  Authorization: `Bearer ${accessToken}`,
			},
		  })
			.then(response => response.json())
			.then(details => {
			  return {"name": details.name, "popularity" : details.popularity};
			});
		} else {
		  throw new Error(`Actor '${actorName}' not found.`);
		}
	  });
  }
  
  const actorName = 'Dakota Johnson';
  

function displayActorsPopularity() {
	const name1 = document.getElementById('actorName').value;
	const name2 = document.getElementById('actorName2').value;

	const divEl = document.getElementById('chart2');

	searchActorByName(name1)
		.then(actorDetails1 => {
			searchActorByName(name2)
				.then(actorDetails2 => {
					divEl.innerText = "";
					const element = document.getElementById('export');
					element.style.display = "flex";
					createGraphic(actorDetails1, actorDetails2);
				})
				.catch(error => {
					console.error('Error:', error);
					divEl.innerText = "One of the actors doesn't exist in database.";
					const element = document.getElementById('export');
					element.style.display = "none";
				});
		})
		.catch(error => {
			console.error('Error:', error);
			divEl.innerText = "One of the actors doesn't exist in database.";
			const element = document.getElementById('export');
			element.style.display = "none";
		});
}

function createGraphic(actor1, actor2) {
	const data = [
		{
			x: [actor1.name, actor2.name],
			y: [actor1.popularity, actor2.popularity],
			fill: 'tozeroy',
			type: 'area',
			line: {
				color: 'blue',
				width: 2,
			},
			marker: {
				width:1,
			},
		},
	];

	const layout = {
		title: `Actor's Popularity`,
		xaxis: {
			title: 'Actors',
		},
		yaxis: {
			title: 'Popularity',
		},
	};

	Plotly.newPlot('chart2', data, layout);
}


// Function to export the chart data as CSV format
function exportAsCSV2(year) {
	const name1 = document.getElementById('actorName').value;
	const name2 = document.getElementById('actorName2').value;

	searchActorByName(name1)
		.then(actorDetails1 => {
			searchActorByName(name2)
				.then(actorDetails2 => {
					const csvContent = "data:text/csv;charset=utf-8," + [
						['Actor', 'Popularity'],
						[actorDetails1.name, actorDetails1.popularity],
						[actorDetails2.name, actorDetails2.popularity]
						].map(row => row.join(',')).join('\n');
					
					const encodedUri = encodeURI(csvContent);
					const link = document.createElement("a");
					link.setAttribute("href", encodedUri);
					link.setAttribute("download", "chart_data.csv");
					document.body.appendChild(link); // Required for Firefox
					link.click();
				})
				.catch(error => {
					console.error('Error:', error);
				});
		})
		.catch(error => {
			console.error('Error:', error);
		});
}

// Function to export the chart as WebP format
function exportAsWebP2() {
	Plotly.toImage('chart2', { format: 'webp', width: 800, height: 600 })
        .then(function (url) {
			const link = document.createElement('a');
            link.href = url;
            link.download = 'chart.webp';
            document.body.appendChild(link); // Required for Firefox
            link.click();
            link.parentNode.removeChild(link);
        });
	}
	
	// Function to export the chart as SVG format
	function exportAsSVG2() {
		Plotly.downloadImage('chart2', { format: 'svg', width: 800, height: 600, filename: 'chart2' });
	}
	
	// Add event listeners to export items
	document.getElementById('export-csv2').addEventListener('click', () => {
	exportAsCSV2();
});
document.getElementById('export-webp2').addEventListener('click', exportAsWebP2);
document.getElementById('export-svg2').addEventListener('click', exportAsSVG2);

// Function to export the chart data as CSV format
function exportAsCSV3(year) {
	fetch(`/linegraphql/${year}`)
	.then(response => response.json())
	.then(data => {
		const shows = [];
		const actors = [];
		for(show of data) {
			shows.push(show.show);
			actors.push(show.number_of_actors);
		}
		const csvContent = "data:text/csv;charset=utf-8," + [
			['Shows', 'Number of Actors nominated for SAG Awards'],
			...shows.map((show, index) => [show, actors[index]])
			.map(row => row.map(field => `"${field}"`).join(',')) // Escape fields with double quotes
		].join('\n');
		
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "chart_data.csv");
		document.body.appendChild(link); // Required for Firefox
		link.click();
	});
}

// Function to export the chart as WebP format
function exportAsWebP3() {
	Plotly.toImage('chart3', { format: 'webp', width: 800, height: 600 })
        .then(function (url) {
			const link = document.createElement('a');
            link.href = url;
            link.download = 'chart.webp';
            document.body.appendChild(link); // Required for Firefox
            link.click();
            link.parentNode.removeChild(link);
        });
	}
	
	// Function to export the chart as SVG format
	function exportAsSVG3() {
		Plotly.downloadImage('chart3', { format: 'svg', width: 800, height: 600, filename: 'chart3' });
	}
	
	// Add event listeners to export items
	document.getElementById('export-csv3').addEventListener('click', () => {
	exportAsCSV3(defaultYear.id);
});
document.getElementById('export-webp3').addEventListener('click', exportAsWebP3);
document.getElementById('export-svg3').addEventListener('click', exportAsSVG3);