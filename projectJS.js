function validateEmail(){
//. Important! No meal plan should be generated until a proper email address is entered. 
// use regrex
   let pattern =  /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   // get email--(don't forget .value)
   let email = document.getElementById("email").value;
   let match = pattern.test(email)
   // return the results of match to compare outside the function:
   // test match response:
   //console.log(`this is match: ${match}`)
 //***NOTE***: practice to have form outside the function:
//prevent submission
    //get entire form:
    let form = document.getElementById("personalInfo");
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


function clearWeek(NewWindow){
  // exit new window:
  NewWindow.close()
  // 

    // location = current url
  window.location.reload();
}

function printPlanner(){
   window.print();
}

function collectDays(){
    // grab all tags needed
    let labels = document.getElementsByTagName('label');
    let textareas = document.getElementsByTagName('textarea');
    let mealPlanData = {};
    //console.log(`Toatal labels: ${labels.length}`);
    for(let i = 0; i < textareas.length; i++){
      if(i <= 3){
        // the first textarea is the goals so skip:
        continue
      }//end of if
      else{
        // grab value of label and textarea:
        //labels have no .value
        let labelContent = labels[i].textContent.trim();
        let textareaContent = textareas[i].value.trim();

        // put data in a dict:
        mealPlanData[labelContent] = textareaContent;
        // test meal plan:
        console.log(`MealPlan is: ${JSON.stringify(mealPlanData)}`);
        /* in order to get the string value use:
        JSON.stringify(mealPlanData)
        this will convert a js object into a JSON stringify
        use this when:when you want to see the actual structure 
        of the JS object in a readable format. */
       // console.log(`MealPlan is:`, JSON.stringify(mealPlanData[i]));

      } //end of else
      // checks function working :
      //console.log(`In collect days function here is mealplanData: ${mealPlanData}`)
    }// end of loop
    // return to be used in submit:
    return mealPlanData;
}   // end of collect days

/* ***Note:*** if inside function event will only happen 
if function is called when document loads 
then that will help event listener to work.
EVENT LISTENERS STAY ONCE EXECUTED, so after the 
first call of submitPersonalInfo the event listeners inside
will stay as events in the webpage(Unless explicitly deleted)*/
function SubmitPersonalInfo(){
   // get submit button:
   let ready = document.getElementById("submitbtn");
   // ad event listener for when button clicked:
   ready.addEventListener('click',function(){
    // test button clicked:
    //console.log('button clicked')
  // first validate email:
    let email = validateEmail()
   // check email data in submitpersonalInfo:
    //console.log(`Email Boolean: ${email}`) //email is
   //undefined so new window never opens
 // once submitted create a new window using document.write():
   if(email == true){
      let stayOpen = window.open();
      // link css:
      stayOpen.document.write('<html><head>');
      stayOpen.document.write('<link rel="stylesheet" href="style200.css">');
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
      for(var key in weekData){
          stayOpen.document.write(`<h3> ${key}:</h3>`);
          stayOpen.document.write(`<li>  ${weekData[key]} </li>`);

      }// end of dict loop
    stayOpen.document.write("</ul>");
    // add buttons(print & reset)
    let reset = stayOpen.document.write('<button type="button" id="clear">Restart</button>');
    document.getElementById("clear").addEventListener('click',function(){
        // test restart button works:
        console.log('Restart button clicked!');
        //***NO console shown so restart button not working */
      // call clearweek and pass in the stayOpen variable:
        clearWeek(stayOpen);

    });// end of reset

    let print = stayOpen.document.write('<button type="button" id="print">Print Week</button>');
    document.getElementById('print').addEventListener('click',printPlanner);
  }// end of if
    // ending point of html
    stayOpen.document.write('</body></html>');
    });// end of submit form
  }// end of submitPersonalInfo

document.addEventListener('DOMContentLoaded',SubmitPersonalInfo);

/*NEXT TIME ON DRAGON BALL-Z
FIX RESET and Print buttons

*/ 