/* eslint-disable no-undef */

function getSummary(cb) {
  return fetch('/api/summary', {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

/**
 * Function for getting all clubs from the database.
 * @param cb callback
 * @returns {Promise<Response>}
 */
function getClubs(cb){
  return fetch('/api/clubs', {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

/**
 * Function for adding a new club into the database.
 * @param s stateobject from the form
 * @param cb callback
 * @returns {Promise<Response>}
 */
function addClub(s,cb){
  return fetch('/api/clubs', {
    method: "post",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(s)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { getSummary, getClubs, addClub };
export default Client;
