// Selection of the 3 DOM elements
const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");

let searchQuery = ""; //initialized as an empty string
const APP_ID = 'cbc7406e'; // APP_ID and key store API credentials
const APP_key = 'f270bc76945056c1a568a0ec95ba21df';

// console.log(container)

searchForm.addEventListener("submit", (e) => { //we attache en event listener to the submit action on the searchform
  e.preventDefault(); // this prevent the default form submission
  searchQuery = e.target.querySelector("input").value;
  fetchAPIRecipe(); // is called to perform the API call and display the results 
  //console.log(searchQuery)
});

// Source API https://developer.edamam.com/edamam-docs-recipe-api-v1
async function fetchAPIRecipe () {
    const pathURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=26`; //use backtick to have dynamic javascript in this string // by adding "&to=26" I can see until 26 results //part2 change pasta by a javascript expression "${searchQuery}" to do the queries
    const response = await fetch(pathURL);
    const data = await response.json(); // it will convert our response into json and we will have json into the data
    //console.log(response);
    //console.log(data); // we see the number of results

    //create a function to generate our HTML
    generateHTML(data.hits);
}

function generateHTML(results) {
    let generatedHTML = "";
    results.map(result => {   // we loop trhough the result and each time it create a new element . At the end it will generate 26 elements  
    generatedHTML += 
    `
    <div class="element">
    <img src="${result.recipe.image}" alt="meal with salmon">
        <div class ="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a id=view-button href="${result.recipe.url}">View Recipe</a>
        </div>
        <p class="element-data-1">Nutriments: ${result.recipe.nutrientInfo}</p>
        <p class="element-data-2">Cuisine Type: ${result.recipe.cuisineType}</p>
        <p class="element-data-3">Calories: ${result.recipe.calories.toFixed(1)}</p>  
    </div>
    `
    })  //have 1 decimal in calories ".toFixed(1)"
    searchResultDiv.innerHTML = generatedHTML; //the propriety is set to generatedHTML which update teh page with the search results
}

//other sources : https://www.google.com/search?q=using+an+API+with+fetch&rlz=1C5CHFA_enUS1035US1035&oq=using+an+API+with+fetch&aqs=chrome..69i57j0i22i30j0i390i650l2.8489j0j4&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:461343d6,vid:hpSz0RE3D-E

// https://www.npmjs.com/package/node-fetch#fetchurl-options // https://www.w3schools.com/jsref/api_fetch.asp

// https://www.educative.io/courses/integrate-the-movie-database-api-in-javascript/R87l6Kq2J8V
//  fetch method Source Mmdn web docs Fetch API