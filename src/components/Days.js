import React, { useState, useEffect } from 'react';
import Day from './Day';

function Days(props) {
    const [state, setState] = useState(props);
    useEffect(() => {
        setState(props);
    }, [props]);

    return (
        <main className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 px-2 mt-4 justify-content-start">
            {state.days.map((day) =>
                    <Day
                        key={'day' + day.id}
                        units={state.units}
                        id={day.id}
                        removeDay={(id) => state.removeDay(id)}
                        meals={day.meals}
                        generateMeal={(dayId, dishType) => state.generateMeal(dayId, dishType)}
                        skipMeal={(dayId, dishType) => state.skipMeal(dayId, dishType)} />
                )
            }
            <article className="col">
                <div className="card">
                    <button
                        className="btn btn-secondary btn-lg btn-block"
                        onClick={state.addDay} >
                        Add day
                    </button>
                </div>
            </article>
        </main>
    )
    /*
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
        }*/
} export default Days;