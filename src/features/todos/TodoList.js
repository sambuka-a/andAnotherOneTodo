import styled, { keyframes } from 'styled-components'
import { AiOutlineClose } from "react-icons/ai";
import { Container } from "../../components/Container";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { Controls } from '../controls/Controls';

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getTodos, removeTodo, toggleTodo, clearCompleted, selectVisibleTodos } from "./todos-slice";


const List = styled.div`
  list-style: none;
  font-size: var(--fs-md);
  font-weight: var(--fw-bold);
  position: relative;
  top: -5rem;
  width: 100%;
  color: var(--colors-text);
  background: var(--colors-list);
  border: none;
  border-radius: 3px;
`;

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 2rem 1rem 1.5rem 3rem;
  border-bottom: 1px solid var(--colors-bg);
`

const Input = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
`;

const Label = styled.label`
  position: relative;
  display: inline-block;
`;

const rotate = keyframes`
 from {
    opacity: 0;
    transform: rotate(0deg);
  }
  to {
    opacity: 1;
    transform: rotate(45deg);
  }
`;

const Indicator = styled.div`
  width: 1.3em;
  height: 1.3em;
  background: linear-gradient(125deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%));
  opacity: 0.75;
  position: absolute;
  top: -0.3rem;
  left: -2.2rem;
  border: 1px solid linear-gradient(125deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%));
  border-radius: 50%;

  ${Input}:not(:disabled):checked & {
    background: #d1d1d1;
  }

  ${Label}:hover & {
    border: 1px solid hsl(192, 100%, 67%);
  }

  &::after {
    content: "";
    position: absolute;
    display: none;
  }

  ${Input}:checked + &::after {
    display: block;
    top: 0.2em;
    left: 0.4em;
    width: 20%;
    height: 40%;
    border: solid var(--colors-list);
    border-width: 0 0.2em 0.2em 0;
    animation-name: ${rotate};
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  }
`;

const ControlsSection = styled.div`
  display: flex;
  justify-content: space-between;  
  align-items: center;
  padding: 1rem;
`

const Button = styled.div`
  background: none;
  -webkit-appearance: none;
  color: grey;
  cursor: pointer;
  display: inline-block;
  font-size: var(--fs-sm);
  height: 15px;
  margin: 5px 10px;
  opacity: 0.7;

  &:hover {
    color: var(--colors-text);
    transition-duration: 0.4s;
  }
`;

const TodoList = () => {
    const actieFilters = useSelector(state => state.controls)
    const todos = useSelector(state => selectVisibleTodos(state, actieFilters));
    const allTodos = useSelector(state => state.todos.todos)
    const {status, error} = useSelector(state => state.todos)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodos())
          .unwrap()
          .catch((err) => {
            toast(err)
          })
      }, [dispatch]);


  return (
    <>
      <ToastContainer/>
      <Container>
        <List>
        {error && <h2>{error}</h2>}
        {status === 'loading' && <h2>Loading</h2> }
        {status === 'idle' && !error && todos.map((todo) => (
          <Li key = {todo.id}>
            <div>
              <Label>
                <Input
                  type='checkbox'
                  id = {todo.id}
                  checked = {todo.completed}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                />
                <Indicator />
              </Label>
              {todo.title}
            </div>
            <AiOutlineClose onClick ={() => dispatch(removeTodo(todo.id))}/>
          </Li>
        ))}
          <ControlsSection>
            <small>
            {allTodos.filter((item) => (item.completed === false)).length} items left
            </small>
            <Controls/>
            <Button onClick={() => dispatch(clearCompleted())}>Clear Completed</Button>
          </ControlsSection>
        </List>
      </Container>
    </>
  )
}

export default TodoList