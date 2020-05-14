import React from 'react';
import _ from 'underscore';

class ShoppingList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            meals: [],
            ingredients: {},
        }
        this.getIngredients = this.getIngredients.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            if (prevProps.units !== this.props.units) {
                return;
            }
            else {
                this.getIngredients()
            }
        }
    }

    getIngredients() {
        let meals = [];
        let ingredients = [];
        this.props.days.forEach(day => {
            Object.entries(day.meals).map((meal) => {
                if (!meal[1].disabled) {
                    meals.push(meal[1].meal)
                }
            })
        });

        meals.forEach(meal => {
            if (meal !== undefined && meal.extendedIngredients) {
                meal.extendedIngredients.forEach(ingredient => {
                    let oldIngredient = ingredients.find(i => i.name === ingredient.name);
                    if (oldIngredient !== undefined) {
                        oldIngredient.amount += ingredient.amount;
                        oldIngredient.measures.metric.amount += ingredient.measures.metric.amount;
                        oldIngredient.measures.us.amount += ingredient.measures.us.amount;
                    } else {
                        ingredients.push(ingredient)
                    }
                })
            }
        })

        const grouped = _.groupBy(ingredients, ingredient =>
            ingredient.aisle.substr(0, ingredient.aisle.indexOf(';') > 0 ?
                ingredient.aisle.indexOf(';') : ingredient.aisle.length));

        this.setState({
            ingredients: grouped
        })

    }

    showIngredientCategories() {
        let groupedIngredients = this.state.ingredients;
        if (!_.isEmpty(groupedIngredients)) {
            return (
                <div className="card-columns">
                    {Object.entries(groupedIngredients).map((group, ingredients) =>
                        <article key={group} className="card shadow-sm">
                            <div className="card-header">
                                {group[0]}
                            </div>
                            <div className="card-body">
                                {this.props.units === 'metric' ? this.showMetricIngredients(group[1]) : this.showIngredients(group[1])}
                            </div>
                        </article>)}
                </div>)
        } else {
            return (
                <div className="alert alert-primary" role="alert">
                    Nothing to shop!
                </div>
            )
        }
    }


    showMetricIngredients(ingredients) {
        return (
            <ul className="list-group list-group-flush">
                {ingredients.map(ingredient => (
                    <li
                        className="list-group-item"
                        key={ingredient.name}>
                        {ingredient.measures.metric.amount} {ingredient.measures.metric.unitShort} {ingredient.name}
                    </li>
                ))
                }
            </ul>
        );
    }

    showIngredients(ingredients) {
        return (
            <ul className="list-group list-group-flush">
                {ingredients.map(ingredient => (
                    <li
                        className="list-group-item"
                        key={ingredient.name}>
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </li>
                ))
                }
            </ul>
        );
    }

    render() {
        const show = this.props.show;
        if (show) {
            return (
                <main className="row">
                    <section className="col-12 p-4">
                        {this.showIngredientCategories()}
                    </section>
                </main>
            );
        } else {
            return null;
        }
    }
} export default ShoppingList;