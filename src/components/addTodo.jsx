import React ,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { addtodoList } from '../reducers/TodoReducer';
function Addtodo() {
    const dispatch=useDispatch();
    const [state,setState]=useState({
        content:"",
        enddate:"", 
        contentError:null,
        enddateError:null
    })

    const handleChange=(e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value,
            [`${e.target.name}Error`]:null
        })
    }

    const adddata=()=>{
        if(state.content===''){
            setState({...state,contentError:'you must enter something'})
        }
        else if(state.enddate===''){
            setState({...state,enddateError:'please enter a enddate'})
        }
        else{

                dispatch(addtodoList({content:state.content,endDate:state.enddate}))
        }
    }
    
  return (
    <div className='form'>
      <h1>What's your plan today?</h1>
      <input type='text' value={state.content} name="content" onChange={handleChange}/>
      <input type='date' value={state.date} name="enddate" onChange={handleChange}/>
      <button type='button' className='button' onClick={adddata}>Add</button>
      {state.contentError&&<h4>{state.contentError}</h4>}
      {state.enddateError&&<h4>{state.enddateError}</h4>}
    </div>
  )
}

export default Addtodo
