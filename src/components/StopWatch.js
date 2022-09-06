import React from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useStopwatch } from 'react-timer-hook';
import PlayArrowIcon from '@mui/icons-material/PlayArrowOutlined';
import StopIcon from '@mui/icons-material/StopOutlined';
import RestartIcon from '@mui/icons-material/RestartAltOutlined';
import PauseIcon from '@mui/icons-material/PauseOutlined';





export default function Stopwatch({setHoursParent,setMinutesParent}){
   
    const {
        seconds,
        minutes,
        hours,
        start,
        pause,
        reset,
      } = useStopwatch({ autoStart: false });
  
      function getTime(minutes,hours){
          setHoursParent(hours)
          setMinutesParent(minutes)
          
      }
      
      
    return (
        <Box sx={{ flexGrow: 1 }}>
         <Grid container spacing={0}>
             <Grid item xs={4}>
             <Typography textAlign='center' bgcolor='primary.light' color='primary.contrastText' variant="h2" gutterBottom component="div">{hours}</Typography>
             </Grid>
             <Grid item xs={4}>
                <Typography textAlign='center' bgcolor='primary.light' color='primary.contrastText' variant="h2" gutterBottom component="div">{minutes}</Typography>
             </Grid>
             <Grid item xs={4}>
                <Typography textAlign='center' bgcolor='primary.light' color='primary.contrastText' variant="h2" gutterBottom component="div">{seconds}</Typography>
             </Grid>
             <Grid item xs={3}>
                 <Box textAlign="center" >
                    <IconButton   onClick={start}>
                        <PlayArrowIcon fontSize="large" color="primary.contrastText"/>
                    </IconButton>
                 </Box>
             </Grid>
             <Grid item xs={3}>
                <Box textAlign="center" >
                    <IconButton onClick={pause} textAlign="center" alignItems="center">
                    <PauseIcon fontSize="large" color="primary.contrastText"/>
                    </IconButton>
                </Box>
             </Grid>
             <Grid item xs={3}>
                 <Box textAlign="center">
                    <IconButton onClick={reset}>
                        <RestartIcon fontSize="large" color="primary.contrastText"/>
                    </IconButton>
                 </Box>
             </Grid>
             <Grid item xs={3}>
                 <Box textAlign="center">
                    <IconButton onClick={()=>{getTime(minutes,hours);reset(null,false)}}>
                        <StopIcon fontSize="large" color="primary.contrastText"/>
                    </IconButton>
                 </Box>
             </Grid>
         </Grid>
         </Box>
    );
}