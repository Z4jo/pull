import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Rating from './Rating.js';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import AlertT from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';



export default function InfoForm() {
    const [mealType, setMealType] = useState('');
    const [meal, setMeal] = useState('');
    const [restTypeRaw, setRestType] = useState('');
    const [restTime, setRestTime] = useState(0);
    const [dateRest, setDateRest] = useState(Date.now());
    const [dateFood, setDateFood] = useState(Date.now())
    const [dateActivity, setDateActivity] = useState(Date.now())
    const [ratingRaw, setRating] = useState(0);
    const [activityTypeRaw, setActivity] = useState('');
    const [activityTime, setActivityTime] = useState(0);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState([]);

    const handleRestType = (event) => {
        setRestType(event.target.value);
    };

    const handleRestTime = (event) => {
        setRestTime(event.target.value);
    };

    const handleMealType = (event) => {
        setMealType(event.target.value);
    };

    const handleMeal = (event) => {
        setMeal(event.target.value);
    };


    const postRest = {
        restType: restTypeRaw,
        timeInMinutes: restTime,
        rating: ratingRaw,
        date: dateRest
    };

    const postMeal = {
        foodType: mealType,
        food: meal,
        date: dateFood
    };

    const postActivity ={
        activityType: activityTypeRaw,
        timeInMinutes: activityTime,
        date: dateActivity
    };

    function SendRest() {
        console.log(dateRest)
        axios.post('http://localhost:8080/add/restInfo', postRest).then
        ((response) => { SuccessHandle(response.status) }).catch( (error) => { ErrorHandle(error.response.data) })
    }

    function SendMeal() {
        axios.post('http://localhost:8080/add/foodInfo', postMeal).then
        ((response) => { SuccessHandle(response.status) }).catch( (error) => { ErrorHandle(error.response.data) })
    }

    function SendActivity() {
        axios.post('http://localhost:8080/add/activity', postActivity).then
        ((response) => { SuccessHandle(response.status) }).catch( (error) => { ErrorHandle(error.response.data) })
    }

    function ErrorHandle(item) {
           
            const alertTextArr=[]
            for(const key in item){
                alertTextArr.push(item[key]+" ");
            };
            setAlertText(alertTextArr)
            setAlertType("error")
            setOpenAlert(true);
            
    }

    function SuccessHandle(status){
            setAlertText([" created"])
            setAlertType("success")
            setOpenAlert(true);
            console.log(status)
    }

    return (
        <>
            <Collapse in={openAlert}>
                <AlertT onClose={()=>{setOpenAlert(false)}} severity={alertType}>{alertText}</AlertT>
            </Collapse>
            <Accordion sx={{ m: 2 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Rest information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                        <Paper elevation="6" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                            <Typography variant="h3">Rest info</Typography>
                            <Grid container spacing={1}
                                direction="row"
                                justifyContent="center"
                                alignItems="center">
                                <Grid item xs={4}>
                                    <FormControl sx={{ m: 2, minWidth: 120 }} >
                                        <InputLabel id="rest_type">Rest type</InputLabel>
                                        <Select
                                            fullWidth
                                            labelId="rest_type"
                                            id="rest_select"
                                            value={restTypeRaw}
                                            label="Rest type"
                                            onChange={handleRestType}

                                        >
                                            <MenuItem value="nap">Nap</MenuItem>
                                            <MenuItem value="meditation">Meditation</MenuItem>
                                            <MenuItem value="deepSleep">Deep sleep</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item sx={8}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker
                                            label="Datum"
                                            value={dateRest}
                                            onChange={(newValue) => {
                                                setDateRest(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item sx={4}>
                                    <FormControl sx={{ m: 2, maxWidth: 100 }}>
                                        <TextField id="outlined-restTime" label="Rest time" variant="outlined" type="number" helperText="time in minutes" value={restTime} onChange={handleRestTime} />
                                    </FormControl>
                                </Grid>
                                <Grid item sx={8}>
                                    <Rating setRating={setRating}></Rating>
                                </Grid>
                                <Grid item sx={12}>
                                    <Button size="medium" color="secondary" variant="contained" onClick={SendRest}>Send</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Container>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ m: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography>Food information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                        <Paper elevation="6" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                            <Typography variant="h3">Food info</Typography>
                            <Grid container spacing={1}
                                direction="row"
                                justifyContent="center"
                                alignItems="center">
                                <Grid item sx={8}>
                                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel id="meal_type">Meal type</InputLabel>
                                        <Select
                                            labelId="meal_type"
                                            id="meal_select"
                                            value={mealType}
                                            label="Meal type"
                                            onChange={handleMealType}

                                        >
                                            <MenuItem value="breakfast">Breakfast</MenuItem>
                                            <MenuItem value="lunch">Lunch</MenuItem>
                                            <MenuItem value="dinner">Dinner</MenuItem>
                                            <MenuItem value="snack">Snack</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item sx={8}>
                                    <FormControl sx={{ m: 1 }}>
                                        <TextField id="outlined-meal" multiline label="Meal" variant="outlined" value={meal} onChange={handleMeal} />
                                    </FormControl>
                                </Grid>
                                <Grid item sx={8}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker
                                            label="Datum"
                                            value={dateFood}
                                            onChange={(newValue) => {
                                                setDateFood(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item sx={4}>
                                    <Button size="medium" color="secondary" variant="contained" onClick={SendMeal}>Send</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Container>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ m: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography>Activity information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                        <Paper elevation="6" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                            <Typography variant="h3">Activity info</Typography>
                            <Grid container spacing={1}
                                direction="row"
                                justifyContent="center"
                                alignItems="center">
                                <Grid item sx={8}>
                                    <TextField fullWidth label="Activity type" value={activityTypeRaw} onChange={(event) => { setActivity(event.target.value) }}></TextField>
                                </Grid>
                                <Grid item sx={4}>
                                    <FormControl sx={{ m: 2, maxWidth: 100 }}>
                                        <TextField id="outlined-activityTime" label="Activity time" variant="outlined" type="number" helperText="time in minutes" value={activityTime} onChange={(event) => { setActivityTime(event.target.value) }} />
                                    </FormControl>
                                </Grid>
                                <Grid item sx={8}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker
                                            label="Datum"
                                            value={dateFood}
                                            onChange={(newValue) => {
                                                setDateActivity(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item sx={4}>
                                    <Button size="medium" color="secondary" variant="contained" onClick={SendActivity}>Send</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Container>
                </AccordionDetails>
            </Accordion>
        </>

    );


}
