// Angelica West

console.log('print works');

var stayOpen; // global

function validateEmail(){
//. Important! No meal plan should be generated until a proper email address is entered. 
// use regrex
   let pattern =  /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   // get email--(don't forget .value)
   let email = document.getElementById("email").value;
   var match = pattern.test(email)
   // return the results of match to compare outside the function:
   // test match response:
   //console.log(`this is match: ${match}`)
 //***NOTE***: practice to have form outside the function:
//prevent submission
    //get entire form:
    var form = document.getElementById("personalInfo");
    //add event listener to submit form:
    form.addEventListener('submit',function(submitEvent){
       /* ***Note*** in html Button WAS NOT TYPE="SUBMIT 
       but instead was type="button", so that's why it didn't work
       work as a FORM SUBMIT EVENT*/ 
      // checks if submit event is working:
        //console.log('Form was submitted.')
      if(match == false){ // no need to submit form!
            submitEvent.preventDefault();
            // alert user
            window.alert('Please enter a valid email');
            // test window should work:
            //console.log('Email is False, but window no workie!')
            //match is false and won't create webpage
        }// end of if
        // test if even works at all
        // or if it just the if statement
        //console.log('outside of if email false!')
    });
    // testing if works underneath the event
    //console.log('Will be returned soon!')
    //returns match:
    return match; 
} // end of validate email


function collectDays() {
  // grab all tags needed (add class text to textareas and labels needed for mealPlan)
  let textareas = document.getElementsByClassName('text');
  let labels = document.getElementsByClassName('labeltext');

  let mealPlanData = {};

  for (let i = 0; i < textareas.length; i++) {
    // grab value of label and textarea:
    // labels have no .value so use .tectContent instead:
    let labelContent = labels[i].textContent.trim();
    let textareaContent = textareas[i].value.trim();
    // test mealplan:
    //console.log(`Label: ${labelContent}, Textarea: ${textareaContent}`);
    // put data in a dict:
    mealPlanData[labelContent] = textareaContent;
  } // end of loop

  // test meal plan outside the loop:
  //console.log(`MealPlan is: ${JSON.stringify(mealPlanData)}`);

  // return to be used in submit:
  return mealPlanData;
} // end of collect days

function createWebpage() {
  var content = ("<!DOCTYPE html>");
  content += ('<html><head>');
  content += ('<link rel="stylesheet" href="style200.css">');
  content += ('</head><body>');
  content += ("<h1>My Weekly Meal Plan</h1>");
  content += ("<h2>My Goal is:</h2>");

  // grab goal data from form:
  let goal = document.getElementById("goal").value;
  content += (`<p> ${goal} </p>`);

  // grab weekly plan data:
  let weekData = collectDays();

  // document.write grabbed data:
  content += ("<ul>");
  for (var key in weekData) {
    content += (`<h3> ${key}:</h3>`);
    content += (`<li>  ${weekData[key]} </li>`);
  } // end of dict loop
  content += ("</ul>");

  // Include internal JavaScript
  content += ('<script defer>');
  content += ('function setEvents() {');
  content += ('console.log("page loaded");');
  content += ('document.getElementById("exit").addEventListener("click", function() { window.close(); });');
  content += ('document.getElementById("printPlan").addEventListener("click", function() { window.print(); });');
  content += ('}');
  content += ('</script>');

  // Add print & restart button directly in the body
  content += '<button type="button" id="printPlan" onclick="setEvents()">Print Week</button>';
  content += '<button type="button" id="exit" onclick="setEvents()">Restart</button>';
  // add to webpage:
  stayOpen = window.open();
  // ending point of html
  content += ('</body></html>');
  // write everything
  stayOpen.document.write(content);

  // Add an event listener to the new window's document
  stayOpen.document.addEventListener('DOMContentLoaded', function () {
    stayOpen.setEvents();
  });
}





// Angelica West

// Your existing functions...

/*document.addEventListener('DOMContentLoaded', function (content) {
  // add event listeners to buttons in the new window
  var stayOpen = window.open();
  stayOpen.document.write(content);

  stayOpen.document.addEventListener('DOMContentLoaded', function () {
    console.log('page loaded');
    stayOpen.document.getElementById('exit').addEventListener('click', clearWeek);
    stayOpen.document.getElementById('printPlan').addEventListener('click', printPlanner);
  });
});*/





/* ***Note:*** if inside function event will only happen 
if function is called when document loads 
then that will help event listener to work.
EVENT LISTENERS STAY ONCE EXECUTED, so after the 
first call of submitPersonalInfo the event listeners inside
will stay as events in the webpage(Unless explicitly deleted)*/
function SubmitPersonalInfo() {
  // get submit button:
  let ready = document.getElementById("submitbtn");

  // add event listener for when button clicked:
  ready.addEventListener('click', function () {
      // first validate email:
      let email = validateEmail();

      // once submitted create a new window using document.write():
      if (email == true) {
          createWebpage()
      } // end of if
  }); // end of submit form
} // end of submitPersonalInfo



  // add event listener to webpage as soon as it loads for
  //email validation:
document.addEventListener('DOMContentLoaded',SubmitPersonalInfo);

// goals just get the print function to work! collect data validate email,
// webpage creation is good 