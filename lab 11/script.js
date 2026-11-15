
function updateClock() {
    const now = new Date();

    // Update current time
    document.getElementById("liveTime").textContent =
        new Intl.DateTimeFormat("en-IN", {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        }).format(now);

    // Update current date
    document.getElementById("liveDate").textContent =
        new Intl.DateTimeFormat("en-IN", {
            timeZone: "Asia/Kolkata",
            day: "2-digit",
            month: "long",
            year: "numeric"
        }).format(now);

    // Update current day
    document.getElementById("liveDay").textContent =
        new Intl.DateTimeFormat("en-IN", {
            timeZone: "Asia/Kolkata",
            weekday: "long"
        }).format(now);
}

// Display clock immediately
updateClock();

// Update clock every second
setInterval(updateClock, 1000);

// Refresh button
document.getElementById("refreshButton")
    .addEventListener("click", updateClock);
