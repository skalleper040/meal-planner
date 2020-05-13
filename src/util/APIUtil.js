const BREAKFASTURL = 'https://api.spoonacular.com/recipes/random?number=10&tags=breakfast';
const LUNCHURL = 'https://api.spoonacular.com/recipes/random?number=10&tags=lunch';
const DINNERURL ='https://api.spoonacular.com/recipes/random?number=10&tags=dinner';
const apiKey = '';

export async function cacheRecipes() {
    if(!localStorage.getItem("breakfast-meals")){
        console.log("fecthing breakfast");
        let breakfast = await fetchRecipes(BREAKFASTURL).catch(error =>{
            return false;
        });
        localStorage.setItem("breakfast-meals", JSON.stringify(breakfast));
    }
    
    if(!localStorage.getItem("lunch-meals")){
        console.log("fecthing lunch");
        let lunch = await fetchRecipes(LUNCHURL).catch(error =>{
            return false;
        });
        localStorage.setItem("lunch-meals", JSON.stringify(lunch));
    }

    if(!localStorage.getItem("dinner-meals")){
        console.log("fecthing dinner");
        let dinner = await fetchRecipes(DINNERURL).catch(error => {
             return false;
        });
        localStorage.setItem("dinner-meals", JSON.stringify(dinner));
    }

    return true;
}
function handleError(response){
    if(!response.ok) throw new Error(response.statusText);
    return response;
}

async function fetchRecipes(url){
    let response = await(fetch(url+apiKey)).then(handleError);
    let data = await(response.json());
    return data.recipes;
}

