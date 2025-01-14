import React, {useState} from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import '../SellBike/SellBikeStyle.scss';
import CustomAlert from "../CustomAlert/CustomAlert";

const CreateBikeDialog = ({
                              open,
                              handleClose,
                              newBikeData,
                              setNewBikeData,
                              handleCreateBikeChange,
                              handleFileChange,
                              handleCreateBikeSubmit,
                              categories,
                              types
                          }) => {

    const handleReset = () => {
        setNewBikeData({
            name: '',
            price: '',
            model: '',
            brand: '',
            id_category_bike: '',
            description: '',
            id_type_bike: '',
            img: null,
            inSell: true,
        });
    };
    const [alertOpen, setAlertOpen] = useState(false);  // Состояние для открытия alert
    const [alertMessage, setAlertMessage] = useState('');  // Сообщение alert
    const [alertSeverity, setAlertSeverity] = useState('');  // Тип alert: success или error

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    const onSubmit = () => {
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
        handleCreateBikeSubmit();
        handleReset();  // Сбрасываем форму после отправки
    };
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Добавить велосипед</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Название"
                    type="text"
                    fullWidth
                    value={newBikeData.name}
                    onChange={handleCreateBikeChange}
                />
                <TextField
                    margin="dense"
                    name="price"
                    label="Цена"
                    type="number"
                    fullWidth
                    value={newBikeData.price}
                    onChange={handleCreateBikeChange}
                />
                <TextField
                    margin="dense"
                    name="model"
                    label="Модель"
                    type="text"
                    fullWidth
                    value={newBikeData.model}
                    onChange={handleCreateBikeChange}
                />
                <TextField
                    margin="dense"
                    name="brand"
                    label="Брэнд"
                    type="text"
                    fullWidth
                    value={newBikeData.brand}
                    onChange={handleCreateBikeChange}
                />
                <TextField
                    label="Описание"
                    name="description"
                    value={newBikeData.description}
                    onChange={handleCreateBikeChange}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Категория</InputLabel>
                    <Select
                        name="id_category_bike"
                        value={newBikeData.id_category_bike || ''} // Пустая строка по умолчанию
                        onChange={handleCreateBikeChange}
                    >
                        {categories.map(category => (
                            <MenuItem key={category._id} value={category._id}> {/* Используйте `_id` */}
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                    <InputLabel>Тип</InputLabel>
                    <Select
                        name="id_type_bike"
                        value={newBikeData.id_type_bike || ''}
                        onChange={handleCreateBikeChange}
                    >
                        {types.map(type => (
                            <MenuItem key={type._id} value={type._id}>
                                {type.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ marginTop: '16px' }}
                />
                {newBikeData.img && (
                    <div className="img__container">
                        <img
                            className="preview-image"
                            src={URL.createObjectURL(newBikeData.img)}
                            alt="Preview"
                        />
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Отмена
                </Button>
                <Button onClick={onSubmit} color="primary">
                    Добавить
                </Button>
            </DialogActions>
            <CustomAlert
                open={alertOpen}
                message={alertMessage}
                severity={alertSeverity}
                handleClose={handleCloseAlert}
            />
        </Dialog>
    );
};

export default CreateBikeDialog;
