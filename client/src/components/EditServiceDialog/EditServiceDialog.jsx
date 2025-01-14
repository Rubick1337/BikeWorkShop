import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControlLabel, Checkbox, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export default function EditServiceDialog({ open, handleClose, service, handleEditServiceSubmit, categories, types }) {
    const [editedService, setEditedService] = useState({
        _id: '',
        name: '',
        price: '',
        description: '',
        id_category_service: '',
        id_type_service: '',
        img: null,
        inSell: true
    });

    useEffect(() => {
        if (service) {
            setEditedService({
                id: service._id,
                name: service.name || '',
                price: service.price || '',
                description: service.description || '',
                id_category_service: service.id_category_service || '',
                id_type_service: service.id_type_service || '',
                img: service.img || null,
                inSell: service.inSell || false
            });
        }
    }, [service, open]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setEditedService(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (event) => {
        setEditedService(prev => ({
            ...prev,
            img: event.target.files[0]
        }));
    };

    const handleSubmit = () => {
        handleEditServiceSubmit(editedService);
    };

    if (!service) return null;

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Редактировать услугу</DialogTitle>
            <DialogContent>
                <TextField
                    label="Название услуги"
                    name="name"
                    value={editedService.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Цена"
                    name="price"
                    value={editedService.price}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="number"
                />
                <TextField
                    label="Описание"
                    name="description"
                    value={editedService.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Категория</InputLabel>
                    <Select
                        name="id_category_service"
                        value={editedService.id_category_service}
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
                <FormControl fullWidth margin="normal">
                    <InputLabel>Тип услуги</InputLabel>
                    <Select
                        name="id_type_service"
                        value={editedService.id_type_service}
                        onChange={handleChange}
                        label="Тип услуги"
                    >
                        {types.map((type) => (
                            <MenuItem key={type._id} value={type._id}>
                                {type.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={editedService.inSell}
                            onChange={handleChange}
                            name="inSell"
                            color="primary"
                        />
                    }
                    label="В продаже"
                />
                <div>
                    <label>Фото</label>
                    <input type="file" onChange={handleFileChange} />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Закрыть</Button>
                <Button onClick={handleSubmit} color="primary">Сохранить</Button>
            </DialogActions>
        </Dialog>
    );
}
