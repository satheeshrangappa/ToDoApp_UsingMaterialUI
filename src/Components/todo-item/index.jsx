import React from 'react'
import { Card,CardContent,Typography,CardActions,Button } from '@mui/material'

function ToDoItem({todo,fetchDetailsOfCurrentToDo}) {
  console.log(todo);
  
  return (
    <Card sx={{maxWidth:350,
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
    }}>
      <CardContent>
        <Typography variant="h5" color="text.secondary"> 
          {todo?.todo}
        </Typography>
      </CardContent>
      <CardActions>
      <Button 
      onClick={()=>fetchDetailsOfCurrentToDo(todo?.id)}
      sx={{
        backgroundColor:'#000000',
        color:'white',
        opacity:'0.75',
        "&:hover":{
          backgroundColor:'black',
          opacity:'1'
        }
      }}>Details</Button>
      </CardActions>
    </Card>
  )
}

export default ToDoItem
