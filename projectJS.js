let stayOpen; // Declare stayOpen globally

function validateEmail() {
    let pattern = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let email = document.getElementById("email").value;
    let match = pattern.test(email);

    // prevent submission
    let form = document.getElementById("personalInfo");
    if (!match) {
        // alert user
        window.alert('Please enter a valid email');
        return false;
    }
    return true;
}


function printPlanner() {
    stayOpen = window.open();
    // link css:
    stayOpen.document.write('<html><head>');
    stayOpen.document.write('<link rel="stylesheet" href="style.css">');
    stayOpen.document.write('</head><body>');
    //intro:
    stayOpen.document.write("<h1>My Weekly Meal Plan</h1>");
    stayOpen.document.write("<h2>My Goal is:</h2>");
    // grab goal data from form:
    let goal = document.getElementById("goal").value;
    stayOpen.document.write(`<p> ${goal} </p>`);
    // grab weekly plan data:
    weekData = collectDays();
    // document.write grabbed data:
    stayOpen.document.write("<ul>");
    for (var key in weekData) {
        stayOpen.document.write(`<h3> ${key}:</h3>`);
        stayOpen.document.write(`<li>  ${weekData[key]} </li>`);
    }// end of dict loop
    stayOpen.document.write("</ul>");
    // add buttons(print)


    let printButton = stayOpen.document.createElement('button');
    printButton.setAttribute('type', 'button');
    printButton.setAttribute('id', 'print');
    printButton.textContent = 'Print Week';
    stayOpen.document.body.appendChild(printButton);

    printButton.addEventListener('click', function () {
        stayOpen.document.close(); // Close the document to finalize changes
        stayOpen.print(); // Print the document
    });

    // ending point of html
    stayOpen.document.write('</body></html>');
}

function collectDays() {
    // grab all tags needed
    let labels = document.getElementsByTagName('label');
    let textareas = document.getElementsByTagName('textarea');
    let mealPlanData = {};
    for (let i = 0; i < textareas.length; i++) {
        if (i == 0) {
            // the first textarea is the goals so skip:
            continue;
        } else {
            // grab value of label and textarea:
            //labels have no .value
            let labelContent = labels[i].textContent.trim();
            let textareaContent = textareas[i].value.trim();

            // put data in a dict:
            mealPlanData[labelContent] = textareaContent;
        }
    }// end of loop
    // return to be used in submit:
    return mealPlanData;
}

function SubmitPersonalInfo() {
    // get submit button:
    let ready = document.getElementById("submitbtn");
    // add event listener for when button clicked:
    ready.addEventListener('click', function () {
        // first validate email:
        let emailValid = validateEmail();

        // once submitted create a new window using document.write():
        if (emailValid) {
            printPlanner();
        }// end of if
    });// end of submit form
}

// Ensure the DOM is fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", function () {
    SubmitPersonalInfo();
});
