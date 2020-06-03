import React from 'react';
import { Link } from "react-router-dom";

function Meal(props) {
    const disabled = props.meal[1].disabled;

    if (disabled) {
        return (
            <li className="list-group-item p-4">
                <button
                    className="btn btn-lg btn-outline-secondary w-100"
                    onClick={() => props.skipMeal(props.id, props.dishType)}>
                    Eat
                        </button>
            </li>
        );
    } else {
        return (

            <li className="list-group-item p-4">
                <img src={props.meal[1].recipe.image} className="rounded img-fluid"></img>
                <h6 className="text-center my-2">
                    {props.meal[1].recipe.title}
                </h6>
                <div className="btn-group w-100 my-2">
                    <button
                        className="btn btn-sm btn-dark"
                        onClick={() => props.skipMeal(props.id, props.dishType)}>
                        Skip
                            </button>
                    <Link
                        className="btn btn-sm btn-info"
                        to={{
                            pathname: '/recipe/',
                            state: {
                                meal: props.meal[1].recipe,
                                units: props.units
                            }
                        }}>
                        Recipe
                            </Link>
                    <button
                        className="btn btn-sm btn-success"
                        onClick={() => props.generateMeal(props.id, props.dishType)}>
                        Hit
                            </button>
                </div>
            </li>
        );
    }
}
export default Meal;
