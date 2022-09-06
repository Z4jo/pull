import React, { useEffect } from "react";
import axios from "axios";
import DataFood from "./DataFood";
import DataFocus from "./DataFocus"
import DataActivity from "./DataActivity";
import DataRest from "./DataRest";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';




export default function Data(){
  const [focusSessionArr,setFocusSessionArr]=React.useState([])
  const [activityArr, setActivityArr]=React.useState([]);
  const [foodArr, setFoodArr]=React.useState([]);
  const [restArr,setRestArr]=React.useState([]);
  const [loaded,setLoaded]=React.useState(false);
  const [alertText,setAlertText]=React.useState('debug');
  const [alertSeverity,setAlertSeverity]=React.useState('info');
  const [alertOpen,setAlertOpen]=React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  }

  
  useEffect(()=> {
    axios.get('http://localhost:8080/getDays')
    .then((res)=> {
      res.data.forEach(item => {
        if(item.focusSessions.length>0){
          item.focusSessions.forEach(item2 => {
            const tmpObject = Object.assign(item2,{date:item.date})
            focusSessionArr.push(tmpObject);
          });
        }
        if(item.activities.length>0){
          item.activities.forEach(item2 =>{
            const tmpObject= Object.assign(item2,{date: item.date});
            activityArr.push(tmpObject);
          })
        }
        if(item.foodInfoes.length>0){
          item.foodInfoes.forEach(item2=>{
            const tmpObject=Object.assign(item2,{date: item.date});
            foodArr.push(tmpObject);
          });
        }
        if(item.restInfoes.length>0){
          item.restInfoes.forEach(item2=>{
            const tmpObject= Object.assign(item2,{date: item.date});
            restArr.push(tmpObject);
          })
        } 
      });
      setLoaded(true);
    })
    .catch(err=>{console.log(err)})
  },[])
  


    return (
      <>
          <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
              {alertText}
            </Alert>
          </Snackbar>
          {loaded && 
          <DataFocus data={focusSessionArr} setterText={setAlertText} setterSeverity={setAlertSeverity} setterOpen={setAlertOpen} ></DataFocus>
          }          
          {loaded && 
          <DataActivity data={activityArr} setterText={setAlertText} setterSeverity={setAlertSeverity} setterOpen={setAlertOpen} ></DataActivity>
          } 
          {loaded && 
          <DataFood data={foodArr} setterText={setAlertText} setterSeverity={setAlertSeverity} setterOpen={setAlertOpen} ></DataFood>
          } 
          {loaded && 
          <DataRest data={restArr} setterText={setAlertText} setterSeverity={setAlertSeverity} setterOpen={setAlertOpen} ></DataRest>
          }
      </>
      );


}