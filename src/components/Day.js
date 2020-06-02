import React from 'react';

function Day(props) {
    return (
        <article className="col-12 mb-4">
            <div className="card h-100 shadow-sm">
                <div className="card-header">
                    <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={() => props.removeDay(props.id)}>
                        <span
                            aria-hidden="true">
                            &times;
                                </span>
                    </button>
                </div>
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        {props.children}
                    </ul>
                </div>
            </div>
        </article>
    );
} export default Day;