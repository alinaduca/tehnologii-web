// // var actors = [
// // 	"Al Pacino",
// //     "Brad Pitt",
// //     "Bradley Cooper"
// // ];
// // // var currentImageIndex = 0;

// // // function displayElementsOnPage(actors) {
// // //     let container = document.createElement('div');
// // //     for (let i = 0; i < arr.length; i++) {
// // //       let element = document.createElement('p');
// // //       let text = document.createTextNode(actors[i]);
// // //       element.appendChild(text);
// // //       container.appendChild(element);
// // //     }
// // //     document.body.appendChild(content);
// // //   }
// // //   displayElementsOnPage(actors);



// // //   fetch('https://api.chucknorris.io/jokes/random')
// // //       .then(response => response.json())
// // //       .then(data => {
// // //         document.getElementById('joke').innerHTML = data.value;
// // //       })
// // //       .catch(error => {
// // //         console.error(error);
// // //       });

// // actors.forEach(element => {
// //     document.getElementById('joke').innerHTML = element; 
// // });


// // var actors = [
// //     "Al Pacino",
// //     "Brad Pitt",
// //     "Bradley Cooper"
// // ];
// // var actorList = "";
// // actors.forEach(element => {
// //     actorList += element + "<br>";
// // });
// // document.getElementById('joke').innerHTML = actorList;




// const API_KEY = '309474ef';
// const API_URL = `http://www.omdbapi.com/?apikey=309474ef&type=movie&award=Oscar&plot=full&r=json`;

//       fetch(API_URL)
//         .then(response => response.json())
//         .then(data => {
//           const actors = {};
//           data.Search.forEach(movie => {
//             if (movie.Actors && movie.Award) {
//               const actorNames = movie.Actors.split(', ');
//               console.log(actorNames);
//               const awards = movie.Award.split('. ');
//               awards.forEach(award => {
//                 if (award.includes('Oscar')) {
//                   actorNames.forEach(actor => {
//                     if (!actors[actor]) {
//                       actors[actor] = [];
//                     }
//                     actors[actor].push(award.trim());
//                   });
//                 }
//               });
//             }
//           });

//           // Create the diagram
//           const graph = new mxGraph(document.getElementById('graph-container'));
//           const parent = graph.getDefaultParent();

//           graph.getModel().beginUpdate();

//           try {
//             // Add the actors to the diagram
//             const actorCells = {};
//             let x = 50;
//             let y = 50;
//             Object.keys(actors).forEach(actor => {
//               const actorCell = graph.insertVertex(parent, null, actor, x, y, 120, 30);
//               actorCells[actor] = actorCell;
//               y += 100;
//             });

//             // Add the nominations to the diagram
//             Object.keys(actors).forEach(actor => {
//               const nominations = actors[actor];
//               nominations.forEach(nomination => {
//                 const nominationCell = graph.insertVertex(parent, null, nomination, x + 200, actorCells[actor].geometry.y, 120, 30);
//                 const edge = graph.insertEdge(parent, null, '', actorCells[actor], nominationCell);
//               });
//             });
//           } finally {
//             graph.getModel().endUpdate();
//           }
//         });





// Data
var data = {
	labels: ["Bradley Cooper", "Al Pacino", "Brad Pitt"],
	datasets: [{
		label: "Oscar Nominations",
		data: [3, 5, 2],
		backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
        borderColor: "#000000s", // optional - set border color for bars
        borderWidth: 1, // optional - set border width for bars
        fontColor: "#000000" // set font color for label
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
    labels: ["2018", "2019", "2020"],
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