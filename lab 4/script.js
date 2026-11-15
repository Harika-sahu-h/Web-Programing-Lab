
var countryInfo = {
    India: {
        capital: "New Delhi",
        fact: "The Taj Mahal is located in India."
    },
    USA: {
        capital: "Washington, D.C.",
        fact: "The United States has 50 states."
    },
    Japan: {
        capital: "Tokyo",
        fact: "Mount Fuji is the highest mountain in Japan."
    },
    France: {
        capital: "Paris",
        fact: "The Eiffel Tower is in Paris, France."
    },
    Australia: {
        capital: "Canberra",
        fact: "The Great Barrier Reef is found off Australia's coast."
    }
};

var countryList = document.getElementById("country");
var capitalText = document.getElementById("capital");
var factText = document.getElementById("fact");


function showDetails() {
    var selectedCountry = countryList.value;

    capitalText.textContent = countryInfo[selectedCountry].capital;
    factText.textContent = countryInfo[selectedCountry].fact;
}

countryList.addEventListener("change", showDetails);

showDetails();
