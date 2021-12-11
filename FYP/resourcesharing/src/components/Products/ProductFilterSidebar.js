import { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Form, FormikProvider } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
import roundClearAll from '@iconify/icons-ic/round-clear-all';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
import { useHistory } from 'react-router-dom';
import Products from '../userDashboard/Products'
import filterdata from '../../actions/';
// material
import {
    Box,
    Radio,
    Stack,
    Button,
    Drawer,
    Rating,
    Divider,
    Checkbox,
    FormGroup,
    IconButton,
    Typography,
    RadioGroup,
    FormControlLabel
} from '@material-ui/core';
//
import Scrollbar from '../Scrollbar'
import ColorManyPicker from '../userDashboard/ColorManyPicker';
// ----------------------------------------------------------------------
import Category from '../admin/Category';
export const SORT_BY_OPTIONS = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'priceDesc', label: 'Price: High-Low' },
    { value: 'priceAsc', label: 'Price: Low-High' }
];
export const FILTER_GENDER_OPTIONS = ['Men', 'Women'];
export const FILTER_CATEGORY_OPTIONS = ['All', 'Shose', 'Apparel', 'Accessories'];
export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];
export const FILTER_PRICE_OPTIONS = [
    { value: 'below', label: 'Below $25' },
    { value: 'between', label: 'Between $25 - $75' },
    { value: 'above', label: 'Above $75' }
];
export const FILTER_COLOR_OPTIONS = [
    '#00AB55',
    '#000000',
    '#FFFFFF',
    '#FFC0CB',
    '#FF4842',
    '#1890FF',
    '#94D82D',
    '#FFC107'
];

// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
    isOpenFilter: PropTypes.bool,
    onResetFilter: PropTypes.func,
    onOpenFilter: PropTypes.func,
    onCloseFilter: PropTypes.func,
    formik: PropTypes.object
};

export default function ShopFilterSidebar({
    isOpenFilter,
    onResetFilter,
    onOpenFilter,
    onCloseFilter,
    formik
}) {
    const { values, getFieldProps, handleChange } = formik;
    const [categoryname, setCategoryName] = useState('');
    const history = useHistory();
    return ( 
    <>
            <Button style = {
                { color: '#F2AA4CFF' } }
            disableRipple endIcon = { < Icon icon = { roundFilterList }
                />}

                
                onClick = { onOpenFilter } >
                < b > Filters </b>&nbsp; 
                </Button>

                < FormikProvider value = { formik } >
                < Form autoComplete = "off"
                noValidate >
                <Drawer
                anchor = "right"
                open = { isOpenFilter }
                onClose = { onCloseFilter }
                PaperProps = {
                    {
                        sx: { width: 280, border: 'none', overflow: 'hidden' }
                    }
                } >
                <Stack
                direction = "row"
                alignItems = "center"
                justifyContent = "space-between"
                sx = {
                    { px: 1, py: 2 } } >
                <Typography variant = "subtitle1"
                sx = {
                    { ml: 1 } } >
                Filters </Typography> <IconButton onClick = { onCloseFilter } >
                <Icon icon = { closeFill }
                width = { 20 }
                height = { 20 }
                /> </IconButton> </Stack>

                < Divider/>

                < Scrollbar >
                <Stack spacing = { 3 }
                sx = {
                    { p: 3 } } >
                <div >
                <Typography variant = "subtitle1"
                gutterBottom >
                Gender </Typography>
                 <FormGroup > {
                    FILTER_GENDER_OPTIONS.map((item) => ( < FormControlLabel key = { item }
                        control = { <
                            Checkbox {...getFieldProps('gender') }
                            value = { item }
                            checked = { values.gender.includes(item) }
                            />
                        }
                        label = { item }
                        />
                    ))
                } </FormGroup> </div>

                <div>
                <Typography variant = "subtitle1"
                gutterBottom >
                Category </Typography> <RadioGroup {...getFieldProps('category') } > {
                    Category.map((item) => ( <
                        FormControlLabel key = { item }
                        value = { item }
                        onClick = {
                            (e) => {
                                setCategoryName(e.target.value);
                                // console.log(e.target.value);
                                history.push({
                                    pathname: '/Main',
                                    state: { filterdata: e.target.value }
                                })
                                return <Products/>
                            }
                        }
                        control = { < Radio/> }
                        label = { item }

                        />
                    ))
                } </RadioGroup> </div>


                
                <div >
                
                <Typography variant = "subtitle1"
                gutterBottom >
                Price </Typography> 
                <RadioGroup {...getFieldProps('priceRange') } > {
                    FILTER_PRICE_OPTIONS.map((item) => ( 
                        <FormControlLabel key = { item.value }
                        value = { item.value }
                        control = { < Radio/> }
                        label = { item.label }
                        />
                    ))
                } 
                </RadioGroup> 
               </div>

                
                <div >
                
                <Typography variant = "subtitle1"
                gutterBottom >
                Rating 
                </Typography> 
                <RadioGroup {...getFieldProps('rating') } > {
                    FILTER_RATING_OPTIONS.map((item, index) => ( 
                            <FormControlLabel key = { item }
                            value = { item }
                            control = { <
                                Radio
                                disableRipple
                                color = "default"
                                icon = { < Rating readOnly value = { 4 - index }
                                    />}
                                    checkedIcon = { < Rating readOnly value = { 4 - index }
                                        />} /
                                        >
                                    }
                                    label = "& Up"
                                    sx = {
                                        {
                                            my: 0.5,
                                            borderRadius: 1,
                                            '& > :first-of-type': { py: 0.5 },
                                            '&:hover': {
                                                opacity: 0.48,
                                                '& > *': { bgcolor: 'transparent' }
                                            },
                                            ...(values.rating.includes(item) && {
                                                bgcolor: 'background.neutral'
                                            })
                                        }
                                    }
                                    />
                                ))
                        } 
                        </RadioGroup> 
                        </div> 
                        </Stack> 
                        </Scrollbar> 
                        <Box sx = {
                            { p: 3 } } >
                        
                        <Button fullWidth size = "large"
                        type = "submit"
                        color = "inherit"
                        variant = "outlined"
                        onClick = { onResetFilter }
                        startIcon = { < Icon icon = { roundClearAll }/>}>
                            Clear All 
                            </Button> 
                            </Box> 
                            </Drawer> 
                            </Form> 
                            </FormikProvider> 
                            </>
                        );
                    }