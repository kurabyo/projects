import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

export default function ActionMenu({id, car}) {

    return (
        <div>
            <FormControl variant="standard" sx={{ minWidth: 100 }} size="small">
                <Select>
                    <EditModal car={car}/>
                    <DeleteModal id={id}/>
                </Select>
            </FormControl>
        </div>
    );
}