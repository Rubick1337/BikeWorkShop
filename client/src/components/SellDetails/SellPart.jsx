// src/components/SellPart.js
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParts, fetchCategories, fetchTypes, fetchDeletePart, createPart, fetchEditPart } from '../../store/slice/partSlice';
import { Pagination } from '@mui/material';
import FilterMenu from '../SellBike/FilterMenu';
import CreatePartDialog from './CreatePartDialog';
import DeletePartDialog from './DeletePartDialog';
import EditPartDialog from './EditPartDialog';
import Part from './Part';
import "../SellBike/SellBikeStyle.scss";
import CustomAlert from "../CustomAlert/CustomAlert";
import PdfBikeButton from "../PdfBikeButton/PdfBikeButton";
import PdfPartButton from "../PdfPartButton/PdfPartButton";

export default function SellPart() {
    const dispatch = useDispatch();
    const { parts, categories, types, totalCount, noPartsMessage, status } = useSelector((state) => state.parts);
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
    const [partToDelete, setPartToDelete] = useState(null);

    const [alertOpen, setAlertOpen] = useState(false);  // Состояние для открытия alert
    const [alertMessage, setAlertMessage] = useState('');  // Сообщение alert
    const [alertSeverity, setAlertSeverity] = useState('');  // Тип alert: success или error


    const filterRef = useRef(null);
    const limit = 5;

    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [newPartData, setNewPartData] = useState({
        id_type_part: "",
        id_category_part: "",
        name: "",
        price: "",
        model: "",
        description: "",
        brand: "",
        inSell: true,
        img: null
    });

    const filteredParts = parts.filter(part => {
        // Фильтрация по inSell для клиентов
        if (user.role === 'клиент' && part.inSell === false) {
            return false;
        }
        return true;
    });

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
        dispatch(fetchParts({ sortOrder: event.target.value, searchQuery, category: selectedCategory, type: selectedType, minPrice, maxPrice, page, limit }));
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        dispatch(fetchParts({ sortOrder, searchQuery: event.target.value, category: selectedCategory, type: selectedType, minPrice, maxPrice, page, limit }));
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        dispatch(fetchParts({ sortOrder, searchQuery, category: event.target.value, type: selectedType, minPrice, maxPrice, page, limit }));
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
        dispatch(fetchParts({ sortOrder, searchQuery, category: selectedCategory, type: event.target.value, minPrice, maxPrice, page, limit }));
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
        dispatch(fetchParts({ sortOrder, searchQuery, category: selectedCategory, type: selectedType, minPrice, maxPrice, page: value, limit }));
    };

    const handleDeleteClick = (id) => {
        setPartToDelete(id);
        setOpenDeleteDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDeleteDialog(false);
        setPartToDelete(null);
    };

    const handleConfirmDelete = async () => {
        try {
            await dispatch(fetchDeletePart(partToDelete));
            dispatch(fetchParts({ sortOrder, searchQuery, category: selectedCategory, type: selectedType, minPrice, maxPrice, page, limit }));
            handleCloseDialog();
        } catch (error) {
            console.error("Ошибка при удалении детали:", error);
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
        dispatch(fetchParts({ sortOrder, searchQuery, category: selectedCategory, type: selectedType, minPrice, maxPrice, page, limit }));
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

    const handleCreatePartChange = (event) => {
        const { name, value } = event.target;
        setNewPartData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (event) => {
        setNewPartData((prevData) => ({
            ...prevData,
            img: event.target.files[0]
        }));
    };

    const handleCreatePartSubmit = async () => {
        if (!newPartData.name || !newPartData.price || !newPartData.model || !newPartData.brand || !newPartData.id_category_part || !newPartData.id_type_part) {
            setAlertMessage('Введите все поля');
            setAlertSeverity('error');
            setAlertOpen(true);  // Показываем alert
            return;
        }
        if (!newPartData.img) {
            setAlertMessage('Загрузите фото');
            setAlertSeverity('error');
            setAlertOpen(true);  // Показываем alert
            return;
        }
        const formData = new FormData();
        formData.append('name', newPartData.name);
        formData.append('price', newPartData.price);
        formData.append('model', newPartData.model);
        formData.append('brand', newPartData.brand);
        formData.append('id_category_part', newPartData.id_category_part);
        formData.append('id_type_part', newPartData.id_type_part);
        formData.append("description", newPartData.description);
        formData.append('inSell', newPartData.inSell);
        formData.append('img', newPartData.img);

        try {
            await dispatch(createPart(formData));
            dispatch(fetchParts({ sortOrder, searchQuery, category: selectedCategory, type: selectedType, minPrice, maxPrice, page, limit }));
            handleCloseCreateDialog();
        } catch (error) {
            console.error("Ошибка при создании детали:", error);
        }
    };

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [partToEdit, setPartToEdit] = useState(null);

    const handleEditClick = (part) => {
        setPartToEdit(part);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setPartToEdit(null);
    };

    const handleEditPartSubmit = async (editedPart) => {
        const formData = new FormData();
        formData.append('name', editedPart.name);
        formData.append('price', editedPart.price);
        formData.append('model', editedPart.model);
        formData.append('brand', editedPart.brand);
        formData.append('id_category_part', editedPart.id_category_part);
        formData.append('id_type_part', editedPart.id_type_part);
        formData.append("description", editedPart.description);
        formData.append('inSell', editedPart.inSell);

        if (editedPart.img) {
            formData.append('img', editedPart.img);
        }

        try {
            await dispatch(fetchEditPart(editedPart));
            dispatch(fetchParts({
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
            setPartToEdit(null);
        } catch (error) {
            console.error("Ошибка при редактировании детали:", error);
        }
    };
    const handleCloseAlert = () => {
        setAlertOpen(false);
    };
    return (
        <div className="contianer__sell_bike">
            <div className="container__header__sell">
                <div className="Title__header">
                    <h3>Детали</h3>
                    {isAuth && (user.role === 'механик' || user.role === 'владелец') ? (
                            <div className="create__buton__container">
                        <button className="create__buton" onClick={handleOpenCreateDialog}>
                            Добавить деталь
                        </button>
                                <PdfPartButton
                                    parts={parts}
                                />
                            </div>
                    ) : null}
                    <CreatePartDialog
                        open={openCreateDialog}
                        handleClose={handleCloseCreateDialog}
                        newPartData={newPartData}
                        setNewPartData={setNewPartData}
                        handleCreatePartChange={handleCreatePartChange}
                        handleFileChange={handleFileChange}
                        handleCreatePartSubmit={handleCreatePartSubmit}
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
                                    dispatch(fetchParts({ sortOrder, searchQuery, category: selectedCategory, type: selectedType, minPrice, maxPrice, page }));
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

            {noPartsMessage && <div className="no-bikes-message">{noPartsMessage}</div>}

            {filteredParts.length === 0 ? (
                <div className="no-items-message">В ассортименте пусто</div>
            ) : (
                filteredParts.map(part => (
                    <Part
                        key={part.id}
                        part={part}
                        isAuth={isAuth}
                        user={user}
                        handleDeleteClick={handleDeleteClick}
                        handleEditClick={handleEditClick}
                        getCategoryName={getCategoryName}
                        getTypeName={getTypeName}
                    />
                ))
            )}

            <EditPartDialog
                open={openEditDialog}
                handleClose={handleCloseEditDialog}
                part={partToEdit}
                handleEditPartSubmit={handleEditPartSubmit}
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
            <DeletePartDialog
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
