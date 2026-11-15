var savedDetails = sessionStorage.getItem("userDetails");

if (savedDetails) {
    var userDetails = JSON.parse(savedDetails);

    document.getElementById("showName").textContent = userDetails.name;
    document.getElementById("showGender").textContent = userDetails.gender;
    document.getElementById("showMobile").textContent = userDetails.mobile;
    document.getElementById("showEmail").textContent = userDetails.email;
    document.getElementById("showCity").textContent = userDetails.city;
    document.getElementById("showState").textContent = userDetails.state;
    document.getElementById("showCountry").textContent = userDetails.country;
} else {
    document.getElementById("detailsTable").hidden = true;
    document.getElementById("emptyMessage").hidden = false;
}
