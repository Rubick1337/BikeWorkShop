import React, { useState, useEffect } from 'react';
import './ConstructorStyle.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParts, fetchTypes } from '../../store/slice/partSlice';
import Handels from '../../images/Handl.png';
const typeNameToKey = {
    'Рама': 'frame',
    'Колесо': 'wheels1', // Первое колесо
    'Вилка': 'cockpit',
    'Руль': 'handlebars', // Статичное изображение
    'Крепление седенья': 'seatMount',
    'Сиденье': 'seat',
    // Добавьте другие сопоставления по необходимости
};

const BikeConfigurator = () => {
    const dispatch = useDispatch();
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const parts = useSelector(state => state.parts.parts);
    const types = useSelector(state => state.parts.types);

    const [selectedTypePart, setSelectedTypePart] = useState(null);

    const [selectedParts, setSelectedParts] = useState({
        frame: null,
        wheels1: null,
        wheels2: null,
        cockpit: null,
        handlebars: null, // Руль
        seatMount: null,
        seat: null,
    });

    const [progress, setProgress] = useState(0);

    // Загружаем типы при монтировании компонента
    useEffect(() => {
        dispatch(fetchTypes());
    }, [dispatch]);

    // Устанавливаем тип по умолчанию (например, 'Рама') после загрузки типов
    useEffect(() => {
        if (types && types.length > 0) {
            const defaultType = types.find(type => type.name === 'Рама') || types[0];
            setSelectedTypePart(defaultType);
        }
    }, [types]);

    // Загружаем детали для выбранного типа
    useEffect(() => {
        if (selectedTypePart && selectedTypePart.id !== null) {
            console.log(`Loading parts for type: ${selectedTypePart.name} with id: ${selectedTypePart.id}`);
            dispatch(fetchParts({ type: selectedTypePart.id }));
        }
    }, [selectedTypePart, dispatch]);

    // Обновляем прогресс на основе выбранных частей
    useEffect(() => {
        const totalParts = Object.keys(selectedParts).length;
        const selectedCount = Object.values(selectedParts).filter(part => part !== null && part.length > 0).length;
        const newProgress = Math.round((selectedCount / totalParts) * 100);
        setProgress(newProgress > 100 ? 100 : newProgress);
    }, [selectedParts]);

    const handlePartSelect = (part) => {
        console.log(`Выбрана деталь: ${part.name}, id: ${part.id}, изображение: ${part.img}`);

        // Определяем ключ на основе названия выбранного типа
        const key = selectedTypePart ? typeNameToKey[selectedTypePart.name] : null;

        if (key) {
            if (key === 'wheels1') {
                setSelectedParts(prevState => ({
                    ...prevState,
                    wheels1: `${apiBaseUrl}${part.img}`,
                    wheels2: `${apiBaseUrl}${part.img}`, // Загружаем второе колесо автоматически
                }));
            } else if (key === 'cockpit') {
                setSelectedParts(prevState => ({
                    ...prevState,
                    [key]: `${apiBaseUrl}${part.img}`,
                    handlebars: `${apiBaseUrl}/static/handlebars.png`, // Статичное изображение руля
                }));
            } else {
                setSelectedParts(prevState => ({
                    ...prevState,
                    [key]: `${apiBaseUrl}${part.img}`,
                }));
            }
        } else {
            console.warn(`Не найдено сопоставление для типа: ${selectedTypePart ? selectedTypePart.name : 'null'}`);
        }
    };

    const handleTypePartSelect = (typePart) => {
        console.log(`Выбрана категория: ${typePart.name} с id: ${typePart.id}`);
        setSelectedTypePart(typePart); // Обновляем выбранный тип
    };

    return (
        <div className="bike-configurator">
            <div className="sidebar">
                <h2>2024 Juliana</h2>
                <h1>Furtado</h1>
                <p>{progress}% Complete</p>
                <ul className="categories">
                    {types && types.length > 0 ? (
                        types
                            .filter(type => ['Рама', 'Колесо', 'Вилка', 'Крепление седенья','Сиденье', 'Руль'].includes(type.name))
                            .map((typePart, index) => (
                                <li key={index}>
                                    <div
                                        className={`category ${selectedTypePart?.id === typePart.id ? 'active' : ''}`}
                                        onClick={() => handleTypePartSelect(typePart)}
                                    >
                                        {typePart.name}
                                    </div>
                                </li>
                            ))
                    ) : (
                        <p>Загрузка категорий...</p>
                    )}
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
                        {selectedParts.wheels1 && selectedParts.wheels2 && (
                            <>
                                <img
                                    src={selectedParts.wheels1}
                                    alt="Колесо 1"
                                    className="part-overlay wheels1 front"
                                />
                                <img
                                    src={selectedParts.wheels2}
                                    alt="Колесо 2"
                                    className="part-overlay wheels2 front"
                                />
                            </>
                        )}
                        {selectedParts.cockpit && (
                            <img src={selectedParts.cockpit} alt="Вилка" className="part-overlay cockpit" />
                        )}
                        {selectedParts.handlebars && (
                            <img src={Handels} alt="Руль" className="part-overlay handlebars"/>
                        )}
                        {selectedParts.seatMount && (
                            <img src={selectedParts.seatMount} alt="Крепление седенья" className="part-overlay seat-mount" />
                        )}
                        {selectedParts.seat && (
                            <img src={selectedParts.seat} alt="Сиденье" className="part-overlay seat" />
                        )}
                        {/* Добавьте дополнительные наложения по мере необходимости */}
                    </div>
                </div>
            </div>

            <div className="thumbnail-carousel">
                {parts && parts.length > 0 && selectedTypePart ? (
                    parts.map((part, index) => (
                        <div
                            key={index}
                            className={`thumbnail ${selectedParts[typeNameToKey[selectedTypePart.name]] === `${apiBaseUrl}${part.img}` ? 'selected' : ''}`}
                            style={{ backgroundImage: `url(${apiBaseUrl}${part.img})` }}
                            onClick={() => handlePartSelect(part)}
                        ></div>
                    ))
                ) : (
                    <p>Детали не найдены</p>
                )}
            </div>
        </div>
    );
};

export default BikeConfigurator;
