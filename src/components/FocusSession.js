import React, { useState } from "react";
import Rating from "./Rating.js";
import StopWatch from './StopWatch.js'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AlertT from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoForm from './InfoForm';
import axios from 'axios';


export default function FocusSession() {
    const [sessionTypeRaw, setSessionType] = useState('');
    const [minutesParent, setMinutesParent] = React.useState(0);
    const [hoursParent, setHoursParent] = React.useState(1);
    const [ratingRaw, setRating] = React.useState(0);
    const [noteRaw, setNote] = React.useState('');
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertType, setAlertType] = React.useState('');
    const [alertText, setAlertText] = React.useState('');
    const handleSessionType = (event) => { setSessionType(event.target.value) }
    const handleNote = (event) => { setNote(event.target.value) }
    const postData = {
        sessionType: sessionTypeRaw,
        timeInMinutes: (hoursParent * 60) + minutesParent +60,
        rating: ratingRaw,
        note: noteRaw
    };

    function Send() {
        var checkInput = CheckInput();

        if (checkInput == true) {
            axios.post('http://localhost:8080/add/focusSession', postData).then
                (response => { Alert(response.status);console.log(response) }, (error) => { Alert(1) })
        } else {
            setAlertType("warning")
        }
    }

    function CheckInput() {
        var ret = true;
        setAlertText('');
        if (ratingRaw == 0) {
            setAlertText("Rating minimum is 1 star");
            ret = false;
        }

        if (sessionTypeRaw == '') {
            setAlertText(alertText + " Session type must be filled");
            ret = false;
        }
        return ret;

    }

    function Alert(code) {

        setOpenAlert(true);
        if (code == 201) {
            setAlertType("success")
            setAlertText("Record saved");
        } else {
            setAlertType("error")
            setAlertText("We are unable to save your record")
        }
    }

    return (
        <>
            <Collapse in={openAlert}>
                <AlertT severity={alertType}>{alertText}</AlertT>
            </Collapse>
            <StopWatch setHoursParent={setHoursParent} setMinutesParent={setMinutesParent}></StopWatch>
            <Accordion sx={{ m: 2 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Focus session details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                        <Paper elevation="6" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                            <Typography variant="h3">Focus session</Typography>
                            <Grid container spacing={2}
                                direction="row"
                                justifyContent="center"
                                alignItems="center">
                                <Grid item xs={6}>
                                    <TextField fullWidth label="Session Type" value={sessionTypeRaw} onChange={handleSessionType}></TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullwidth
                                        id="outlined-multiline-static"
                                        label="Note"
                                        multiline
                                        rows={4}
                                        defaultValue=""
                                        onChange={handleNote} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Rating id="modal-modal-description" setRating={setRating} position="center" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button size="medium" color="secondary" variant="contained" onClick={Send} >Send</Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Container>
                </AccordionDetails>
            </Accordion>
            <InfoForm/>
        </>
    )
}