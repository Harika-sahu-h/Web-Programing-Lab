var userForm = document.getElementById("userForm");
var errorMessage = document.getElementById("errorMessage");

userForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var userDetails = {
        name: document.getElementById("name").value.trim(),
        gender: document.getElementById("gender").value,
        mobile: document.getElementById("mobile").value.trim(),
        email: document.getElementById("email").value.trim(),
        city: document.getElementById("city").value.trim(),
        state: document.getElementById("state").value.trim(),
        country: document.getElementById("country").value.trim()
    };

    sessionStorage.setItem("userDetails", JSON.stringify(userDetails));

    window.location.href = "display.html";
});

userForm.addEventListener("reset", function() {
    errorMessage.textContent = "";
});
