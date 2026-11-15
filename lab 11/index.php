
<?php
date_default_timezone_set("Asia/Kolkata");

$currentDate = date("d F Y");
$currentTime = date("h:i:s A");
$currentDay = date("l");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Current Date and Time</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
</head>
<body>

    <main class="dashboard">

        <header class="topbar">
            <div class="brand">
                <span class="brand-mark">◷</span>
                <span>TIME</span>
            </div>

            <div class="live">
                <span class="live-dot"></span>
                LIVE
            </div>
        </header>

        <section class="clock-card">

            <div class="card-top">
                <span class="card-label">CURRENT TIME</span>
                <span class="zone">IST · UTC +05:30</span>
            </div>

            <div class="time" id="liveTime">
                <?php echo htmlspecialchars($currentTime); ?>
            </div>

            <div class="card-bottom">
                <span class="calendar">▦</span>

                <span id="liveDate">
                    <?php echo htmlspecialchars($currentDate); ?>
                </span>

                <span class="separator"></span>

                <strong id="liveDay">
                    <?php echo htmlspecialchars($currentDay); ?>
                </strong>
            </div>

            <div class="progress-track">
                <span></span>
            </div>

        </section>

        <section class="facts">

            <article class="fact">
                <span class="fact-icon">◷</span>

                <div>
                    <p>TIME FORMAT</p>
                    <h2>12-hour</h2>
                    <small>Hours · Minutes · Seconds</small>
                </div>
            </article>

            <article class="fact">
                <span class="fact-icon">⌖</span>

                <div>
                    <p>TIME ZONE</p>
                    <h2>India Standard Time</h2>
                    <small>Asia / Kolkata</small>
                </div>
            </article>

        </section>

        <footer class="footer">

            <span class="footer-indicator">
                <span></span>
                Clock is running
            </span>

            <button type="button" id="refreshButton">
                ↻ &nbsp; Refresh
            </button>

        </footer>

    </main>

</body>
</html>
