import React from 'react';
import Ingredient from './Ingredient';
import RecipeBadge from './RecipeBadge';
import RecipeInstruction from './RecipeInstruction'
import '../App.css';

function Recipe(props) {
    const meal = props.location.state.meal
    const units = props.location.state.units
    return (
        <div className="modal d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-xl shadow-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{meal.title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.history.goBack}>
                            <span aria-hidden="true">&times;</span>
                        </button>

                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <RecipeBadge
                                    title={meal.readyInMinutes}
                                    value={meal.readyInMinutes}
                                    icon="fa fa-clock-o"
                                    color="blue"
                                />
                                <RecipeBadge
                                    title={meal.servings}
                                    value={meal.servings}
                                    icon="fa fa-cutlery"
                                    color="blue"
                                />
                                <RecipeBadge
                                    title="Vegetarian"
                                    value={meal.vegetarian}
                                    color="green"
                                />
                                <RecipeBadge
                                    title="Vegan"
                                    value={meal.vegan}
                                    color="green"
                                />
                                <RecipeBadge
                                    title="Gluten free"
                                    value={meal.glutenFree}
                                    color="green"
                                />
                            </div>
                            <div className="row">
                                <div className="col-lg-4 col-sm-12">
                                    <h6>Ingredients</h6>
                                    <ul className="list-group list-group-flush">
                                        {meal.extendedIngredients.map((ingredient, i) => (
                                            <Ingredient key={ingredient.name} ingredient={ingredient} units={units} />
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-lg-8 col-sm-12">
                                    <h6>Instructions</h6>
                                    <ol className="list-group list-group-flush">
                                        {meal.analyzedInstructions[0].steps.map((instruction, i) => (
                                            <RecipeInstruction key={i} i={i} step={instruction.step} />
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} export default Recipe;
