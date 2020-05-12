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
                <div className="row justify-content-end no-gutters">
                    <button type="button" className="close m-2" data-dismiss="modal" aria-label="Close" onClick={this.handleRemove}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
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