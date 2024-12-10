import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material'

const DeleteBikeDialog = ({ open, handleClose, handleConfirmDelete }) => {
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="delete-dialog-title">
            <DialogTitle id="delete-dialog-title">Удалить велосипед</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Вы уверены, что хотите удалить этот велосипед? Это действие нельзя отменить.
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

export default DeleteBikeDialog;