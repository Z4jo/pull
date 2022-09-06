import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button'
import axios from "axios";


export default function DataActivity({data,setterText,setterSeverity,setterOpen}) {

 async function updateRow(){
  const jsonData={
    activityType: rowData.activity_type,
    timeInMinutes: rowData.time_in_minutes_activity
  }
  try{
    const res= await axios.put("http://localhost:8080/put/activity/"+rowData.id,jsonData)
    setterText("updated "+res.status);
    setterSeverity('success');
    setterOpen(true);
    console.log(res.status)
} catch(err){
    setterText("failed. error in console");
    setterSeverity('error');
    setterOpen(true);
    console.log(err)
  }

  }

  async function deleteRow(){
    try{
      const res=await axios.delete("http://localhost:8080/delete/activity/"+rowData.id)
      setterText("deleted ");
      setterSeverity('success');
      setterOpen(true);
      console.log(res.status);
  }catch (err){
      setterText("failed. error in console");
      setterSeverity('error');
      setterOpen(true);
      console.log(err)
  }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'date', headerName: 'Date', width: 90 },
    {
        field: 'activity_type',
        headerName: 'Activity type',
        width: 160,
        editable: true,
      },
      {
        field: 'time_in_minutes_activity',
        headerName: 'Activity time',
        editable: true,
        type: 'number',
      },
      {
        field: 'update',
        headerName: 'Update',
        renderCell: () => {
            return <Button onClick={updateRow}>Update</Button>;
          }
        
    },
    {
        field: 'delete',
        headerName: 'Delete',
        renderCell: () => {
            return <Button onClick={deleteRow}>Delete</Button>;
          }
    },
];

const [rows,setRows] = React.useState([]);
const [rowData, setrowData] = React.useState("");
const handleCommit =(params)=>{
  const updatedData= rows.map((row)=>{
    if(row.id==params.id){
      return {...row,[params.field]:params.value}
    }
    return row;
  }) ;
  setRows(updatedData);

    };

React.useEffect(()=>{
  data.forEach(item => {
    const row={ id: item.id,date: item.date , activity_type: item.activityType,time_in_minutes_activity:item.timeInMinutes };
    setRows(rows =>[...rows,row]);
  });
},[])

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onCellEditCommit={(params)=> {handleCommit(params)}}
        onSelectionModelChange={(ids)=>{
          const selectedIDs=new Set(ids);
          const selectedRowData=rows.filter((row)=>{
          return selectedIDs.has(row.id);
          })
          setrowData(selectedRowData[0]);
        }}
      />
    </div>
  );
}