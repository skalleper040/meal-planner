import React from 'react';
import Meal from './Meal';

class Day extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dayName: '',
            breakfast: {},
            lunch: {},
            dinner: {},
            id: this.props.id
        }

        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove() {
        this.props.removeDay(this.state.id);
    }

    render() {
        return (
            <div className="border p-0 m-0 rounded">
                <span className="text-danger p-2">
                    <i onClick={this.handleRemove} className="fa fa-times" id="remove"></i>
                </span>
                <div className="row no-gutters border-top rounded">
                    <Meal dishType="breakfast"></Meal>
                </div>
                <div className="row no-gutters border-top rounded">
                    <Meal dishType="lunch"></Meal>
                </div>
                <div className="row no-gutters border-top rounded">
                    <Meal dishType="dinner"></Meal>
                </div>
            </div>
        );
    }

} export default Day;