import React, { useEffect } from 'react';
import marker from  "../../images/marker.png"
import "./MapStyle.scss"
const Map = () => {
    useEffect(() => {
        // Проверяем, загружено ли API Яндекс.Карт
        if (window.ymaps) {
            window.ymaps.ready(() => {
                const cord = [53.9080520193559, 30.3440202444921];

                // Создаём карту
                const map = new window.ymaps.Map("map", {
                    center: cord,
                    zoom: 18,
                });

                // Путь к изображению метки
                const markerImagePath = marker; // убедитесь, что этот путь правильный

                // Создаём метку
                const placemark = new window.ymaps.Placemark(
                    cord,
                    {
                        balloonContentHeader: "БЕЛОРУССКО-РОССИЙСКИЙ УНИВЕРСИТЕТ",
                        balloonContentBody: "Лучший университет",
                        balloonContentFooter:
                            "<a href='http://bru.by/?ysclid=lv9kj2s9ku301248247'>http://bru.by/?ysclid=lv9kj2s9ku301248247</a>",
                    },
                    {
                        iconLayout: "default#image",
                        iconImageHref: markerImagePath, // проверяем путь к изображению
                        iconImageSize: [40, 40],
                        iconImageOffset: [-20, -20],
                    }
                );

                // Убираем стандартные элементы управления картой
                map.controls.remove("geolocationControl");
                map.controls.remove("searchControl");
                map.controls.remove("trafficControl");
                map.controls.remove("typeSelector");
                map.controls.remove("fullscreenControl");
                map.controls.remove("zoomControl");
                map.controls.remove("rulerControl");

                // Добавляем метку на карту
                map.geoObjects.add(placemark);

                // Открываем балун при добавлении метки
                placemark.balloon.open();
            });
        }
    }, []);

    return (
        <div id="map" className="map"></div>
    );
}

export default Map;
