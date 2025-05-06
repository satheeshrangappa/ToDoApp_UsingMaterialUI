import { useEffect,useState } from "react";
import classes from './styles.module.css';
import ToDoItem from "./Components/todo-item";
import TodoDetails from "./Components/todo-details";
import { Skeleton } from "@mui/material";

function App() {
const [loading, setLoading] = useState(false);
const [todoList , setTodoList] = useState([]);
const [errorMsg, setErrorMsg] = useState(null);
const[todoDetails, setTodoDetails] = useState(null);
const [openDialog, setOpenDialog] = useState(false);

const fetchListOfToDos = async () => {
  try {
    setLoading(true);
    const apiResponse = await fetch('https://dummyjson.com/todos');
    const result = await apiResponse.json();
    console.log(result);
    
    
    
    if(result?.todos && result?.todos.length > 0) {
      setTodoList(result?.todos);
      setLoading(false);
      setErrorMsg("");
    }else {
      setTodoList([]);
      setLoading(false);
      setErrorMsg("")
    }
    
  } catch (error) {
    console.log(error);
    setErrorMsg("Something went wrong");
  }
    
}

async function fetchDetailsOfCurrentToDo(getCurrentTodoId) {
 console.log(getCurrentTodoId);
 try{
  const apiResponse = await fetch(`https://dummyjson.com/todos/${getCurrentTodoId}`);
  const details = await apiResponse.json();

  
  if(details) {
    setTodoDetails(details);
    setOpenDialog(true);
  }else {
    setTodoDetails(null);
    setOpenDialog(false);
  }
 }catch(error) {
  console.log(error);
  setErrorMsg("Something went wrong");
 }
}
useEffect(() => {
  fetchListOfToDos();
},[])
  if(loading) return <Skeleton variant="rectangular" width={650} height={650} />
  return (
    <div className={classes.mainContainer}>
      <h1 className={classes.headerTitle}>Simple To Do APP Using Material UI</h1>
      <div className={classes.todoListContainer}>
        {todoList && todoList.length > 0 
        ? todoList.map(todoItem=><ToDoItem fetchDetailsOfCurrentToDo={fetchDetailsOfCurrentToDo} todo={todoItem}/>)
        : <h2 className={classes.noToDoText}>No To Do Items</h2>}
      </div>
      <TodoDetails 
      setOpenDialog={setOpenDialog} 
      openDialog={openDialog} 
      todoDetails={todoDetails} 
      setTodoDetails={setTodoDetails}/>
    </div>
  )
}

export default App;
