import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './ErrorDisplay.css';

const ErrorDisplay: React.FC = () => {
    const errorMessage = useSelector((state: RootState) => state.error.errorMessage);

    return errorMessage ? (
        <div className="error-message">
            <p>{errorMessage}</p>
        </div>
    ) : null;
};

export default ErrorDisplay;
