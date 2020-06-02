import React from 'react';

function Days(props) {
    return (
        <main className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 px-2 mt-4 justify-content-start">
          {props.children}
            <article className="col-12">
                <div className="card">
                    <button
                        className="btn btn-secondary btn-lg btn-block"
                        onClick={props.addDay} >
                        Add day
                    </button>
                </div>
            </article>
        </main>
    )
} export default Days;