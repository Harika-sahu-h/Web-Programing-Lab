<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: index.html");
    exit();
}

$name = trim($_POST["name"] ?? "");
$age = filter_input(INPUT_POST, "age", FILTER_VALIDATE_INT);

if ($name === "" || $age === false || $age === null || $age < 1 || $age > 120) {
    $status = "invalid";
    $heading = "Please check your details";
    $message = "Return to the form and enter a valid name and age.";
} elseif ($age < 18) {
    $status = "denied";
    $heading = "Not eligible yet";
    $message = "Hello, " . $name . ". You must be at least 18 years old to meet this requirement.";
} else {
    $status = "approved";
    $heading = "You're eligible";
    $message = "Welcome, " . $name . ". You meet the minimum age requirement.";
}

$safeHeading = htmlspecialchars($heading, ENT_QUOTES, "UTF-8");
$safeMessage = htmlspecialchars($message, ENT_QUOTES, "UTF-8");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Result</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main class="site result-site">
        <header class="header">
            <div class="page-label">AGE CHECK</div>
            <div class="secure"><i></i> Verification result</div>
        </header>

        <section class="result-card">
            <div class="result-symbol <?php echo $status; ?>">
                <?php echo $status === "approved" ? "✓" : "!"; ?>
            </div>

            <?php if ($status === "approved") { ?>
                <div class="result-label approved-label">AGE REQUIREMENT MET</div>
            <?php } elseif ($status === "denied") { ?>
                <div class="result-label denied-label">AGE REQUIREMENT NOT MET</div>
            <?php } else { ?>
                <div class="result-label denied-label">INVALID DETAILS</div>
            <?php } ?>

            <h1><?php echo $safeHeading; ?></h1>
            <p><?php echo $safeMessage; ?></p>

            <div class="result-info">
                <span>Minimum age</span><strong>18 years</strong>
            </div>

            <a href="index.html" class="back-button">← Back to verification</a>
        </section>

        <footer class="footer">
            <span>AGE VERIFICATION</span>
            <span>A quick and simple verification.</span>
        </footer>
    </main>
</body>
</html>
