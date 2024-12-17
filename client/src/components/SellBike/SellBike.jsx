import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBikes, fetchCategories, fetchTypes, fetchDeleteBike, createBike,fetchEditBike} from '../../store/slice/bikeSlice';
import { Pagination } from '@mui/material';
import FilterMenu from './FilterMenu';
import CreateBikeDialog from './CreateBikeDialog';
import DeleteBikeDialog from './DeleteBikeDialog';
import EditBikeDialog from './EditBikeDialog';
import Bike from './Bike';
import "./SellBikeStyle.scss";
import CustomAlert from "../CustomAlert/CustomAlert";
import PdfBikeButton from "../PdfBikeButton/PdfBikeButton";
import CreateCategoryBikeDialog from './CreateCategoryBikeDialog';
import CreateTypeBikeDialog from './CreateTypeBikeDialog';

export default function SellBike() {
    const dispatch = useDispatch();
    const { bikes, categories, types, totalCount, noBikesMessage, status } = useSelector((state) => state.bikes);
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
    const [bikeToDelete, setBikeToDelete] = useState(null);

    const [openCreateCategoryDialog, setOpenCreateCategoryDialog] = useState(false);
    const [openCreateTypeDialog, setOpenCreateTypeDialog] = useState(false);

    const handleOpenCreateCategoryDialog = () => {
        setOpenCreateCategoryDialog(true);
    };

    const handleCloseCreateCategoryDialog = () => {
        setOpenCreateCategoryDialog(false);
    };

    const handleOpenCreateTypeDialog = () => {
        setOpenCreateTypeDialog(true);
    };

    const handleCloseCreateTypeDialog = () => {
        setOpenCreateTypeDialog(false);
    };

    const filterRef = useRef(null);
    const limit = 5;

    const [alertOpen, setAlertOpen] = useState(false);  // Состояние для открытия alert
    const [alertMessage, setAlertMessage] = useState('');  // Сообщение alert
    const [alertSeverity, setAlertSeverity] = useState('');  // Тип alert: success или error

    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [newBikeData, setNewBikeData] = useState({
        id_type_bike: "",
        id_category_bike: "",
        name: "",
        price: "",
        model: "",
        description: "",
        brand: "",
        inSell: true,
        img: null
    });

    const filteredBikes = bikes.filter(part => {
        if (user.role === 'клиент' && part.inSell === false) {
            return false;
        }
        return true;
    });

    const handleSortChange = (event) => {
        const newSortOrder = event.target.value;
        setSortOrder(newSortOrder);
        localStorage.setItem('sortOrder', newSortOrder);
        dispatch(fetchBikes({ sortOrder: newSortOrder, searchQuery, category: selectedCategory, type: selectedType, minPrice, maxPrice, page, limit }));
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        localStorage.setItem('searchQuery', event.target.value);
        dispatch(fetchBikes({ sortOrder, searchQuery: event.target.value, category: selectedCategory, type: selectedType, minPrice, maxPrice, page, limit }));
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        localStorage.setItem('selectedCategory', event.target.value);
        dispatch(fetchBikes({ sortOrder, searchQuery, category: event.target.value, type: selectedType, minPrice, maxPrice, page, limit }));
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
        localStorage.setItem('selectedType', event.target.value);
        dispatch(fetchBikes({ sortOrder, searchQuery, category: selectedCategory, type: event.target.value, minPrice, maxPrice, page, limit }));
    };
    const handleMinPriceChange = (event) => {
        localStorage.setItem('minPrice',event.target.value);
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        localStorage.setItem('maxPrice',event.target.value);
        setMaxPrice(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
        localStorage.setItem('page', value);
        dispatch(fetchBikes({ sortOrder, searchQuery, category: selectedCategory, type: selectedType, minPrice, maxPrice, page: value, limit }));
    };

    const handleDeleteClick = (id) => {
        setBikeToDelete(id);
        setOpenDeleteDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDeleteDialog(false);
        setBikeToDelete(null);
    };

    const handleConfirmDelete = async () => {
        try {
            await dispatch(fetchDeleteBike(bikeToDelete));
            dispatch(fetchBikes({ sortOrder, searchQuery, category: selectedCategory, type: selectedType, minPrice, maxPrice, page, limit }));
            handleCloseDialog();
        } catch (error) {
            console.error("Ошибка при удалении велосипеда:", error);
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
        const savedSortOrder = localStorage.getItem('sortOrder');
        const savedSearchQuery = localStorage.getItem('searchQuery');
        const savedSelectedCategory = localStorage.getItem('selectedCategory');
        const savedSelectedType = localStorage.getItem('selectedType');
        const savedMinPrice = localStorage.getItem('minPrice');
        const savedMaxPrice = localStorage.getItem('maxPrice');
        const savedPage = localStorage.getItem('page');

        if (savedSortOrder) setSortOrder(savedSortOrder);
        if (savedSearchQuery) setSearchQuery(savedSearchQuery);
        if (savedSelectedCategory) setSelectedCategory(savedSelectedCategory);
        if (savedSelectedType) setSelectedType(savedSelectedType);
        if (savedMinPrice) setMinPrice(savedMinPrice);
        if (savedMaxPrice) setMaxPrice(savedMaxPrice);
        if (savedPage) setPage(Number(savedPage));
        dispatch(fetchBikes({ sortOrder, searchQuery, category: selectedCategory, type: selectedType, minPrice, maxPrice, page, limit }));
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

    const handleCreateBikeChange = (event) => {
        const { name, value } = event.target;
        setNewBikeData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (event) => {
        setNewBikeData((prevData) => ({
            ...prevData,
            img: event.target.files[0]
        }));
    };

    const handleCreateBikeSubmit = async () => {
        if (!newBikeData.name || !newBikeData.price || !newBikeData.model || !newBikeData.brand || !newBikeData.id_category_bike || !newBikeData.id_type_bike) {
            setAlertMessage('Введите все поля');
            setAlertSeverity('error');
            setAlertOpen(true);  // Показываем alert
            return;
        }
        if (!newBikeData.img) {
            setAlertMessage('Загрузите фото');
            setAlertSeverity('error');
            setAlertOpen(true);  // Показываем alert
            return;
        }
        console.log("Продажа"+newBikeData.inSell);
        const formData = new FormData();
        formData.append('name', newBikeData.name);
        formData.append('price', newBikeData.price);
        formData.append('model', newBikeData.model);
        formData.append('brand', newBikeData.brand);
        formData.append("description", newBikeData.description);
        formData.append('id_category_bike', newBikeData.id_category_bike);
        formData.append('id_type_bike', newBikeData.id_type_bike);
        formData.append('inSell', newBikeData.inSell);
        formData.append('img', newBikeData.img);

        try {
            await dispatch(createBike(formData));
            dispatch(fetchBikes({ sortOrder, searchQuery, category: selectedCategory, type: selectedType, minPrice, maxPrice, page, limit }));
            handleCloseCreateDialog();
        } catch (error) {
            console.error("Ошибка при создании велосипеда:", error);
        }
    };

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [bikeToEdit, setBikeToEdit] = useState(null);

    const handleEditClick = (bike) => {
        console.log(bike.id);
        setBikeToEdit(bike);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setBikeToEdit(null);
    };

    const handleEditBikeSubmit = async (editedBike) => {
        const formData = new FormData();
        formData.append('name', editedBike.name);
        formData.append('price', editedBike.price);
        formData.append('model', editedBike.model);
        formData.append('brand', editedBike.brand);
        formData.append("description", editedBike.description);
        formData.append('id_category_bike', editedBike.id_category_bike);
        formData.append('id_type_bike', editedBike.id_type_bike);
        formData.append('inSell', editedBike.inSell);

        if (editedBike.img) {
            formData.append('img', editedBike.img);
        }

        try {
            console.log("Передаем велосипед с id:", editedBike.id);
            await dispatch(fetchEditBike(editedBike));

            dispatch(fetchBikes({
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
            setBikeToEdit(null);
        } catch (error) {
            console.error("Ошибка при редактировании велосипеда:", error);
        }
    };

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };
    const handleResetFilters = () => {
        // Reset the state variables to their default values
        setSortOrder('expensive');
        setSearchQuery('');
        setSelectedCategory('');
        setSelectedType('');
        setMinPrice('');
        setMaxPrice('');
        setPage(1);

        // Remove the filter-related variables from localStorage
        localStorage.removeItem('sortOrder');
        localStorage.removeItem('searchQuery');
        localStorage.removeItem('selectedCategory');
        localStorage.removeItem('selectedType');
        localStorage.removeItem('minPrice');
        localStorage.removeItem('maxPrice');
        localStorage.removeItem('page');

        // Fetch the bikes with the reset filters
        dispatch(fetchBikes({
            sortOrder: 'expensive',
            searchQuery: '',
            category: '',
            type: '',
            minPrice: '',
            maxPrice: '',
            page: 1,
            limit: 5
        }));
    };

    return (
        <div className="contianer__sell_bike" id="sellBikeSection">
            <div className="container__header__sell">
                <div className="Title__header">
                    <h3>Велосипеды</h3>
                    {isAuth && (user.role === 'механик' || user.role === 'владелец') ? (
                        <div className="create__buton__container">
                            <button className="create__buton" onClick={handleOpenCreateDialog}>
                                Добавить велосипед
                            </button>
                            <button className="create__buton" onClick={handleOpenCreateCategoryDialog}>
                                Добавить категорию
                            </button>
                            <button className="create__buton" onClick={handleOpenCreateTypeDialog}>
                                Добавить тип
                            </button>
                            <PdfBikeButton
                                bikes={bikes}
                            />
                        </div>
                    ) : null}
                    <CreateBikeDialog
                        open={openCreateDialog}
                        handleClose={handleCloseCreateDialog}
                        newBikeData={newBikeData}
                        setNewBikeData={setNewBikeData}
                        handleCreateBikeChange={handleCreateBikeChange}
                        handleFileChange={handleFileChange}
                        handleCreateBikeSubmit={handleCreateBikeSubmit}
                        categories={categories}
                        types={types}    />
                    <CreateCategoryBikeDialog
                        open={openCreateCategoryDialog}
                        handleClose={handleCloseCreateCategoryDialog}
                    />
                    <CreateTypeBikeDialog
                        open={openCreateTypeDialog}
                        handleClose={handleCloseCreateTypeDialog}
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
                                    dispatch(fetchBikes({
                                        sortOrder,
                                        searchQuery,
                                        category: selectedCategory,
                                        type: selectedType,
                                        minPrice,
                                        maxPrice,
                                        page
                                    }));
                                }}
                            />
                        )}
                    </div>
                    <button className="create__buton" onClick={handleResetFilters}>
                        Сбросить фильтры
                    </button>
                    <div className="container__sort">
                        <h4>Сортировка</h4>
                        <select value={sortOrder} onChange={handleSortChange} className="select__tool">
                            <option value="expensive">Сначала дорогие</option>
                            <option value="cheap">Сначала дешевые</option>
                        </select>
                    </div>
                </div>
            </div>

            {noBikesMessage && <div className="no-bikes-message">{noBikesMessage}</div>}
            {filteredBikes.length === 0 ? (
                <div className="no-items-message">В ассортименте пусто</div>
            ) : (
            bikes.map(bike => (
                <Bike
                    key={bike.id}
                    bike={bike}
                    isAuth={isAuth}
                    user={user}
                    handleDeleteClick={handleDeleteClick}
                    getCategoryName={getCategoryName}
                    getTypeName={getTypeName}
                    handleEditClick={handleEditClick}
                />
            ))
            )}
            <EditBikeDialog
                open={openEditDialog}
                handleClose={handleCloseEditDialog}
                bike={bikeToEdit}
                handleEditBikeSubmit={handleEditBikeSubmit}
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
            <DeleteBikeDialog
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