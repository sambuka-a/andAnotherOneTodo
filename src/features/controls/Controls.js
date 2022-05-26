import { useDispatch } from "react-redux";
import {setControls} from './controls-slice';
import styled from 'styled-components'

import { Container } from "../../components/Container";

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
`;

export const Controls = () => {
  const dispatch = useDispatch();

  const handleFilter = (val) => dispatch(setControls(val));

  return (
    <div>
      <Container>
        <Button
          onClick={() => handleFilter('all')}>all</Button>
        <Button 
          onClick={() => handleFilter('active')}>active</Button>
        <Button
          onClick={() => handleFilter('completed')}>completed</Button>
      </Container>
    </div>
  );
}
