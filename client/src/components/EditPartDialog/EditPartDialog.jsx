import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControlLabel, Checkbox, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export default function EditPartDialog({ open, handleClose, part, handleEditPartSubmit, categories, types }) {
    const [editedPart, setEditedPart] = useState({
        _id: '',
        name: '',
        price: '',
        model: '',
        brand: '',
        id_category_part: '',
        id_type_part: '',
        img: null,
        inSell: true
    });

    useEffect(() => {
        if (part) {
            console.log('Part updated: ', part._id);
            setEditedPart({
                _id: part._id,
                name: part.name || '',
                price: part.price || '',
                model: part.model || '',
                brand: part.brand || '',
                id_category_part: part.id_category_part || '',
                id_type_part: part.id_type_part || '',
                img: part.img || null,
                inSell: part.inSell || false

            });
        }
    }, [part, open]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setEditedPart(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (event) => {
        setEditedPart(prev => ({
            ...prev,
            img: event.target.files[0]
        }));
    };

    const handleSubmit = () => {
        console.log("Измененная деталь:", editedPart);
        handleEditPartSubmit(editedPart);
    };

    if (!part) return null;

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Редактировать деталь</DialogTitle>
            <DialogContent>
                <TextField
                    label="Название"
                    name="name"
                    value={editedPart.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Цена"
                    name="price"
                    value={editedPart.price}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="number"
                />
                <TextField
                    label="Модель"
                    name="model"
                    value={editedPart.model}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Бренд"
                    name="brand"
                    value={editedPart.brand}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <div>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Категория</InputLabel>
                        <Select
                            name="id_category_part"
                            value={editedPart.id_category_part}
                            onChange={handleChange}
                            label="Категория"
                        >
                            {categories.map((category) => (
                                <MenuItem key={category._id} value={category._id}>
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
                            name="id_type_part"
                            value={editedPart.id_type_part}
                            onChange={handleChange}
                            label="Тип"
                        >
                            {types.map((type) => (
                                <MenuItem key={type._id} value={type._id}>
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
                            checked={editedPart.inSell}
                            onChange={handleChange}
                            name="inSell"
                            color="primary"
                        />
                    }
                    label="В наличии"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Закрыть</Button>
                <Button onClick={handleSubmit} color="primary">Сохранить</Button>
            </DialogActions>
        </Dialog>
    );
}
