import _ from 'underscore';

export function convertSingleIngredientMeasureUnits(ingredient) {
    let result = JSON.parse(JSON.stringify(ingredient)); //deep clone of ingredient.
    convertMeasures(result);
    return result;
}

export function convertIngredientListMeasureUnits(ingredients){
    let convertedIngredients = [];
    ingredients.forEach(ingredient =>{
        convertedIngredients.push(convertSingleIngredientMeasureUnits(ingredient));
    });
    return convertedIngredients;
}

//Keep spoons for recipe, i suppose. 
export function convertIngredientsIgnoreSpoons(ingredients){
    let convertedIngredients = [];
    ingredients.forEach(ingredient =>{
        if(!isSpoon(ingredient.measures.metric.unitShort)){
            convertedIngredients.push(convertSingleIngredientMeasureUnits(ingredient))
        } else { 
            convertedIngredients.push(ingredient);
        }
    });
    return convertedIngredients;
}

function convertMeasures(ingredient) {
    convertMetricMeasures(ingredient);
    convertUSMeasures(ingredient);
}

function convertUSMeasures(ingredient) {
    let unit = ingredient.measures.us.unitShort;
    if (!_.isUndefined(unit)) {
        if (isUSMeasure(unit)) {
            roundUSMeasure(ingredient);
        }
    }
}

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function roundUSMeasure(ingredient) {
    let amount = ingredient.measures.us.amount;
    if (!Number.isInteger(amount)) {
        let newAmount = round(amount, 2);
        ingredient.measures.us.amount = newAmount;
    }
}


function convertMlToL(amount) {
    return { amount: round(amount / 1000, 2), unit: 'l' };
}

function convertMlToDl(amount) {
    return { amount: round(amount / 100, 2), unit: 'dl' };
}

function convertMlToCl(amount) {
    return { amount: round(amount / 10, 2), unit: 'cl' };
}

function roundMl(amount) {
    return { amount: Math.ceil(amount), unit: 'ml' };
}

function convertGToKg(amount) {
    return { amount: parseFloat((Math.floor(amount / 1000) + (Math.round(amount % 1000)) / 1000).toFixed(2)), unit: 'kg' };
}

function convertGToHg(amount) {
    return { amount: parseFloat((Math.floor(amount / 100) + (Math.round(amount % 100)) / 100).toFixed(2)), unit: 'hg' };
}

function roundG(amount) {
    return { amount: Math.ceil(amount), unit: 'ml' };
}

function convertML(amount) {
    if (Math.floor(amount / 1000) >= 1) {
        return convertMlToL(amount);
    } else if (Math.floor(amount / 100) >= 1) {
        return convertMlToDl(amount);
    } else if (Math.floor(amount / 10) >= 1) {
        return convertMlToCl(amount);
    } else {
        if (Math.ceil(amount) >= 10) {
            return convertMlToCl(Math.ceil(amount));
        } else {
            return roundMl(amount);
        }
    }
}

function convertG(amount) {
    if (Math.floor(amount / 1000) >= 1) {
        return convertGToKg(amount);
    } else if (Math.floor(amount / 100 >= 1)) {
        return convertGToHg(amount);
    } else {
        if (Math.ceil(amount) >= 100) {
            return convertMlToCl(Math.ceil(amount))
        } else {
            return roundG(amount);
        }
    }
}

function convertToMl(amount, unit) {
    let lcUnit = unit.toLowerCase();
    switch (lcUnit) {
        case 'l':
        case 'liter':
            return amount * 1000;
        case 'dl':
        case 'deciliter':
            return amount * 100;
        case 'tbsps':
        case 'tbsp':
        case 'tablespoon':
        case 'tbs':
            return amount * 15;
        case 'cl':
        case 'centiliter':
            return amount * 10;
        case 'tsps':
        case 'tsp':
        case 'teaspoon':
            return amount * 5;
        default: return amount;
    }
}

function convertToG(amount, unit) {
    let lcUnit = unit.toLowerCase();
    switch (lcUnit) {
        case 'kg':
        case 'kgs':
        case 'kilogram':
        case 'kilograms':
        case 'kilo':
        case 'kilos':
            return amount * 1000;
        case 'hg':
        case 'hgs':
        case 'hektogram':
        case 'hektograms':
        case 'hekto':
        case 'hektos':
            return amount * 100;
        default: return amount;
    }
}

function convertMetricMeasures(ingredient) {

    let unitShort = ingredient.measures.metric.unitShort;
    let amount = ingredient.measures.metric.amount;

    if (!_.isUndefined(unitShort)) {
        if (isMetricVolumeMeasure(unitShort)) {
            let mlValue = convertToMl(amount, unitShort);
            let convertedMeasures = convertML(mlValue);
            ingredient.measures.metric.amount = convertedMeasures.amount;
            ingredient.measures.metric.unitShort = convertedMeasures.unit;

        } else if (isMetricWeightMeasure(unitShort)) {
            let gValue = convertToG(amount, unitShort);
            let convertedMeasures = convertG(gValue);
            ingredient.measures.metric.amount = convertedMeasures.amount;
            ingredient.measures.metric.unitShort = convertedMeasures.unit;
        }
    }
}

function isMetricVolumeMeasure(unit) {
    let lcUnit = unit.toLowerCase();
    switch (lcUnit) {
        case 'ml':
        case 'cl':
        case 'dl':
        case 'l':
            return true;
        default: return isSpoon(unit);
    }
}

function isMetricWeightMeasure(unit) {
    let lcUnit = unit.toLowerCase();

    switch (lcUnit) {
        case 'g':
        case 'gram':
        case 'hg':
        case 'kg':
            return true;
        default:
            return false;
    }
}

function isUSMeasure(unit) {
    let lcUnit = unit.toLowerCase();

    switch (lcUnit) {
        case 'oz':
        case 'ounces':
        case 'cup': 
        case 'cups':
        case 'lb':
            return true;
        default:
            return false;
    }
}

function isSpoon(unit){
    let lcUnit = unit.toLowerCase();

    switch(lcUnit){
        case 'tbsps':
        case 'tbsp':
        case 'tbs':
        case 'tsps':
        case 'tsp':
            return true;
        default: return false;
    }
}