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
        this.saveDay = this.saveDay.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.days !== this.state.days) {
            this.props.saveDays(this.state.days)
        }
    }

    addDay() {
        this.setState({
            days: this.state.days.concat({
                meals: {
                    breakfast: {},
                    lunch: {},
                    dinner: {}
                },
                id: this.state.counter
            }),
            counter: this.state.counter + 1
        });
    }

    removeDay(id) {
        var tempDays = this.state.days;
        var index = tempDays.findIndex(day => day.id === id);
        if (index !== -1) {
            tempDays.splice(index, 1);
            this.setState({ days: tempDays });
        }
    }

    saveDay(dayToSave) {
        var tempDays = this.state.days;
        var index = tempDays.findIndex(day => day.id === dayToSave.id);
        tempDays[index] = dayToSave;
        this.setState({ days: tempDays });
    }

    createDays() {
        return this.state.days.map((day) =>
            <div className="col-12 col-md-4 mt-4" key={day.id}>
                <Day id={day.id} removeDay={this.removeDay} saveDay={this.saveDay} meals={day.meals}></Day>
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