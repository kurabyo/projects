import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { CarsContext } from '../App';
import { useContext, useState } from 'react';
import { Button } from '@mui/base';
import { Switch } from '@mui/material';
import '../styles/editModal.css'

const regexYear = '^(188[6-9]|18[9-9]\\d|19\\d{2}|20[0-9]{2})$';
const regexPrice = '[0-9.]*';

const AddModal = () => {
    // Context data conection..............................................//
    const { cars, setCars } = useContext(CarsContext);

    // States .............................................................//
    const [open, setOpen] = useState(false);
    const [company, setCompany] = useState('');
    const [model, setModel] = useState('');
    const [vin, setVin] = useState('');
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const [availability, setAvailability] = useState(false);

    // Modal open/close functions.........................................///
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //Adding events handling functions...................................//
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

    // Form control submit...............................................................//
    const handleSubmit = (e) => {
        e.preventDefault();
        addCar()
    }

    // Adding car to the local memory function...........................................//
    const addCar = () => {
        const newID = Math.max(...cars.map(el => el.id)) + 1
        setCars(prev => prev.toSpliced(prev.length, 0, {
            id: newID,
            car: company,
            car_model: model,
            car_color: color,
            car_model_year: year,
            car_vin: vin.toString().toUpperCase(),
            price: "$" + price,
            availability: availability,
        }))
        handleClose()
    }

    return (
        <div className='d-flex justify-content-center mt-2'>
            <Button className="btn btn-primary" onClick={handleOpen}>Add new car</Button>
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
                        Adding new car
                    </Typography>
                    <TextField
                        id="company"
                        label="Company"
                        variant="outlined"
                        required
                        onChange={companyChangeHandle} />
                    <TextField
                        id="model"
                        label="Model"
                        variant="outlined"
                        required
                        onChange={modelChangeHandle} />
                    <TextField
                        id="vin"
                        label="VIN"
                        variant="outlined"
                        required
                        onChange={vinChangeHandle} />
                    <TextField
                        id="color"
                        required
                        onChange={colorChangeHandle}
                        label="Color"
                        variant="outlined" />
                    <TextField
                        id="year"
                        label="Year (1886 - 2099)"
                        variant="outlined"
                        required
                        onChange={yearChangeHandle}
                        inputProps={{ inputMode: 'numeric', pattern: regexYear, minLength: 4, maxLength: 4 }}
                    />
                    <TextField
                        id="price"
                        required
                        onChange={priceChangeHandle}
                        label="Price in dollars (numbers/dot)"
                        variant="outlined" 
                        inputProps={{ inputMode: 'numeric', pattern: regexPrice, }}/>
                    <div>
                        <label>Availability</label>
                        <Switch checked={availability} value={availability} onChange={availabilityChangeHandle} name="Availability" />
                    </div>
                    <Button className='btn btn-outline-success' type="submit">OK</Button>
                    <Button className='btn btn-outline-danger' onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default AddModal;
