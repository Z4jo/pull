import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button'
import axios from "axios";



export default function DataFood({data,setterText,setterSeverity,setterOpen}) {

 async function updateRow(){
  const jsonData={
    foodType: rowData.food_type,
    food: rowData.food
  }
  try{
    const res= await axios.put("http://localhost:8080/put/foodInfo/"+rowData.id,jsonData)
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
    const res=await axios.delete("http://localhost:8080/delete/foodInfo/"+rowData.id)
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
        field: 'food_type',
        headerName: 'Food type',
        width: 160,
        editable: true,
      },
      {
        field: 'food',
        headerName: 'Meal',
        width: 160,
        editable: true,
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
      const row={ id: item.id, date: item.date , food_type: item.foodType, food: item.food };
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

