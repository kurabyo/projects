import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem } from '@mui/material';
import { useContext, useState } from 'react';
import { CarsContext } from '../App';

export default function DeleteModal({ id }) {
    // Context data conection..............................................//
    const { cars, setCars } = useContext(CarsContext);

    // States .............................................................//
    const [open, setOpen] = useState(false);

    // Modal open/close functions.........................................///
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Deleting car from the local memory function...........................................//
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
                    {"Are you sure you want to delete this item?"}
                </DialogTitle>
                <DialogActions className='d-flex justify-content-center'>
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>No</button>
                    <button type="button" className="btn btn-danger" onClick={removeCarWithId} autoFocus>Yes, I want to delete</button>
                </DialogActions>
            </Dialog>
        </div>
    );
}