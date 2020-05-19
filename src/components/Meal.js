import React from 'react';
import { Link } from "react-router-dom";

class Meal extends React.Component {
    render() {
        const disabled = this.props.meal[1].disabled;
        if (disabled) {
            return (
                <li className="list-group-item p-4">
                    <button
                        className="btn btn-lg btn-outline-secondary w-100"
                        onClick={() => this.props.skipMeal(this.props.id, this.props.dishType)}>
                        Eat
                        </button>
                </li>
            );
        } else {
            return (

                <li className="list-group-item p-4">
                    <h6 className="text-center my-2">
                        {this.props.meal[1].recipe.title}
                    </h6>
                    <div className="btn-group w-100 my-2">
                        <button
                            className="btn btn-sm btn-dark"
                            onClick={() => this.props.skipMeal(this.props.id, this.props.dishType)}>
                            Skip
                            </button>
                        <Link
                            className="btn btn-sm btn-info"
                            to={{
                                pathname: '/recipe/',
                                state: {
                                    meal: this.props.meal[1].recipe,
                                    units: this.props.units
                                }
                            }}>
                            Recipe
                            </Link>
                        <button
                            className="btn btn-sm btn-success"
                            onClick={() => this.props.generateMeal(this.props.id, this.props.dishType)}>
                            Hit
                            </button>
                    </div>
                </li>
            );
        }
    }
}

export default Meal;
