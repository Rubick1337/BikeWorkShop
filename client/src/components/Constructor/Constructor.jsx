import React, { useState, useEffect } from 'react';
import './ConstructorStyle.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParts } from '../../store/slice/partSlice'; // Импортируем асинхронное действие

const BikeConfigurator = () => {
    const dispatch = useDispatch();
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    // Получаем детали из Redux
    const parts = useSelector(state => state.parts.parts);

    const [selectedTypePart, setSelectedTypePart] = useState({
        id: 1, // Начальный тип (например, Frame)
        name: 'Frame',
    });

    const [selectedParts, setSelectedParts] = useState({
        frame: null,
        suspension: null,
        wheels: null,
        drivetrain: null,
        cockpit: null,
        brakes: null,
        accessories: null,
    });

    const [progress, setProgress] = useState(4); // Начальный прогресс

    // Загружаем детали по выбранному типу детали при изменении типа
    useEffect(() => {
        console.log(`Loading parts for type: ${selectedTypePart.name} with id: ${selectedTypePart.id}`); // Логирование типа детали
        dispatch(fetchParts({ type: selectedTypePart.id }));
    }, [selectedTypePart, dispatch]);

    // Логируем массив деталей после их загрузки
    useEffect(() => {
        if (parts && parts.length > 0) {
            console.log('Loaded parts:', parts); // Логирование деталей
        }
    }, [parts]);

    // Обновление прогресса при изменении выбранных частей
    const updateProgress = () => {
        let newProgress = 4; // начальный прогресс

        if (selectedParts.suspension) newProgress += 10;
        if (selectedParts.wheels) newProgress += 2;
        if (selectedParts.drivetrain) newProgress += 10;
        if (selectedParts.cockpit) newProgress += 10;
        if (selectedParts.brakes) newProgress += 10;
        if (selectedParts.accessories) newProgress += 10;

        // Прогресс не может быть больше 100%
        if (newProgress > 100) newProgress = 100;

        setProgress(newProgress);
    };

    // Обработчик выбора части
    const handlePartSelect = (part) => {
        console.log(`Selected part: ${part.name}, id: ${part.id}, image: ${part.img}`);
        console.log(`Full image path: ${apiBaseUrl + part.img}`);

        // Обновляем состояние, сохраняя полный путь к изображению
        setSelectedParts(prevState => ({
            ...prevState,
            [selectedTypePart.name.toLowerCase()]: apiBaseUrl + part.img,  // Обновляем путь к изображению
        }));

        updateProgress();  // Обновляем прогресс
    };

    // Обработчик выбора категории детали
    const handleTypePartSelect = (typePart) => {
        console.log(`Selected category: ${typePart.name}, id: ${typePart.id}`);
        setSelectedTypePart(typePart); // Устанавливаем выбранный тип детали
    };

    return (
        <div className="bike-configurator">
            <div className="sidebar">
                <h2>2024 Juliana</h2>
                <h1>Furtado</h1>
                <p>{progress}% Complete</p> {/* Отображаем прогресс */}
                <ul className="categories">
                    {['Frame', 'Wheels', 'Suspension', 'Drivetrain', 'Cockpit', 'Brakes', 'Accessories'].map((typePart, index) => (
                        <li key={index}>
                            <div
                                className={`category ${selectedTypePart.name === typePart ? 'active' : ''}`}
                                onClick={() => handleTypePartSelect({ id: index + 1, name: typePart })}
                            >
                                {typePart}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="main-content">
                <div className="bike-image">
                    <div
                        className="frame-container"
                        style={{
                            backgroundImage: selectedParts.frame ? `url(${selectedParts.frame})` : '',
                        }}
                    >
                        {/* Для других частей: подвеска, колеса, трансмиссия и т.д. */}
                        {selectedParts.suspension &&
                            <img src={selectedParts.suspension} alt="Suspension" className="part-overlay suspension"/>}
                        {selectedParts.wheels && (
                            <>
                                <img src={selectedParts.wheels} alt="Front Wheel" className="part-overlay wheels front"/>
                                <img src={selectedParts.wheels} alt="Rear Wheel" className="part-overlay wheels rear"/>
                            </>
                        )}
                        {selectedParts.drivetrain &&
                            <img src={selectedParts.drivetrain} alt="Drivetrain" className="part-overlay drivetrain"/>}
                        {selectedParts.cockpit &&
                            <img src={selectedParts.cockpit} alt="Cockpit" className="part-overlay cockpit"/>}
                        {selectedParts.brakes &&
                            <img src={selectedParts.brakes} alt="Brakes" className="part-overlay brakes"/>}
                        {selectedParts.accessories &&
                            <img src={selectedParts.accessories} alt="Accessories" className="part-overlay accessories"/>}
                    </div>
                </div>
            </div>

            <div className="thumbnail-carousel">
                {/* Проверка статуса загрузки данных */}
                {parts && parts.length > 0 ? (
                    parts.map((part, index) => (
                        <div
                            key={index}
                            className="thumbnail"
                            style={{backgroundImage: `url(${apiBaseUrl}${part.img})`}}
                            onClick={() => handlePartSelect(part)}
                        ></div>
                    ))
                ) : (
                    <p>Parts not found</p>
                )}
            </div>
        </div>
    );
};

export default BikeConfigurator;
