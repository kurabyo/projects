import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem } from '@mui/material';
import { useContext } from 'react';
import { CarsContext } from '../App';

export default function DeleteModal({ id }) {
    const { cars, setCars } = useContext(CarsContext);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const removeCarWithId = () => {
        const carWithIdIndex = cars.findIndex((car) => car.id === id);
        setCars(prev => prev.toSpliced(carWithIdIndex, 1))
        handleClose()
    }

    return (
        <div>
            <MenuItem variant="outlined" onClick={handleClickOpen}>
                Delete
            </MenuItem>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete the item?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={
                        removeCarWithId
                    } autoFocus>
                        Yes, I want to delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}