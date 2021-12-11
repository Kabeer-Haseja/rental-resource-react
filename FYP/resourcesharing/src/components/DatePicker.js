import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';


export default function DatePicker(props) {
    const [value, setValue] = React.useState(new Date(props.mock));
    const [startdate, setstartdate] = React.useState(new Date());
    
    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return ( 
    <LocalizationProvider dateAdapter = { AdapterDateFns } >
        < Stack spacing = { 2 } >
        <DesktopDatePicker label = "Request Date "
        inputFormat = "dd/MM/yyyy"
        minDate={new Date(props.mock)}
        maxDate={new Date(props.mock1)}
        value = { value }
        onChange = { handleChange }
        renderInput = {
            (params) => < TextField {...params }
                
            />}
             />
            </Stack> 
            </LocalizationProvider>
        )
    }