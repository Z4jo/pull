import React,{useState} from 'react';
import Stars from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export default function Rating({position,setRating}){
    const [value, setValue] = useState(0);
    return(
        <>
        <Box textAlign={position}>
            <Typography variant='h5'>Rating</Typography>
            <Stars
            name="simple-controlled"
            value={value}
            max={10}
            size="large"
            onChange={(event, newValue) => {
            setValue(newValue);
            setRating(newValue);
            }}
        />
        </Box>
      </>
    );

}