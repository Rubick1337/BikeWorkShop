import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const DeletePartDialog = ({ open, handleClose, handleConfirmDelete }) => {
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="delete-dialog-title">
            <DialogTitle id="delete-dialog-title">Удалить деталь</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Вы уверены, что хотите удалить эту деталь? Это действие нельзя отменить.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Отмена
                </Button>
                <Button onClick={handleConfirmDelete} color="primary">
                    Удалить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeletePartDialog;
