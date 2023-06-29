import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { CarsContext } from '../App';
import { useContext, useState } from 'react';
import { Button } from '@mui/base';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Switch } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function EditModal({ car }) {

    const { cars, setCars } = useContext(CarsContext);

    const [open, setOpen] = useState(false);
    const [color, setColor] = useState(car.car_color);
    const [price, setPrice] = useState(car.price);
    const [availability, setAvailability] = useState(car.availability);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //Editing functions
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

    const editCar = () => {
        const carWithIdIndex = cars.findIndex((i) => i.id === car.id);
        setCars(prev => prev.toSpliced(carWithIdIndex, 1, {...car, car_color: color, price: price, availability: availability}))
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
                    sx={style}
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
                        defaultValue={color}/>
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
                    <Switch checked={availability} onChange={availabilityChangeHandle} name="Availability" />
                    <Button className='btn btn-outline-success' type="submit">OK</Button>
                    <Button className='btn btn-outline-danger' onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
        </div>
    );
}