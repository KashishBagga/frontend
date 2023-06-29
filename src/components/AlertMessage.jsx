import React from 'react';

function AlertMessage({ message, messageType }) {
    return (
        <div className={`alert alert-${messageType}`} role="alert">
            {message}
        </div>
    );
}

export default AlertMessage;
