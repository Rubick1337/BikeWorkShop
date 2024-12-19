import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createType } from '../../store/slice/serviceSlice'; // Импортируйте ваш thunk

export default function CreateTypeBikeDialog({ open, handleClose }) {
    const [typeName, setTypeName] = useState('');
    const dispatch = useDispatch();

    const handleTypeChange = (event) => {
        setTypeName(event.target.value);
    };

    const handleCreateType = async () => {
        if (typeName.trim() === '') {
            alert('Пожалуйста, введите название типа');
            return;
        }
        try {
            await dispatch(createType(typeName));
            setTypeName("")
            handleClose(); // Закрытие диалогового окна
        } catch (error) {
            console.error("Ошибка при создании типа:", error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Создать тип услуги</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Название типа"
                    fullWidth
                    variant="outlined"
                    value={typeName}
                    onChange={handleTypeChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Отмена</Button>
                <Button onClick={handleCreateType} color="primary">Создать</Button>
            </DialogActions>
        </Dialog>
    );
}
