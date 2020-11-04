var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=RtjRFzTRwgQ-unE_nt7BJ2260H63G00EWTNi-GUvSTg";
// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!

const promiseObj = corsPromise();

promiseObj.then(
  (request) =>
    (request.onload = request.onerror = function () {
      // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
      handleResponse(request.response);
    })
);

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////
const handleResponse = (requestResponse) => {

  const jsonified = JSON.parse(requestResponse);
  const plantsArray = jsonified.data;


  plantsArray.forEach(element => {
    displayPlant(element.common_name, element.image_url);
  });
}

const displayPlant = (common_name, image_url) => {
  const wrapperDiv = document.createElement("div");
  wrapperDiv.setAttribute("id", "wrapper");
  const header = document.createElement("h1");
  header.innerText = common_name;
  const image = document.createElement("img");
  image.src = image_url;
  image.height = "300";
  image.width = "250";
  wrapperDiv.appendChild(header);
  wrapperDiv.appendChild(image);
  document.getElementById("plants").appendChild(wrapperDiv);
}
