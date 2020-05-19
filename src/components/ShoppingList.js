import React from 'react';
import _ from 'underscore';
import IngredientGroup from './IngredientGroup';

class ShoppingList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            meals: [],
            ingredients: {},
        }
        this.getIngredients = this.getIngredients.bind(this);
    }

    componentDidMount() {
        this.getIngredients();
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

    async getIngredients() {
        let meals = this.produceMeals();
        let ingredients = this.produceIngredients(meals);
        ingredients.sort(function (a, b) {
            return (a.name > b.name) ? 1 : (b.name > a.name ? -1 : 0);
        });
        let groups = this.produceGroups(ingredients);
        this.setState({
            ingredients: groups
        })

    }

    produceMeals() {
        const days = JSON.parse(JSON.stringify(this.props.days));
        let meals = [];

        days.forEach(day => {
            Object.entries(day.meals).map((meal) => {
                if (!meal[1].disabled) {
                    meals.push(meal[1].recipe)
                }
            })
        });
        return meals;
    }

    produceIngredients(meals) {
        let ingredients = [];

        meals.forEach(meal => {
            if (!_.isUndefined(meal) && !_.isUndefined(meal.extendedIngredients)) {
                meal.extendedIngredients.forEach(ingredient => {
                    let existingIngredient = ingredients.find(i => i.id === ingredient.id)
                    if (!_.isUndefined(existingIngredient)) {
                        existingIngredient.amount += ingredient.amount;
                        existingIngredient.measures.metric.amount += ingredient.measures.metric.amount;
                        existingIngredient.measures.us.amount += ingredient.measures.us.amount;
                    } else {
                        ingredients.push(ingredient);
                    }
                })
            }
        })
        return ingredients;
    }

    produceGroups(ingredients) {
        return _.groupBy(ingredients, function (ingredient) {
            let group;
            if (!_.isNull(ingredient.aisle)) {
                group = ingredient.aisle.substr(0, ingredient.aisle.indexOf(';') > 0 ?
                    ingredient.aisle.indexOf(';') : ingredient.aisle.length);
            } else {
                group = '?'
            }
            return group;
        });
    }

    render() {
        return (
            <main className="row">
                <section className="col-12 p-4">
                    {!_.isEmpty(this.state.ingredients) ? (
                        <div className="card-columns">
                            {Object.entries(this.state.ingredients).sort().map((group) =>
                                <IngredientGroup key={group[0]} group={group} units={this.props.units} />
                            )}
                        </div>
                    ) : (
                            <div className="alert alert-primary" role="alert">
                                Nothing to shop!
                            </div>
                        )
                    }
                </section>
            </main>
        );
    }
} export default ShoppingList;