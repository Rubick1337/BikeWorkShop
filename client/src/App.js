import React from 'react';
import {Route, Routes } from 'react-router-dom'; // Импортируем Router, Route и Routes
import Header from './components/Header/header';
import Footer from "./components/Footer/footer";
import "./scrollbar/styleScrollbar.scss"
import Registration from "./components/Registration/registration";
import Authorization from "./components/Authorization/authorization";

const App = () => {
    return (
            <div className="App">
                <Header />
                <main>
                    <Authorization></Authorization>
                    <Routes>
                    </Routes>
                </main>
                <Footer />
            </div>
    );
};

export default App;
