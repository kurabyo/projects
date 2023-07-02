import React from 'react'

export default function TableHead() {
    return (
        <thead className="thead-dark container">
            <tr>
                <th className='w-10' scope="col">Company</th>
                <th className='w-10' scope="col">Model</th>
                <th className='w-30' scope="col">VIN</th>
                <th className='w-10' scope="col">Color</th>
                <th className='w-10' scope="col">Year</th>
                <th className='w-10' scope="col">Price</th>
                <th className='w-10' scope="col">Availability</th>
                <th className='w-10' scope="col">Actions columns</th>
            </tr>
        </thead>
    )
}

