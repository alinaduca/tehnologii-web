//  // Set up the Apollo Client
//  const client = new ApolloClient({
//     uri: 'http://localhost:4000/graphql', // Replace with your GraphQL server endpoint
//   });

//   // Define your GraphQL query
//   const GET_STATISTICS = gql`
//     query {
//       statistics {
//         # Define the fields you want to retrieve for statistics
//       }
//     }
//   `;

//   // Execute the GraphQL query and handle the response
//   client.query({ query: GET_STATISTICS })
//     .then(response => {
//       const statisticsData = response.data.statistics;
//       // Process the retrieved data and update the HTML to display the statistics
//       const statisticsContainer = document.getElementById('statistics-container');
//       statisticsContainer.innerText = JSON.stringify(statisticsData);
//     })
//     .catch(error => {
//       console.error('Error occurred:', error);
//     });