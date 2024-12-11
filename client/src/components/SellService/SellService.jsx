// src/components/SellService.js
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices, fetchCategories, fetchTypes, fetchDeleteService, createService, fetchEditService } from '../../store/slice/serviceSlice';
import { Pagination } from '@mui/material';
import FilterMenu from '../SellBike/FilterMenu';
import CreateServiceDialog from './CreateServiceDialog';
import DeleteServiceDialog from './DeleteServiceDialog';
import EditServiceDialog from './EditServiceDialog';
import Service from './Service';
import "../SellBike/SellBikeStyle.scss";
import CustomAlert from "../CustomAlert/CustomAlert";

export default function SellService() {
    const dispatch = useDispatch();
    const { services, categories, types, totalCount, noServicesMessage, status } = useSelector((state) => state.services);
    const { user, isAuth } = useSelector((state) => state.auth);

    const [sortOrder, setSortOrder] = useState('expensive');
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [page, setPage] = useState(1);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);

    const [alertOpen, setAlertOpen] = useState(false);  // Состояние для открытия alert
    const [alertMessage, setAlertMessage] = useState('');  // Сообщение alert
    const [alertSeverity, setAlertSeverity] = useState('');  // Тип alert: success или error

    const filterRef = useRef(null);
    const limit = 5;

    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [newServiceData, setNewServiceData] = useState({
        id_type_service: "",
        id_category_service: "",
        name: "",
        price: "",
        description: "",
        inSell: true,
    });

    const filteredServices = services.filter(service => {
        // Фильтрация по inSell для клиентов
        if (user.role === 'клиент' && service.inSell === false) {
            return false;
        }
        return true;
    });

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
        dispatch(fetchServices({ sortOrder: event.target.value, searchQuery, category: selectedCategory, type: selectedType, minPrice, maxPrice, page, limit }));
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        dispatch(fetchServices({ sortOrder, searchQuery: event.target.value, category: selectedCategory, type: selectedType, minPrice, maxPrice, page, limit }));
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        dispatch(fetchServices({ sortOrder, searchQuery, category: event.target.value, type: selectedType, minPrice, maxPrice, page, limit }));
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
        dispatch(fetchServices({ sortOrder, searchQuery, category: selectedCategory, type: event.target.value, minPrice, maxPrice, page, limit }));
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
        dispatch(fetchServices({ sortOrder, searchQuery, category: selectedCategory, type: selectedType, minPrice, maxPrice, page: value, limit }));
    };

    const handleDeleteClick = (id) => {
        setServiceToDelete(id);
        setOpenDeleteDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDeleteDialog(false);
        setServiceToDelete(null);
    };

    const handleConfirmDelete = async () => {
        try {
            await dispatch(fetchDeleteService(serviceToDelete));
            dispatch(fetchServices({ sortOrder, searchQuery, category: selectedCategory, type: selectedType, minPrice, maxPrice, page, limit }));
            handleCloseDialog();
        } catch (error) {
            console.error("Ошибка при удалении сервиса:", error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        dispatch(fetchServices({ sortOrder, searchQuery, category: selectedCategory, type: selectedType, minPrice, maxPrice, page, limit }));
        dispatch(fetchCategories());
        dispatch(fetchTypes());
    }, [dispatch, sortOrder, searchQuery, selectedCategory, selectedType, minPrice, maxPrice, page, limit]);

    const getCategoryName = (id) => {
        const category = categories.find(category => category.id === id);
        return category ? category.name : 'Неизвестно';
    };

    const getTypeName = (id) => {
        const type = types.find(type => type.id === id);
        return type ? type.name : 'Неизвестно';
    };

    const handleFilterClick = (event) => {
        event.stopPropagation();
    };

    const pageCount = Math.ceil(totalCount / limit);

    const handleOpenCreateDialog = () => {
        setOpenCreateDialog(true);
    };

    const handleCloseCreateDialog = () => {
        setOpenCreateDialog(false);
    };

    const handleCreateServiceChange = (event) => {
        const { name, value } = event.target;
        setNewServiceData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCreateServiceSubmit = async () => {
        // Валидация формы перед отправкой
        if (!newServiceData.name || !newServiceData.price || !newServiceData.description || !newServiceData.id_category_service || !newServiceData.id_type_service) {
            setAlertMessage('Введите все поля');
            setAlertSeverity('error');
            setAlertOpen(true);  // Показываем alert
            return;
        }
        if (!newServiceData.img) {
            setAlertMessage('Загрузите фото');
            setAlertSeverity('error');
            setAlertOpen(true);  // Показываем alert
            return;
        }

        const formData = new FormData();
        formData.append('name', newServiceData.name);
        formData.append('price', newServiceData.price);
        formData.append('description', newServiceData.description);
        formData.append('id_category_service', newServiceData.id_category_service);
        formData.append('id_type_service', newServiceData.id_type_service);
        formData.append('inSell', newServiceData.inSell);
        if (newServiceData.img) {
            formData.append('img', newServiceData.img);
        }

        try {
            await dispatch(createService(formData));
            dispatch(fetchServices({ sortOrder, searchQuery, category: selectedCategory, type: selectedType, minPrice, maxPrice, page, limit }));
            handleCloseCreateDialog();
        } catch (error) {
            console.error("Ошибка при создании сервиса:", error);
            alert('Ошибка при создании сервиса. Попробуйте позже.');
        }
    };

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [serviceToEdit, setServiceToEdit] = useState(null);

    const handleEditClick = (service) => {
        setServiceToEdit(service);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setServiceToEdit(null);
    };

    const handleEditServiceSubmit = async (editedService) => {
        const formData = new FormData();
        formData.append('name', editedService.name);
        formData.append('price', editedService.price);
        formData.append('description', editedService.description);
        formData.append('id_category_service', editedService.id_category_service);
        formData.append('id_type_service', editedService.id_type_service);
        formData.append('inSell', editedService.inSell);

        try {
            await dispatch(fetchEditService(editedService));
            dispatch(fetchServices({
                sortOrder,
                searchQuery,
                category: selectedCategory,
                type: selectedType,
                minPrice,
                maxPrice,
                page,
                limit
            }));

            setOpenEditDialog(false);
            setServiceToEdit(null);
        } catch (error) {
            console.error("Ошибка при редактировании сервиса:", error);
        }
    };
    const handleFileChange = (event) => {
        setNewServiceData((prevData) => ({
            ...prevData,
            img: event.target.files[0]
        }));
    };

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    return (
        <div className="contianer__sell_bike">
            <div className="container__header__sell">
                <div className="Title__header">
                    <h3>Сервисы</h3>
                    {isAuth && (user.role === 'механик' || user.role === 'владелец') ? (
                        <button className="create__buton" onClick={handleOpenCreateDialog}>
                            Добавить сервис
                        </button>
                    ) : null}
                    <CreateServiceDialog
                        open={openCreateDialog}
                        handleClose={handleCloseCreateDialog}
                        newServiceData={newServiceData}
                        handleFileChange={handleFileChange}
                        setNewServiceData={setNewServiceData}
                        handleCreateServiceChange={handleCreateServiceChange}
                        handleCreateServiceSubmit={handleCreateServiceSubmit}
                        categories={categories}
                        types={types}
                    />
                </div>
                <div className="tools">
                    <div className="input__img">
                        <div className="img__search"></div>
                        <input
                            type="text"
                            placeholder="Поиск..."
                            className="input__search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <div className="filer" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                        <div className="img__filter"></div>
                        <h4>Фильтр</h4>
                        {isFilterOpen && (
                            <FilterMenu
                                filterRef={filterRef}
                                handleFilterClick={handleFilterClick}
                                selectedCategory={selectedCategory}
                                handleCategoryChange={handleCategoryChange}
                                categories={categories}
                                selectedType={selectedType}
                                handleTypeChange={handleTypeChange}
                                types={types}
                                minPrice={minPrice}
                                handleMinPriceChange={handleMinPriceChange}
                                maxPrice={maxPrice}
                                handleMaxPriceChange={handleMaxPriceChange}
                                applyFilters={() => {
                                    setIsFilterOpen(false);
                                    dispatch(fetchServices({ sortOrder, searchQuery, category: selectedCategory, type: selectedType, minPrice, maxPrice, page }));
                                }}
                            />
                        )}
                    </div>

                    <div className="container__sort">
                        <h4>Сортировка</h4>
                        <select value={sortOrder} onChange={handleSortChange} className="select__tool">
                            <option value="expensive">Сначала дорогие</option>
                            <option value="cheap">Сначала дешевые</option>
                        </select>
                    </div>
                </div>
            </div>

            {noServicesMessage && <div className="no-services-message">{noServicesMessage}</div>}

            {filteredServices.length === 0 ? (
                <div className="no-items-message">Нет доступных сервисов</div>
            ) : (
                filteredServices.map(service => (
                    <Service
                        key={service.id}
                        service={service}
                        isAuth={isAuth}
                        user={user}
                        handleDeleteClick={handleDeleteClick}
                        handleEditClick={handleEditClick}
                        getCategoryName={getCategoryName}
                        getTypeName={getTypeName}
                    />
                ))
            )}

            <EditServiceDialog
                open={openEditDialog}
                handleClose={handleCloseEditDialog}
                service={serviceToEdit}
                handleEditServiceSubmit={handleEditServiceSubmit}
                categories={categories}
                types={types}
            />

            <div className="pagination">
                <Pagination
                    count={pageCount}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    siblingCount={1}
                    boundaryCount={1}
                />
            </div>
            <DeleteServiceDialog
                open={openDeleteDialog}
                handleClose={handleCloseDialog}
                handleConfirmDelete={handleConfirmDelete}
            />
            <CustomAlert
                open={alertOpen}
                message={alertMessage}
                severity={alertSeverity}
                handleClose={handleCloseAlert}
            />
        </div>
    );
}
