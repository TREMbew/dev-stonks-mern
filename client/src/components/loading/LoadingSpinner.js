import React from 'react';
import loadingSpinnerGif from './loadingSpinner.gif'


const LoadingSpinner = () => {
    return (
        <img
            src={loadingSpinnerGif}
            style={{ display: "block", width: "200px", margin: "auto" }}
            alt="Loading..."
        />
    )
}

export default LoadingSpinner
