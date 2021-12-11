import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';

import axios from 'axios';
import { useHistory, Link, NavLink, useLocation } from 'react-router-dom';

export default function ResponsiveDateRangePicker() {

    const [value, setValue] = React.useState([null, null]);


    return ( <
        LocalizationProvider dateAdapter = { AdapterDateFns } >
        <
        Stack spacing = { 3 } >
        <
        DesktopDateRangePicker startText = "Availbailty Dates"
        value = { value }
        inputFormat = "dd/MM/yyyy"

        fullWidth

        disablePast

        onChange = {
            (newValue) => {
                //     console.log(newValue)
                //   format="MM-dd-yyyy"
                localStorage.setItem("date", JSON.stringify(newValue))

                setValue(newValue);
            }
        }
        renderInput = {
            (startProps, endProps) => ( <
                React.Fragment >
                <
                TextField {...startProps }
                required fullWidth

                validators = {
                    ['required']
                }
                errorMessages = {
                    ['this field is required']
                }
                /> <
                Box sx = {
                    { mx: 2 }
                } > to < /Box> <
                TextField {...endProps }
                required fullWidth

                validators = {
                    ['required']
                }
                errorMessages = {
                    ['this field is required']
                }
                /> < /
                React.Fragment >
            )
        }
        /> < /
        Stack > <
        /LocalizationProvider>
    );
}