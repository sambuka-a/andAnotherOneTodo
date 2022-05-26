import styled from 'styled-components'
import { Container } from '../../components/Container'

import { useDispatch } from 'react-redux'
import { addTodo } from './todos-slice'

const Input = styled.input`
    position: relative;
    top: -7.6rem;
    width: 100%;
    padding: 1rem;
    background: var(--colors-text);
    border: none;
    border-radius: 3px;
`

const NewTodo = () => {
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(e.target.title.value) {
            dispatch(addTodo(e.target.title.value));
            e.target.reset();
        }
    }

  return (
    <Container>
        <form onSubmit = {handleSubmit}>
            <Input type="text" name="title" placeholder="Create a new todo..." />
        </form>
    </Container>
  )
}

export default NewTodo