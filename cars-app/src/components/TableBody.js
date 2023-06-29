import React from 'react'
import ActionMenu from './ActionMenu'
import '../styles/table.css'

export default function TableBody({ cars }) {
    return (
        <tbody className='align-items-center'>
            {cars?.map((car) => (
            <tr >
                <td>{car.car}</td>
                <td>{car.car_model}</td>
                <td>{car.car_vin}</td>
                <td>{car.car_color}</td>
                <td>{car.car_model_year}</td>
                <td>{car.price}</td>
                <td>{car.availability ? 'yes' : 'nou'}</td>
                <td><ActionMenu /></td>
            </tr>))}
        </tbody>
    )
}
