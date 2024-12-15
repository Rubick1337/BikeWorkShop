import React, { useState, useEffect } from 'react';
import './ConstructorStyle.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParts, fetchTypes } from '../../store/slice/partSlice';

const BikeConfigurator = () => {
    const dispatch = useDispatch();
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const parts = useSelector(state => state.parts.parts);
    const types = useSelector(state => state.parts.types);

    // Изначально selectedTypePart пустое, его значение будет установлено по первому типу
    const [selectedTypePart, setSelectedTypePart] = useState(null);

    const [selectedParts, setSelectedParts] = useState({
        frame: null,
        wheels: null,
        cockpit: null,
    });

    const [progress, setProgress] = useState(4);

    // Загружаем типы при монтировании компонента
    useEffect(() => {
        dispatch(fetchTypes());
    }, [dispatch]);

    // При загрузке типов, автоматически выбираем первый тип как default
    useEffect(() => {
        if (types && types.length > 0) {
            const defaultType = types.find(type => type.name === 'Frame');  // Ищем тип "Frame"
            setSelectedTypePart(defaultType);  // Устанавливаем его как выбранный тип
        }
    }, [types]);

    // Загружаем детали для выбранного типа
    useEffect(() => {
        if (selectedTypePart && selectedTypePart.id !== null) {
            console.log(`Loading parts for type: ${selectedTypePart.name} with id: ${selectedTypePart.id}`);
            dispatch(fetchParts({ type: selectedTypePart.id }));
        }
    }, [selectedTypePart, dispatch]);

    const updateProgress = () => {
        let newProgress = 4; // начальный прогресс, так как рама уже выбрана

        if (selectedParts.wheels) newProgress += 10;
        if (selectedParts.cockpit) newProgress += 10;

        if (newProgress > 100) newProgress = 100;

        setProgress(newProgress);
    };

    const handlePartSelect = (part) => {
        console.log(`Selected part: ${part.name}, id: ${part.id}, image: ${part.img}`);

        setSelectedParts(prevState => ({
            ...prevState,
            [selectedTypePart.name.toLowerCase()]: apiBaseUrl + part.img,
        }));

        updateProgress();
    };

    const handleTypePartSelect = (typePart) => {
        console.log(`Selected category: ${typePart.name} with id: ${typePart.id}`);
        setSelectedTypePart(typePart);  // Обновляем выбранную категорию с id
    };

    return (
        <div className="bike-configurator">
            <div className="sidebar">
                <h2>2024 Juliana</h2>
                <h1>Furtado</h1>
                <p>{progress}% Complete</p>
                <ul className="categories">
                    {types && types.length > 0 ? (
                        types.filter(type => ['Frame', 'Wheels', 'Cockpit'].includes(type.name)).map((typePart, index) => (
                            <li key={index}>
                                <div
                                    className={`category ${selectedTypePart?.id === typePart.id ? 'active' : ''}`}
                                    onClick={() => handleTypePartSelect(typePart)} // передаем id типа при выборе категории
                                >
                                    {typePart.name}
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>Loading categories...</p>
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
                        {selectedParts.wheels && (
                            <img src={selectedParts.wheels} alt="Wheels" className="part-overlay wheels front" />
                        )}
                        {selectedParts.cockpit && (
                            <img src={selectedParts.cockpit} alt="Cockpit" className="part-overlay cockpit" />
                        )}
                    </div>
                </div>
            </div>

            <div className="thumbnail-carousel">
                {parts && parts.length > 0 ? (
                    parts.map((part, index) => (
                        <div
                            key={index}
                            className="thumbnail"
                            style={{ backgroundImage: `url(${apiBaseUrl}${part.img})` }}
                            onClick={() => handlePartSelect(part)} // Обновляем выбранную деталь
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
