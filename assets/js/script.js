const API_KEY = "IUDJHvqI9u3fhHWcnda0WvwoeuM";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resutlsModal = new bootstrap.Modal(document.getElementById('resultsModal'));

//  LETS WIRE UP OUR BUTTON
document.getElementById("status").addEventListener("click", e => getStatus(e));

async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`;
    const response = await fetch(queryString);
    const data = await response.json(); // Using await pauses the execution of its surrounding async function until the promise is settled (that is, fulfilled or rejected).

    if (response.ok) {
        displayStatus(data);
    } else {
        throw new Error(data.error);
    }
    
}

function displayStatus(data){
    document.getElementById("resultsModalTitle").innerHTML = "API Key Status";
    document.getElementById("results-content").innerHTML =  `Your key is valid until <br> ${data.expiry}`;
    resutlsModal.show()
}