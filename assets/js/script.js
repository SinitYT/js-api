const API_KEY = "IUDJHvqI9u3fhHWcnda0WvwoeuM";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resutlsModal = new bootstrap.Modal(document.getElementById('resultsModal'));

//  LETS WIRE UP OUR Check Key  BUTTON
document.getElementById("status").addEventListener("click", e => getStatus(e));
// Wiring Up Run checks button
document.getElementById("submit").addEventListener("click", e => postForm(e));
function processOptions(form) {
    let optArray = [];

    for (let entry of form.entries()) {
        if (entry[0]==="options"){
            optArray.push(entry[1]);
        } 
    }
    form.delete("options");
    form.append("options",optArray.join());

    return form;

    
}
async function postForm(e) {
    const form = processOptions(new FormData(document.getElementById("checksform")));
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
                    "Authorization": API_KEY,
                },
        body: form,
        })
    const data = await response.json();
    

    if (response.ok){
        displayErrors(data);
    } else {
        throw new Error(data.error);
    }
}
function displayErrors(data) {
    heading = `JSHint results for ${data.file}`
    if (data.total_errors === 0) {
        results = `<div class="no_errors">No errors reported!</div>`;
    } else {
        results = `<div>Total Errors=<span class="error_count">${data.total_errors}</span></div>`
        for (let error of data.error_list) {
            results += `<div>At line <span class="line">${error.line}</span>, `;
            results += `column <span class="column">${error.col}:</span></div>`;
            results += `<div class="error">${error.error}</div>`;
        }
    }
    document.getElementById("resultsModalTitle").innerHTML = heading;
    document.getElementById("results-content").innerHTML =  results;
    resutlsModal.show()


}


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



