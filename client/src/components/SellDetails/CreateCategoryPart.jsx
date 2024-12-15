import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createCategory } from '../../store/slice/partSlice'; // Импортируйте ваш thunk

export default function CreateCategoryBikeDialog({ open, handleClose }) {
    const [categoryName, setCategoryName] = useState('');
    const dispatch = useDispatch();

    const handleCategoryChange = (event) => {
        setCategoryName(event.target.value);
    };

    const handleCreateCategory = async () => {
        if (categoryName.trim() === '') {
            alert('Пожалуйста, введите название категории');
            return;
        }
        try {
            await dispatch(createCategory(categoryName));
            setCategoryName("")
            handleClose();
        } catch (error) {
            console.error("Ошибка при создании категории:", error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Создать категорию детали</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Название категории"
                    fullWidth
                    variant="outlined"
                    value={categoryName}
                    onChange={handleCategoryChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Отмена</Button>
                <Button onClick={handleCreateCategory} color="primary">Создать</Button>
            </DialogActions>
        </Dialog>
    );
}
