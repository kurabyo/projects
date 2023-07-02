import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { CarsContext } from '../App';
import { useContext, useState } from 'react';
import { Button } from '@mui/base';
import { Switch } from '@mui/material';
import '../styles/editModal.css'



export default function EditModal({ car }) {
    // Context data conection..............................................//
    const { cars, setCars } = useContext(CarsContext);

    // States .............................................................//
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState(car.car_color);
    const [price, setPrice] = useState(car.price);
    const [availability, setAvailability] = useState(car.availability);

    // Modal open/close functions.........................................///
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //Editing events handling functions...................................//
    const colorChangeHandle = (e) => {
        setColor(e.target.value)
    }

    const priceChangeHandle = (e) => {
        setPrice(e.target.value)
    }

    const availabilityChangeHandle = (e) => {
        setAvailability(e.target.checked)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editCar()
    }

    // Eding car by id prop..................................................//
    const editCar = () => {
        const carWithIdIndex = cars.findIndex((i) => i.id === car.id);
        setCars(prev => prev.toSpliced(carWithIdIndex, 1, { ...car, car_color: color, price: price, availability: availability }))
        handleClose()
    }

    return (
        <div>
            <MenuItem onClick={handleOpen}>Edit</MenuItem>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    className='modal-box'
                    component="form"
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Editing
                    </Typography>
                    <TextField
                        id="company"
                        label="Company"
                        variant="outlined"
                        disabled
                        value={car.car} />
                    <TextField
                        id="model"
                        label="Model"
                        variant="outlined"
                        disabled
                        value={car.car_model} />
                    <TextField
                        id="vin"
                        label="VIN"
                        variant="outlined"
                        disabled
                        value={car.car_vin} />
                    <TextField
                        id="color"
                        required
                        onChange={colorChangeHandle}
                        label="Color"
                        variant="outlined"
                        defaultValue={color} />
                    <TextField
                        id="year"
                        label="Year"
                        variant="outlined"
                        disabled
                        value={car.car_model_year} />
                    <TextField
                        id="price"
                        required
                        onChange={priceChangeHandle}
                        label="Price"
                        variant="outlined"
                        defaultValue={price} />
                    <div>
                        <label>Availability</label>
                        <Switch checked={availability} onChange={availabilityChangeHandle} name="Availability" />
                    </div>
                    <Button className='btn btn-outline-success' type="submit">OK</Button>
                    <Button className='btn btn-outline-danger' onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
        </div>
    );
}