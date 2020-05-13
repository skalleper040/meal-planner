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
            <div className="border p-0 m-0 rounded bg-light shadow-sm">
                <div className="row justify-content-end no-gutters">
                    <button type="button" className="close m-2" data-dismiss="modal" aria-label="Close" onClick={this.handleRemove}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="row no-gutters border-top rounded">
                    <Meal units={this.props.units} dishType="breakfast" saveMeal={this.saveMeal} meal={this.props.meals.breakfast}></Meal>
                </div>
                <div className="row no-gutters border-top rounded">
                    <Meal units={this.props.units} dishType="lunch" saveMeal={this.saveMeal} meal={this.props.meals.lunch}></Meal>
                </div>
                <div className="row no-gutters border-top rounded">
                    <Meal units={this.props.units} dishType="dinner" saveMeal={this.saveMeal} meal={this.props.meals.dinner}></Meal>
                </div>
            </div>
        );
    }

} export default Day;