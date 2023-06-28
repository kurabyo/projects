import React from 'react'

export default function TableBody({ cars }) {
    return (
        <tbody>
            {cars?.map((car) => (
            <tr >
                <td>{car.car}</td>
                <td>{car.car_model}</td>
                <td>{car.car_vin}</td>
                <td>{car.car_color}</td>
                <td>{car.car_model_year}</td>
                <td>{car.price}</td>
                <td>{car.availability}</td>
                <td>{car.car}</td>
            </tr>))}
        </tbody>
    )
}
