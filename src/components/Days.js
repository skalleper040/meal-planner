import React from 'react';
import Day from './Day';

class Days extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            days: [],
        }
        this.addDay = this.addDay.bind(this);
        this.removeDay = this.removeDay.bind(this);
    }

    addDay() {
        this.setState({
            days: this.state.days.concat({
                breakfast: '',
                lunch: '',
                dinner: '',
                key: this.state.counter
            }),
            counter: this.state.counter + 1
        });
    }

    removeDay(id) {
        var tempDays = this.state.days;
        var index = tempDays.findIndex(day => day.key === id);
        if (index !== -1) {
            tempDays.splice(index, 1);
            this.setState({ days: tempDays });
        }
    }

    createDays() {
        return this.state.days.map((day) =>
            <div className="col-12 col-md-4 mt-4" key={day.key}>
                <Day id={day.key} removeDay={this.removeDay}></Day>
            </div>
        );
    }

    render() {
        const show = this.props.show;
        if (show) {
            return (
                <div className="row">
                    {this.createDays()}
                    <div className="col-12 col-md-4 p-4 align-items-center">
                        <button className="btn btn-primary mx-auto" onClick={this.addDay}>Add day</button>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
} export default Days;