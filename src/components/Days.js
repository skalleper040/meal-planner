import React from 'react';
import Day from './Day';

class Days extends React.Component {

    constructor(props) {
        super(props);
        this.createDays = this.createDays.bind(this);
    }

    createDays() {
        return this.props.days.map((day) =>
            <Day
                key={'day' + day.id}
                units={this.props.units}
                id={day.id}
                removeDay={(id) => this.props.removeDay(id)}
                meals={day.meals}
                generateMeal={(dayId, dishType) => this.props.generateMeal(dayId, dishType)}
                skipMeal={(dayId, dishType) => this.props.skipMeal(dayId, dishType)} />
        );
    }

    render() {
        return (
            <main className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 px-2 mt-4 justify-content-start">
                {this.createDays()}
                <article className="col">
                    <div className="card">
                        <button
                            className="btn btn-secondary btn-lg btn-block"
                            onClick={this.props.addDay} >
                            Add day
                            </button>
                    </div>
                </article>
            </main>
        );
    }
} export default Days;