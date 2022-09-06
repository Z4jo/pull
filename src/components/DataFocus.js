import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button'
import axios from "axios";


export default function DataFocus({data,setterText,setterSeverity,setterOpen}) {

 
  
  async function deleteRow(){
      try{
        const res= await axios.delete("http://localhost:8080/delete/focusSession/"+rowData.id)
        setterText("deleted ");
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

  async function updateRow(){
    let jsonData={
      sessionType: rowData.session_type,
      timeInMinutes: rowData.time_in_minutes_session,
      note: rowData.note_focus,
      rating: rowData.rating_focus
    }
    try{
      const res= await axios.put("http://localhost:8080/put/focusSession/"+rowData.id,jsonData)
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

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'date', headerName: 'Date', width: 90 },
    {
      field: 'session_type',
      headerName: 'Focus session type',
      width: 110,
      editable: true,
    },
    {
      field: 'time_in_minutes_session',
      headerName: 'Focus time',
      type: 'number',
      width: 160,
      editable: true,
    },
    {
      field: 'note_focus',
      headerName: 'Focus session note',
      sortable: false,
      width: 160,
      editable: true,
    },
    {
      field: 'rating_focus',
      headerName: 'Focus session rating',
      type: 'number',
      width: 160,
      editable: true,
    },
    {
      field: 'update',
      headerName: 'Update',
      renderCell: () => {
          return <Button onClick={updateRow}>Update</Button>;
        },
      
      
  },
  {
    field: 'delete',
    headerName: 'Delete',
    width:'100',
    renderCell: () => {
        return <Button onClick={deleteRow}>Delete</Button>;
      },
    
  },
  ];
  
  const [rows,setRows] = React.useState([]);
  const [rowData, setrowData] = React.useState(0);
  const handleCommit =(params)=>{
    const updatedData= rows.map((row)=>{
      if(row.id==params.id){
        return {...row,[params.field]:params.value}
      }
      return row;
    }) ;
    setRows(updatedData);
  };

  useEffect(()=>{
    
    data.forEach(item => {
      const row={id: item.id,date:item.date ,session_type: item.sessionType, time_in_minutes_session: item.timeInMinutes, note_focus: item.note,rating_focus: item.rating};
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