const params = new URLSearchParams(window.location.search);
const submittedName = params.get("name");

if (!submittedName || !submittedName.trim()) {
    window.location.replace("index.html");
} else {
    const name = submittedName.trim();
    sessionStorage.setItem("userName", name);

    // Save the start time once for this browser-tab session.
    if (!sessionStorage.getItem("startTime")) {
        sessionStorage.setItem("startTime", Date.now().toString());
    }

    document.getElementById("greeting").textContent = `Hello, ${name}!`;
    const start = new Date(Number(sessionStorage.getItem("startTime")));
    document.getElementById("startTime").textContent =
        `Start time: ${start.toLocaleTimeString()}`;

    document.getElementById("logoutButton").addEventListener("click", () => {
        window.location.href = "logout.html";
    });
}