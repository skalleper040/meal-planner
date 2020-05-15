import _ from 'underscore';

const BASEURL = 'https://api.spoonacular.com/recipes/random?number=10&tags=';

const apiKey = '&apiKey=17cd8297fde84a3abfecf98b5fdf1566';

export async function cacheMeal(dishType){
    let result = true;
    if (!localStorage.getItem(dishType+"-meals")) {
        let dish = await fetchRecipes(BASEURL+dishType).catch(error => {
            console.log(error);
            result = false;
        });

        if (!_.isUndefined(dish)) {
            localStorage.setItem(dishType+"-meals", JSON.stringify(dish));
        }
    }
    return result;
}

function handleError(response) {
    if (!response.ok) throw new Error(response.statusText);
    return response;
}

async function fetchRecipes(url) {
    let response = await (fetch(url + apiKey)).then(handleError);
    let data = await (response.json());
    return data.recipes;
}

