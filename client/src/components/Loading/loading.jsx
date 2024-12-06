import React from 'react';
import './loadingStyle.scss';

const Loading = () => {
    return (
        <div className="container__loading">
            <div className="road"></div> {/* Дорога */}
            <div className="bike">
                <div className="wheel front"></div>
                <div className="wheel back"></div>
                <div className="frame"></div>
            </div>
        </div>
    );
};

export default Loading;
