// Make sure to follow REST methods: PUT, GET, POST, DELETE

export const getHelloWorld = async function (id: number): Promise<string | void> {
  const data = {
    'id': id
  };

  return fetch('http://localhost:8000/api/hello-world', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then(data => {
        return data.msg;
    })
    .catch((err) => {
        console.log("ERROR: " + err);
    })

//     let data = { 'id': 2 }
// fetch('http://localhost:8000/api/hello-world', {
//     // mode: 'no-cors',
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     // credentials: 'same-origin',
//     body: JSON.stringify(data)
//   })
//     .then((response) => response.json())
//     .then(data => {
//         console.log(data.myId);
//         return data.myId;
//     })
//     .catch((err) => {
//         console.log("ERROR: " + err);
//     })
};