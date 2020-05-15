import React from 'react';
import Meal from './Meal';

class Day extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            meals: this.props.meals
        }
        this.handleRemove = this.handleRemove.bind(this);
        this.saveMeal = this.saveMeal.bind(this);
    }

    saveMeal(dishType, meal, disabled) {
        this.setState(prevState => ({
            meals: {
                ...prevState.meals,
                [dishType]: {
                    meal: meal,
                    disabled: disabled
                }
            }
        }))
    }

    handleRemove() {
        this.props.removeDay(this.state.id);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.props.saveDay(this.state);
        }
    }

    render() {
        return (
            <article className="col mb-4">
                <div className="card h-100 shadow-sm">
                    <div className="card-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleRemove}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <Meal units={this.props.units} dishType="breakfast" saveMeal={this.saveMeal} meal={this.props.meals.breakfast}></Meal>
                            <Meal units={this.props.units} dishType="lunch" saveMeal={this.saveMeal} meal={this.props.meals.lunch}></Meal>
                            <Meal units={this.props.units} dishType="dinner" saveMeal={this.saveMeal} meal={this.props.meals.dinner}></Meal>
                        </ul>
                    </div>
                </div>
            </article>
        );
    }

} export default Day;