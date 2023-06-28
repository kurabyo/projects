import React from 'react'

export default function TableHead() {
    return (
        <thead class="thead-dark">
            <tr>
                <th scope="col">Company</th>
                <th scope="col">Model</th>
                <th scope="col">VIN</th>
                <th scope="col">Color</th>
                <th scope="col">Year</th>
                <th scope="col">Price</th>
                <th scope="col">Availability</th>
                <th scope="col">Actions columns</th>
            </tr>
        </thead>
    )
}

