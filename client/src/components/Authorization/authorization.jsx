import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../../store/slice/authSlice";
import "./authorizationStyle.scss";
import CustomAlert from "../CustomAlert/CustomAlert";
function Authorization() {
    const [passwordVisible, setPasswordVisible] = useState(false);  // Состояние для видимости пароля
    const [password, setPassword] = useState("");  // Состояние для пароля
    const [email, setEmail] = useState("");  // Состояние для email

    const [alertOpen, setAlertOpen] = useState(false);  // Состояние для открытия alert
    const [alertMessage, setAlertMessage] = useState('');  // Сообщение alert
    const [alertSeverity, setAlertSeverity] = useState('');  // Тип alert: success или error

    const dispatch = useDispatch();
    const navigate = useNavigate(); //useNavigate для перехода

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);  // Переключаем видимость пароля
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        const action = await dispatch(login({ email, password }));

        if (login.fulfilled.match(action)) {
            console.log('Авторизация прошла успешно');
            navigate('/'); // Перенаправление на другую страницу после успешного входа
        } else {
            console.error('Не удалось авторизоваться:', action.error);
            setAlertMessage('Неверный email или пароль');
            setAlertSeverity('error');
            setAlertOpen(true);  // Показываем alert
        }
    }

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };
    return (
        <div className="container__padding">
            <div className="container-registration">
                <div className="form-container sign-in-container">
                    <form onSubmit={handleLogin}>
                        <h1>Войти в аккаунт</h1>
                        <span>Пожалуйста, введите свою почту и пароль</span>

                        {/* Ввод email */}
                        <input
                            type="email"
                            placeholder="Электронная почта"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className="password-container">
                            {/* Ввод пароля */}
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className="eye-icon" onClick={togglePasswordVisibility}>
                            {passwordVisible ? <FaEyeSlash/> : <FaEye/>}
                        </span>
                        </div>

                        <button className="custom-button-reg" type="submit">Войти</button>
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1>Нет аккаунта?</h1>
                            <p>Зарегистрируйтесь, чтобы продолжить</p>
                            <Link to="/registration">
                                <button className="ghost custom-button-reg">Зарегистрироваться</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <CustomAlert
                open={alertOpen}
                message={alertMessage}
                severity={alertSeverity}
                handleClose={handleCloseAlert}
            />
            </div>
            );
            }

            export default Authorization;
