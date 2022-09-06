import React from "react";
import axios from "axios";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import InputLabel from '@mui/material/InputLabel';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


//charts import XAxis YAxis
import {XAxis,YAxis,Legend,CartesianGrid,Area,AreaChart,Tooltip} from 'recharts';


export default function Chart(){
    const [month,setMonth]=React.useState(0);
    const [month2,setMonth2]=React.useState(0);
    const [dataMonthsLoaded,setDataMonthsLoaded]=React.useState(false);
    const [dataMonthLoaded,setDataMonthLoaded]=React.useState(false);


    const [dataMonth,setDataMonth]=React.useState([]);
    const [dataMonth2,setDataMonth2]=React.useState([]);

    const [infoText,setInfoText]=React.useState('default');
    const [infoOpen,setInfoOpent]=React.useState(false);



    async function getDataByMonth(){
        const url="http://localhost:8080/get/daysByMonth/"
        if(month==0){
            setInfoText("There needs to be filled atleast first month")
            setInfoOpent(true);
        }else if(month2>0){
            try{
                let res= await axios.get(url+2022+","+month)
                let res2= await axios.get(url+2022+","+month2)
               const final=parseDataMonths(res.data,res2.data)
                setDataMonth(final);
                setDataMonthsLoaded(true);
            }catch (err) {
                console.log(err);
            }
        }else{
            try{
                let res= await axios.get(url+2022+","+month);
                res=parseDataMonth(res.data)
                setDataMonth(res);
                setDataMonthLoaded(true);
            }catch(err){
                console.log(err);
            }
        }

    }

    const parseDataMonth=((data)=>{

        for (let i = 0; i < data.length; i++) {
            let tmp=0
            for (let j = 0; j< data[i].focusSessions.length; j++) {              
               tmp+=data[i].focusSessions[j].timeInMinutes;
            }          
            data[i].index=i;  
            data[i].timeOfAllFocusSessions=tmp;
        }
            return data;
        })

    const parseDataMonths=((data,data2)=>{
        let tmpArr=[]
        for (let i = 0; i < data.length; i++) {
            tmpArr.push({"index":i})
            let tmp=0
            for (let j = 0; j< data[i].focusSessions.length; j++) {              
               tmp+=data[i].focusSessions[j].timeInMinutes;
            }           
            tmpArr[i].timeOfAllFocusSessions=tmp;
        }
        for (let i = 0; i < data2.length; i++) {
            if(tmpArr[i]==null){
                tmpArr.push({"index":i})
            }
            let tmp=0
            for (let j = 0; j< data2[i].focusSessions.length; j++) {              
               tmp+=data2[i].focusSessions[j].timeInMinutes;
            }           
            tmpArr[i].timeOfAllFocusSessions2=tmp;
        }

            return tmpArr;
    }) 

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    }

    const handleMonthChange=(event)=>{
        setMonth(event.target.value);
    }

    const handleMonth2Change=(event)=>{
        setMonth2(event.target.value);
    }
    const handleData=(()=>{
        getDataByMonth();
    })

    return(

        <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
            <Snackbar open={infoOpen} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    {infoText}
                </Alert>
            </Snackbar>
        <Paper elevation="6" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography variant="h3">Analýza</Typography>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="monthSelect">Month 1</InputLabel>
                        <Select
                        labeId="monthSelect"
                        id="monthSelect"
                        label="Month "
                        value={month}
                        onChange={handleMonthChange}
                        >
                            <MenuItem value={0}> </MenuItem>
                            <MenuItem value={1}>Jenuary</MenuItem>
                            <MenuItem value={2}>Febuary</MenuItem>
                            <MenuItem value={3}>March</MenuItem>
                            <MenuItem value={4}>April</MenuItem>
                            <MenuItem value={5}>May</MenuItem>
                            <MenuItem value={6}>June</MenuItem>
                            <MenuItem value={7}>July</MenuItem>
                            <MenuItem value={8}>August</MenuItem>
                            <MenuItem value={9}>September</MenuItem>
                            <MenuItem value={10}>October</MenuItem>
                            <MenuItem value={11}>November</MenuItem>
                            <MenuItem value={12}>December</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                    <InputLabel id="monthSelect2 ">Month 2</InputLabel>

                        <Select
                        labeId="monthSelect2"
                        id="monthSelect2"
                        label="Month 2"
                        value={month2}
                        onChange={handleMonth2Change}
                        >
                            <MenuItem value={0}> </MenuItem>
                            <MenuItem value={1}>Jenuary</MenuItem>
                            <MenuItem value={2}>Febuary</MenuItem>
                            <MenuItem value={3}>March</MenuItem>
                            <MenuItem value={4}>April</MenuItem>
                            <MenuItem value={5}>May</MenuItem>
                            <MenuItem value={6}>June</MenuItem>
                            <MenuItem value={7}>July</MenuItem>
                            <MenuItem value={8}>August</MenuItem>
                            <MenuItem value={9}>September</MenuItem>
                            <MenuItem value={10}>October</MenuItem>
                            <MenuItem value={11}>November</MenuItem>
                            <MenuItem value={12}>December</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" onClick={handleData}>Get data</Button>
                </Grid>
                <Grid item xs={12}>
                { dataMonthLoaded&&  
                    <AreaChart width={1000} height={500} data={dataMonth} >
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                        </defs>    
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="timeOfAllFocusSessions" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    </AreaChart>
                }
                { dataMonthsLoaded&&

                    <AreaChart width={1000} height={500} data={dataMonth}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                            </linearGradient>
                        </defs>    

                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="index" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="timeOfAllFocusSessions" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        <Area type="monotone" dataKey="timeOfAllFocusSessions2" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                }
                </Grid>
             </Grid>   
            </Paper>    
        </Container>

    );

}