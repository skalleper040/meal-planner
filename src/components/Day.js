import React from 'react';

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
                        {this.props.children}
                        </ul>
                    </div>
                </div>
            </article>
        );
    }

} export default Day;