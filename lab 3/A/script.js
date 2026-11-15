const form = document.getElementById("registrationForm");
const message = document.getElementById("formMessage");
const primaryEvent = document.getElementById("primaryEvent");

function updateEventChoices() {
  const selected = primaryEvent.value;
  document.querySelectorAll('input[name="otherEvents"]').forEach(box => {
    const label = box.closest("label");
    const isPrimary = box.value === selected;
    box.disabled = isPrimary;
    if (isPrimary) {
      box.checked = false;
      label.classList.add("disabled-choice");
    } else {
      label.classList.remove("disabled-choice");
    }
  });
const form = document.getElementById("registrationForm");

const message = document.getElementById("formMessage");

const primaryEvent = document.getElementById("primaryEvent");




function updateEventChoices() {

    const selected = primaryEvent.value;

    document.querySelectorAll(
        'input[name="otherEvents"]'
    ).forEach(box => {

        const label = box.closest("label");

        const isPrimary = box.value === selected;

        box.disabled = isPrimary;

        if (isPrimary) {

            box.checked = false;

            label.classList.add("disabled-choice");

        } else {

            label.classList.remove("disabled-choice");

        }

    });

}


primaryEvent.addEventListener(
    "change",
    updateEventChoices
);




form.addEventListener("submit", function(event) {

    event.preventDefault();

    // Validate form fields
    if (!form.reportValidity()) {
        return;
    }

    const data = new FormData(form);

    const selectedEvents = data.getAll("otherEvents");

    const primary = data.get("primaryEvent");

    const name = data.get("fullName").trim();

    const email = data.get("email").trim();


    if (!name || !email || !primary) {

        showMessage(
            "Please complete all required fields before submitting.",
            "error"
        );

        return;

    }



    const registration = {

        reference: "JCF-" +
            Date.now().toString().slice(-7),

        fullName: name,

        email: email,

        institute: data.get("institute"),

        primaryEvent: primary,

        otherEvents: selectedEvents,

        submittedAt: new Date().toLocaleString()

    };


    try {

        const saved = JSON.parse(
            sessionStorage.getItem("jainFestRegistrations") || "[]"
        );

        saved.push(registration);

        sessionStorage.setItem(
            "jainFestRegistrations",
            JSON.stringify(saved)
        );

    } catch (error) {

        console.log("Browser storage unavailable.");

    }


    showMessage(

        `Thank you, ${name}! Your demo registration
        has been recorded in this browser.
        Reference: ${registration.reference}.
        Primary event: ${primary}.
        Additional interests: ${
            selectedEvents.length
                ? selectedEvents.join(", ")
                : "None selected"
        }.`,

        "success"

    );


   

    form.reset();

    updateEventChoices();

});




form.addEventListener("reset", function() {

    window.setTimeout(() => {

        message.className = "form-message";

        message.textContent = "";

        updateEventChoices();

    }, 0);

});




function showMessage(text, type) {

    message.textContent = text;

    message.className = `form-message ${type}`;

    message.scrollIntoView({

        behavior: "smooth",

        block: "nearest"

    });

}

}
primaryEvent.addEventListener("change", updateEventChoices);

form.addEventListener("submit", function(event) {
  event.preventDefault();

  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const selectedEvents = data.getAll("otherEvents");
  const primary = data.get("primaryEvent");
  const name = data.get("fullName").trim();
  const email = data.get("email").trim();

  if (!name || !email || !primary) {
    showMessage("Please complete all required fields before submitting.", "error");
    return;
  }

  const registration = {
    reference: "JCF-" + Date.now().toString().slice(-7),
    fullName: name,
    email: email,
    institute: data.get("institute"),
    primaryEvent: primary,
    otherEvents: selectedEvents,
    submittedAt: new Date().toLocaleString()
  };


  try {
    const saved = JSON.parse(sessionStorage.getItem("jainFestRegistrations") || "[]");
    saved.push(registration);
    sessionStorage.setItem("jainFestRegistrations", JSON.stringify(saved));
  } catch (error) {
    // Form still confirms locally if browser storage is unavailable.
  }

  showMessage(
    `Thank you, ${name}! Your demo registration has been recorded in this browser. Reference: ${registration.reference}. Primary event: ${primary}. Additional interests: ${selectedEvents.length ? selectedEvents.join(", ") : "None selected"}.`,
    "success"
  );
  form.reset();
  updateEventChoices();
});

form.addEventListener("reset", function() {
  window.setTimeout(() => {
    message.className = "form-message";
    message.textContent = "";
    updateEventChoices();
  }, 0);
});

function showMessage(text, type) {
  message.textContent = text;
  message.className = `form-message ${type}`;
  message.scrollIntoView({ behavior: "smooth", block: "nearest" });
}
