import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

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
            id_category_part: '',
            id_type_part: '',
            img: null,
            inSell: true,
        });
    };

    const onSubmit = () => {
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
        </Dialog>
    );
};

export default CreatePartDialog;
