import React, {useState} from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import CustomAlert from "../CustomAlert/CustomAlert";

const CreatePartDialog = ({
                              open,
                              handleClose,
                              newPartData,
                              setNewPartData,
                              handleCreatePartChange,
                              handleFileChange,
                              handleCreatePartSubmit,
                              categories,
                              types
                          }) => {

    const handleReset = () => {
        setNewPartData({
            name: '',
            price: '',
            model: '',
            brand: '',
            description: '',
            id_category_part: '',
            id_type_part: '',
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
        handleCreatePartSubmit();
        handleReset();  // Сбрасываем форму после отправки
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Добавить деталь</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Название"
                    type="text"
                    fullWidth
                    value={newPartData.name}
                    onChange={handleCreatePartChange}
                />
                <TextField
                    margin="dense"
                    name="price"
                    label="Цена"
                    type="number"
                    fullWidth
                    value={newPartData.price}
                    onChange={handleCreatePartChange}
                />
                <TextField
                    margin="dense"
                    name="model"
                    label="Модель"
                    type="text"
                    fullWidth
                    value={newPartData.model}
                    onChange={handleCreatePartChange}
                />
                <TextField
                    margin="dense"
                    name="brand"
                    label="Брэнд"
                    type="text"
                    fullWidth
                    value={newPartData.brand}
                    onChange={handleCreatePartChange}
                />
                <TextField
                    margin="dense"
                    name="description"
                    label="описание"
                    type="text"
                    fullWidth
                    value={newPartData.description}
                    onChange={handleCreatePartChange}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Категория</InputLabel>
                    <Select
                        name="id_category_part"
                        value={newPartData.id_category_part}
                        onChange={handleCreatePartChange}
                    >
                        {categories.map(category => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                    <InputLabel>Тип</InputLabel>
                    <Select
                        name="id_type_part"
                        value={newPartData.id_type_part}
                        onChange={handleCreatePartChange}
                    >
                        {types.map(type => (
                            <MenuItem key={type.id} value={type.id}>
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
                {newPartData.img && (
                    <div className="img__container">
                        <img
                            className="preview-image"
                            src={URL.createObjectURL(newPartData.img)}
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

export default CreatePartDialog;
