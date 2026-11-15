var statusText = document.getElementById("status");
var table = document.getElementById("bookTable");
var tableBody = document.getElementById("tableBody");
var fileInput = document.getElementById("xmlFile");

function loadXML() {
    statusText.textContent = "Loading books.xml...";
    fetch("books.xml")
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Could not load the XML file.");
            }
            return response.text();
        })
        .then(function(xmlText) {
            showXMLData(xmlText);
        })
        .catch(function() {
            statusText.textContent = "For offline use, click Choose XML File and select books.xml from this folder.";
        });
}

fileInput.addEventListener("change", function() {
    var file = fileInput.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function() {
        showXMLData(reader.result);
    };
    reader.onerror = function() {
        statusText.textContent = "Unable to read the selected file.";
    };
    reader.readAsText(file);
});

function showXMLData(xmlText) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlText, "application/xml");

    if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
        table.hidden = true;
        statusText.textContent = "Invalid XML file. Please check the file format.";
        return;
    }

    var books = xmlDoc.getElementsByTagName("book");
    tableBody.innerHTML = "";

    for (var i = 0; i < books.length; i++) {
        var book = books[i];
        var row = document.createElement("tr");
        var details = [
            book.getAttribute("id") || "N/A",
            book.getAttribute("category") || "N/A",
            getText(book, "title"),
            getText(book, "author"),
            getText(book, "price")
        ];

        for (var j = 0; j < details.length; j++) {
            var cell = document.createElement("td");
            cell.textContent = details[j];
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }

    table.hidden = false;
    statusText.textContent = books.length + " book(s) loaded successfully.";
}

// Get the text inside an XML tag
function getText(book, tagName) {
    var element = book.getElementsByTagName(tagName)[0];
    return element ? element.textContent : "N/A";
}
