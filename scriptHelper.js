// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let missionTarget = document.getElementById("missionTarget")
   missionTarget.innerHTML =
    `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star} </li>
                    <li>Distance from Earth: ${distance} </li>
                    <li>Number of Moons: ${moons} </li>
                </ol>
                <img src="${imageUrl}">
    `
}

function validateInput(testInput) {
   if(testInput === "" || testInput === 0) {
    return "Empty";
   } else if (isNaN(testInput)) {
    return "Not a number";
   } else {
    return "Is a number";
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let launchStatus = document.getElementById("launchStatus");

   if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
    alert("Please fill in all fields.");
   }
   else if (validateInput(pilot) === "Is a number" || validateInput(copilot) === "Is a number" || validateInput(fuelLevel) === "Not a number" || validateInput(cargoLevel) === "Not a number"){
    alert("Please make sure to use valid information for all fields.");
   }
   else if (fuelLevel < 10000) {
    pilotStatus.innerHTML = `Pilot ${pilot} ready`;
    copilotStatus.innerHTML = `Copilot ${copilot} ready`;
    list.style.visibility = 'visible';
    fuelStatus.innerHTML = "There is not enough fuel for the journey ahead";
    launchStatus.innerHTML = "Shuttle not ready for launch";
    launchStatus.style.color = 'red';
   }
   else if (cargoLevel > 10000) {
    pilotStatus.innerHTML = `Pilot ${pilot} ready`;
    copilotStatus.innerHTML = `Copilot ${copilot} ready`;
    list.style.visibility = 'visible';
    cargoStatus.innerHTML = "There is to much mass for the shuttle to take off"
    launchStatus.innerHTML = "Shuttle not ready for launch";
    launchStatus.style.color = 'red';
   }
   else {
    pilotStatus.innerHTML = `Pilot ${pilot} ready`;
    copilotStatus.innerHTML = `Copilot ${copilot} ready`;
    list.style.visibility = 'visible';
    launchStatus.innerHTML = "Shuttle is ready for launch";
    launchStatus.style.color = 'green';
   }

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
   let pickedPlanet = Math.floor(Math.random() * planets.length);
   return planets[pickedPlanet];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
