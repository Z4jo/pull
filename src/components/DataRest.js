import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button'
import axios from "axios";


export default function DataRest({data,setterText,setterSeverity,setterOpen}){
    
    async function updateRow(){
        const jsonData={
            restType: rowData.rest_type,
            timeInMinutes: rowData.time_in_minutes_rest,
            rating: rowData.rating
          }
          try{
            const res= await axios.put("http://localhost:8080/put/restInfo/"+rowData.id,jsonData)
            setterText("updated ");
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
            const res=await axios.delete("http://localhost:8080/delete/restInfo/"+rowData.id)
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
          field: 'rest_type',
          headerName: 'Rest type',
          width: 160,
          editable: true,
        },
        {
          field: 'time_in_minutes_rest',
          headerName: 'Time',
          width: 160,
          editable: true,
          type: 'number',
        },
        {
            field: 'rating',
            headerName: 'Rating',
            width: 160,
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
          width:'100',
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
        const row={ id: item.id, date: item.date , rest_type: item.restType, time_in_minutes_rest: item.timeInMinutes,rating: item.rating };
        setRows(rows => [...rows,row]);
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