import React from 'react';
import {Route, Routes } from 'react-router-dom'; // Импортируем Router, Route и Routes
import Header from './components/Header/header';

const App = () => {
    return (
            <div className="App">
                <Header />
                <main>
                    <Routes>
                    </Routes>
                </main>
            </div>
    );
};

export default App;
