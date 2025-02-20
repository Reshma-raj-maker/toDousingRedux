import { createSlice } from "@reduxjs/toolkit";
export const toDoSlider = createSlice({
    name: 'toDo',
    initialState: {
        todoList: []
    },

reducers:{
addtodoList:(state,action)=>{
    const newTodo={
        id:Math.random(),
        content:action.payload.content,
        endDate:action.payload.endDate
    }
    state.todoList.push(newTodo)
},
editTodoList:(state,action)=>{
    let id=action.payload.id
    state.todoList=state.todoList.map(item=>item.id===id?action.payload:item)
},
deleteToDo:(state,action)=>{
    let id=action.payload.id
    state.todoList=state.todoList.filter(item=>item.id!==id)
}
}



})
export const {addtodoList,editTodoList,deleteToDo}=toDoSlider.actions;
export default toDoSlider.reducer;