import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiEdit2Fill } from "react-icons/ri";
import { IoIosCloseCircle } from "react-icons/io";
//import { deleteToDo, editTodoList } from "../reducers/todoReducer";
import { deleteToDo,editTodoList } from "../reducers/TodoReducer";
export default function Listtodo() {
  const { todoList } = useSelector((state) => state);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    id:"",
    content: "",
    endDate: "",
    contentError: null,
    enddateError: null,
  });

  const onEditToggle = (id, content, endDate) => {
    setIsEditing(true);
    setState({
        ...state,id,content,endDate
    })
  };

  const handleEdit = () => {
    if (state.content === "") {
        setState({ ...state, contentError: "You must write something" });
      } else if (state.endDate === "") {
        setState({ ...state, enddateError: "You must choose a End Date" });
      } else {
        // pass the data to the redux store
        dispatch(editTodoList({ id:state.id,content: state.content, endDate: state.endDate }));
        setState({ id:"",content: "", endDate: "" });
        setIsEditing(false)
      }
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      [`${e.target.name}Error`]: null,
    });
  };

  
  return (
    <div>
      {isEditing ? (
        <div className="form">
          <h2>Update your plan for today</h2>
          <input
            type="text"
            value={state.content}
            name="content"
            onChange={handleChange}
          ></input>
          <input
            type="date"
            value={state.endDate}
            name="endDate"
            onChange={handleChange}
          />
          <button type="button" className="button" onClick={handleEdit}>
            Edit
          </button>
          {state.contentError && (
            <div className="error">{state.contentError}</div>
          )}
          <br />
          {state.enddateError && (
            <div className="error">{state.enddateError}</div>
          )}
        </div>
      ) : (
        <ul className="todos">
          {todoList.map(({ id, content, endDate }) => {
            return (
              <li className="grid" key={id}>
                <span className="content">
                  {content}-{endDate}
                </span>
                <span className="todo-action">
                  <IoIosCloseCircle className="close" onClick={() => dispatch(deleteToDo({id}))}/>
                  <RiEdit2Fill
                    className="edit"
                    onClick={() => onEditToggle(id, content, endDate)}
                  />
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
