import React from 'react';
import Meal from './Meal';

class Day extends React.Component {
    render() {
        return (
            <article className="col mb-4">
                <div className="card h-100 shadow-sm">
                    <div className="card-header">
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={() => this.props.removeDay(this.props.id)}>
                            <span
                                aria-hidden="true">
                                &times;
                                </span>
                        </button>
                    </div>
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <Meal
                                units={this.props.units}
                                dishType="breakfast"
                                meal={this.props.meals.breakfast}
                                generateMeal={(dayId, dishType) => this.props.generateMeal(dayId, dishType)}
                                skipMeal={(dayId, dishType) => this.props.skipMeal(dayId, dishType)}
                                id={this.props.id} />
                            <Meal units={this.props.units}
                                dishType="lunch"
                                meal={this.props.meals.lunch}
                                generateMeal={(dayId, dishType) => this.props.generateMeal(dayId, dishType)}
                                skipMeal={(dayId, dishType) => this.props.skipMeal(dayId, dishType)}
                                id={this.props.id} />
                            <Meal
                                units={this.props.units}
                                dishType="dinner"
                                meal={this.props.meals.dinner}
                                generateMeal={(dayId, dishType) => this.props.generateMeal(dayId, dishType)}
                                skipMeal={(dayId, dishType) => this.props.skipMeal(dayId, dishType)}
                                id={this.props.id} />
                        </ul>
                    </div>
                </div>
            </article>
        );
    }

} export default Day;