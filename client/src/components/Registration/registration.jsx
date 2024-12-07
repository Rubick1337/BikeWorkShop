import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./registrationStyle.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { registration } from "../../store/slice/authSlice";

function Registration() {
    const [passwordVisible, setPasswordVisible] = useState(false);  // Состояние для видимости пароля
    const [password, setPassword] = useState("");  // Состояние для пароля
    const [email, setEmail] = useState("");  // Состояние для email
    const [name, setFirstName] = useState("");  // Состояние для имени
    const [surname, setLastName] = useState("");  // Состояние для фамилии
    const [adress, setAddress] = useState("");  // Состояние для адреса
    const role = "клиент"
    const dispatch = useDispatch();
    const navigate = useNavigate(); //useNavigate для перехода
    const error = useSelector(state => state.auth.error); // Получение ошибки из состояния

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);  // Переключаем видимость пароля
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        const action = await dispatch(registration({ email, password, name, surname, adress, role }));
        if (registration.fulfilled.match(action)) {
            console.log('Регистрация прошла успешно');
            navigate('/dashboard'); // Перенаправление на другую страницу после успешной регистрации
        } else {
            // Ошибка будет отображена ниже формы
        }
    }

    return (
        <div className="container-registration">
            <div className="form-container sign-up-container">
                <form onSubmit={handleRegister}>
                    <h1>Создать аккаунт</h1>
                    <span>или используйте вашу почту для регистрации</span>

                    <input
                        type="text"
                        placeholder="Имя"
                        value={name}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Фамилия"
                        value={surname}
                        onChange={(e) => setLastName(e.target.value)}
                        />
                    <input
                        type="email"
                        placeholder="Электронная почта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="password-container">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="eye-icon" onClick={togglePasswordVisibility}>
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <input
                        type="text"
                        placeholder="Адрес"
                        value={adress}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <button className="custom-button" type="submit">Зарегистрироваться</button>

                        {error && <p className="error-message">{error}</p>} {/* Отображение ошибки */}
                </form>
            </div>

            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-right">
                        <h1>Добро пожаловать обратно!</h1>
                        <p>Чтобы продолжить, войдите с вашими личными данными</p>
                        <Link to="/login">
                            <button className="ghost custom-button">Войти</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;