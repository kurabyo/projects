import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { CarsContext } from '../App';
import { useContext, useState } from 'react';
import { Button } from '@mui/base';
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

const AddModal = () => {
    const { cars, setCars } = useContext(CarsContext);

    const [open, setOpen] = useState(false);
    const [company, setCompany] = useState('');
    const [model, setModel] = useState('');
    const [vin, setVin] = useState('');
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const [availability, setAvailability] = useState(false);


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

    const companyChangeHandle = (e) => {
        setCompany(e.target.value)
    }

    const modelChangeHandle = (e) => {
        setModel(e.target.value)
    }

    const vinChangeHandle = (e) => {
        setVin(e.target.value)
    }

    const yearChangeHandle = (e) => {
        setYear(e.target.value)
    }

    // Form control

    const handleSubmit = (e) => {
        e.preventDefault();
        addCar()
    }

    const addCar = () => {
        const newID = Math.max(...cars.map(el => el.id)) + 1
        setCars(prev => prev.toSpliced(prev.length, 0, {
            id: newID,
            car: company,
            car_model: model,
            car_color: color,
            car_model_year: year,
            car_vin: vin,
            price: "$" + price,
            availability: availability,
        }))
        handleClose()
    }

    return (
        <div>
            <MenuItem onClick={handleOpen}>Add new car</MenuItem>
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
                        Adding new car
                    </Typography>
                    <TextField
                        id="company"
                        label="Company"
                        variant="outlined"
                        required
                        value={company}
                        onChange={companyChangeHandle} />
                    <TextField
                        id="model"
                        label="Model"
                        variant="outlined"
                        required
                        value={model}
                        onChange={modelChangeHandle} />
                    <TextField
                        id="vin"
                        label="VIN"
                        variant="outlined"
                        required
                        value={vin}
                        onChange={vinChangeHandle} />
                    <TextField
                        id="color"
                        required
                        onChange={colorChangeHandle}
                        label="Color"
                        variant="outlined"
                        value={color} />
                    <TextField
                        id="year"
                        label="Year"
                        variant="outlined"
                        required
                        value={year}
                        onChange={yearChangeHandle}
                    />
                    <TextField
                        id="price"
                        required
                        onChange={priceChangeHandle}
                        label="Price"
                        variant="outlined"
                        value={price} />
                    <Switch checked={availability} value={availability} onChange={availabilityChangeHandle} name="Availability" />
                    <Button className='btn btn-outline-success' type="submit">OK</Button>
                    <Button className='btn btn-outline-danger' onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default AddModal;
