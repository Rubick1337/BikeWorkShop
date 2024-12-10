import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControlLabel, Checkbox, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export default function EditBikeDialog({ open, handleClose, bike, handleEditBikeSubmit, categories, types }) {
    const [editedBike, setEditedBike] = useState({
        id: '',
        name: '',
        price: '',
        model: '',
        brand: '',
        id_category_bike: '',
        id_type_bike: '',
        img: null,
        inSell: true
    });

    useEffect(() => {
        if (bike) {
            console.log('Bike updated'+ bike.id);
            setEditedBike({
                id: bike.id,
                name: bike.name || '',
                price: bike.price || '',
                model: bike.model || '',
                brand: bike.brand || '',
                id_category_bike: bike.id_category_bike || '',
                id_type_bike: bike.id_type_bike || '',
                img: bike.img || null,
                inSell: bike.inSell || false
            });
        }
    }, [bike, open]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setEditedBike(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (event) => {
        setEditedBike(prev => ({
            ...prev,
            img: event.target.files[0]
        }));
    };

    const handleSubmit = () => {
        console.log("Измененный велосипед:", editedBike);
        handleEditBikeSubmit(editedBike);
    };

    if (!bike) return null;

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Редактировать велосипед</DialogTitle>
            <DialogContent>
                <TextField
                    label="Название"
                    name="name"
                    value={editedBike.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Цена"
                    name="price"
                    value={editedBike.price}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="number"
                />
                <TextField
                    label="Модель"
                    name="model"
                    value={editedBike.model}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Бренд"
                    name="brand"
                    value={editedBike.brand}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <div>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Категория</InputLabel>
                        <Select
                            name="id_category_bike"
                            value={editedBike.id_category_bike}
                            onChange={handleChange}
                            label="Категория"
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Тип</InputLabel>
                        <Select
                            name="id_type_bike"
                            value={editedBike.id_type_bike}
                            onChange={handleChange}
                            label="Тип"
                        >
                            {types.map((type) => (
                                <MenuItem key={type.id} value={type.id}>
                                    {type.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <label>Фото</label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={editedBike.inSell}
                            onChange={handleChange}
                            name="inSell"
                            color="primary"
                        />
                    }
                    label="В продаже"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Закрыть</Button>
                <Button onClick={handleSubmit} color="primary">Сохранить</Button>
            </DialogActions>
        </Dialog>
    );
}
