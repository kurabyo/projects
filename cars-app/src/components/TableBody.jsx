import React from 'react'
import ActionMenu from './ActionMenu'

export default function TableBody({ cars }) {

    return (
        <tbody className='align-items-center'>
            {cars?.map((car) => (
            <tr key={car.id}>
                <td>{car.car}</td>
                <td>{car.car_model}</td>
                <td>{car.car_vin}</td>
                <td>{car.car_color}</td>
                <td>{car.car_model_year}</td>
                <td>{car.price}</td>
                <td>{car.availability ? '✅' : '🟥'}</td>
                <td><ActionMenu id={car.id} car={car}/></td>
            </tr>))}
        </tbody>
    )
}
