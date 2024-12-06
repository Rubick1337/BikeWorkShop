import React, {useEffect,useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Route, Routes } from 'react-router-dom'; // Импортируем Router, Route и Routes
import Header from './components/Header/header';
import Footer from "./components/Footer/footer";
import "./scrollbar/styleScrollbar.scss"
import Registration from "./components/Registration/registration";
import Authorization from "./components/Authorization/authorization";
import store from "./store/store";
import { checkAuth } from "./store/slice/authSlice";
import Loading from "./components/Loading/loading";

const App = () => {
    const dispatch = useDispatch();

    const loading = useSelector(state => state.auth.isLoading)
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log("Сработал");
            dispatch(checkAuth()).finally(() => {
                setIsInitialized(true);
            });
        } else {
            setIsInitialized(true); // Если токена нет, сразу инициализируем приложение
        }
    }, [dispatch]);

    if (!isInitialized) {
        return <Loading />
    }

    return (
        <div className="App">
            <Header/>
            <main>
                <Authorization></Authorization>
                <Routes>
                </Routes>
            </main>
            <Footer/>
        </div>
    );
};

export default App;
