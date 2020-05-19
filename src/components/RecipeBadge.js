import React from 'react';

function RecipeBadge(props) {
    const value = (props.value)
    const color = (props.color === 'green' ? 'badge m-1 badge-success' : 'badge m-1 badge-primary')
    const title = (props.title)
    const icon = (props.icon)

    if (value) {
        return (
            <span className={color}>
                {icon !== undefined ? <i className={icon}/> : null} {title}
            </span>
        );
    }
    else {
        return null;
    }
} export default RecipeBadge;