// Read session information before clearing it.
const name = sessionStorage.getItem("userName") || "Guest";
const startTime = Number(sessionStorage.getItem("startTime"));
const endTime = Date.now();

document.getElementById("thankYou").textContent = `Thank you for visiting, ${name}.`;

if (startTime) {
    const totalSeconds = Math.max(0, Math.floor((endTime - startTime) / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    document.getElementById("duration").textContent =
        `Your session duration: ${hours} hour(s), ${minutes} minute(s), ${seconds} second(s).`;
} else {
    document.getElementById("duration").textContent = "Your session start time was not found.";
}

sessionStorage.removeItem("userName");
sessionStorage.removeItem("startTime");