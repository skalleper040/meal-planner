import React from 'react';
import Day from './Day';

class Days extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            days: this.props.days || []
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
            <Day key={'day' + day.id} units={this.props.units} id={day.id} removeDay={this.removeDay} saveDay={this.saveDay} meals={day.meals}></Day>
        );
    }

    render() {
        return (
            <main className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 px-2 mt-4 justify-content-start">
                {this.createDays()}
                <article className="col">
                    <div className="card">
                        <button className="btn btn-secondary btn-lg btn-block" onClick={this.addDay}>Add day</button>
                    </div>
                </article>
            </main>
        );
    }
} export default Days;