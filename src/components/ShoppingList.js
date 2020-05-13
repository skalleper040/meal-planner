import React from 'react';

class ShoppingList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            meals: [],
            ingredients: {}
        }
        this.getIngredients = this.getIngredients.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.getIngredients()
        }
    }

    getIngredients() {
        let meals = [];
        this.props.days.forEach(day => {
            console.log(day)
            meals.push(day.meals.breakfast.meal)
            meals.push(day.meals.lunch.meal)
            meals.push(day.meals.dinner.meal)
        });
        console.log(meals)

        let mapIngredients = new Map();

        meals.forEach(meal => {
            if (meal) {
                meal.extendedIngredients.forEach(ingredient => {
                    if (mapIngredients.get(ingredient.name) !== undefined) {
                        let tmpValue = mapIngredients.get(ingredient.name)
                        mapIngredients.set(ingredient.name, { amount: (tmpValue.amount + ingredient.amount), unit: ingredient.unit })
                    } else {
                        mapIngredients.set(ingredient.name, { amount: ingredient.amount, unit: ingredient.unit  })
                    }
                })
            }
        })
        console.log(mapIngredients)
        this.setState({
            ingredients: mapIngredients
        })
    }

    showIngredients() {
        const ingredients = this.state.ingredients
        return (
            <ul>
                {[...this.state.ingredients.keys()].map((ingredient) => (
                    <li key={ingredient}>{this.state.ingredients.get(ingredient).amount} {this.state.ingredients.get(ingredient).unit} {ingredient}</li>
                ))}
            </ul>
        );
    }
    render() {
        const show = this.props.show;
        if (show) {
            return (
                <div>
                    {this.showIngredients()}
                </div>
            );
        } else {
            return null;
        }
    }
} export default ShoppingList;