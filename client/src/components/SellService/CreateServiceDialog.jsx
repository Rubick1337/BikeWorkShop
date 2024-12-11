import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const CreateServiceDialog = ({
                                 open,
                                 handleClose,
                                 newServiceData,
                                 setNewServiceData,
                                 handleCreateServiceChange,
                                 handleFileChange,
                                 handleCreateServiceSubmit,
                                 categories,
                                 types
                             }) => {

    const handleReset = () => {
        setNewServiceData({
            name: '',
            price: '',
            description: '',
            id_category_service: '',
            id_type_service: '',
            img: null,
            inSell: true,
        });
    };

    const onSubmit = () => {
        handleCreateServiceSubmit();
        handleReset();  // Reset the form after submitting
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Добавить услугу</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Название"
                    type="text"
                    fullWidth
                    value={newServiceData.name}
                    onChange={handleCreateServiceChange}
                    helperText="Введите название услуги"
                />
                <TextField
                    margin="dense"
                    name="price"
                    label="Цена"
                    type="number"
                    fullWidth
                    value={newServiceData.price}
                    onChange={handleCreateServiceChange}
                    helperText="Укажите стоимость услуги"
                />
                <TextField
                    margin="dense"
                    name="description"
                    label="Описание"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    value={newServiceData.description}
                    onChange={handleCreateServiceChange}
                    helperText="Опишите услугу подробно"
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Категория</InputLabel>
                    <Select
                        name="id_category_service"
                        value={newServiceData.id_category_service}
                        onChange={handleCreateServiceChange}
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
                        name="id_type_service"
                        value={newServiceData.id_type_service}
                        onChange={handleCreateServiceChange}
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
                {newServiceData.img && (
                    <div className="img__container">
                        <img
                            className="preview-image"
                            src={URL.createObjectURL(newServiceData.img)}
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
        </Dialog>
    );
};

export default CreateServiceDialog;
