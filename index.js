getRandomMeal();
addToFavMeals();
// getMealById(52867);
const favItems = document.getElementById("fav-items");
const randomItems = document.getElementById("random-meal");
const searchText = document.getElementById("search-text");
const btnSearch = document.getElementById("search-btn");
const searchItems = document.getElementById("search-items");
const searchItem = document.getElementsByClassName("search-item")

//give feedback for search button.
btnSearch.addEventListener("click", getMealByName);



async function getMealByName() {

    // console.log("clicked")
    const text = searchText.value;
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + text);
    let user = await response.json();

    const mealSearch = user.meals
    // console.log(mealSearch.length);
    searchItems.innerHTML="";
    tag = document.createElement("h1");
    tag.innerHTML = "Search Results : ";
    searchItems.appendChild(tag);
    // searchItems.innerHTML="Search Results";
    // if (mealSearch !== null){
    mealSearch.forEach(element => {
        // console.log(element.strMeal)
        const meal = document.createElement("div");
        meal.classList.add("search-item");
        meal.innerHTML = `
            <li><img src="${element.strMealThumb}"
            alt="${element.strMeal}"></li>
            <span class="search-img-span">${element.strMeal}</span>
            
            `;
        searchItems.appendChild(meal);
        meal.addEventListener("click", () => showSearchedMeal(element.idMeal));


    });

    // }else{
    // searchItems.innerHTML="No Results found";
    // }
    searchItems.style.opacity = 100;
    searchItems.style.pointerEvents = "auto";




}

async function getRandomMeal() {
    for (let index = 0; index < 5; index++) {

        let response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        let user = await response.json();

        const meal = user.meals[0]

        addRandomMeals(meal, true)

    }
}
async function getMealById(id) {
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
    let user = await response.json();

    const meal = user.meals[0]
    return meal;
}
async function addRandomMeals(mealData, random = false) {

    const meal = document.createElement("div");
    meal.classList.add("random-item");
    meal.innerHTML = `
    <li><img src="${mealData.strMealThumb}"
    alt="${mealData.strMeal}"></li>
    <div class="random-img-caption">
    <span class="random-img-span">${mealData.strMeal}</span>
    <i name="fav-btn" class="fas fa-heart"></i>
    </div>

    `;
    const btnFav = meal.querySelector(".random-img-caption .fas");
    btnFav.addEventListener("click", () => {
        localStorage.setItem(mealData.idMeal, mealData.strMeal)
        // addToFavMeals();
        location.reload();
    })

    randomItems.appendChild(meal);


}

function addToFavMeals() {

    for (i = 0; i < localStorage.length; i++) {
        x = localStorage.key(i);
        const p = getMealById(x);
        p.then(mealData => {
            const meal = document.createElement("div");
            meal.classList.add("fav-item");
            meal.innerHTML = `
        <div class="fav-item" >
        <i class=" btn-fav-item fas fa-times-circle"></i>
        <li><img src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}></li>
        <span class="fav-img-span">${mealData.strMeal}</span>
        </div>
        `;
            const favItemOpen = meal.querySelector(".fav-item");
            favItemOpen.addEventListener("click",()=>console.log(mealData.idMeal));

            const btnDelete = meal.querySelector(".fas");
            btnDelete.addEventListener("click", () => {
                localStorage.removeItem(mealData.idMeal)
                // addToFavMeals();
                location.reload();
            })



            favItems.appendChild(meal);
        })


    }
}

function showSearchedMeal(id) {
    console.log("entered searchmeal func: " + id);

    const p = getMealById(id);
console.log(p)
    p.then(mealData => {
        const meal = document.createElement("div");
        meal.classList.add("fav-item");
        meal.innerHTML = `
        <i class=" btn-delete-search fas fa-times-circle"></i>
    <div class="search-item" >
    <li><img src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}></li>
    <span class="fav-img-span">${mealData.strInstructions}</span>
    </div>
    `;
        searchItems.innerHTML="";
        tag = document.createElement("h1");
        tag.innerHTML = `${mealData.strMeal}`;

        // closeBtn = document.createElement("i");
        // closeBtn.classList.add("fas fa-times-circle");
        

        // <i class=" btn-fav-item fas fa-times-circle"></i>
        searchItems.appendChild(tag);
        // searchItems.appendChild(closeBtn);
        searchItems.appendChild(meal);
    })





}