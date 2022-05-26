import styled from 'styled-components'
import ThemeSwitcher from '../features/theme/ThemeSwitcher';

import {Container} from './Container'

const HeaderElement = styled.header`
    box-shadow: var(--shadow);
    background-image: var(--bg-pic);
    background-size: cover;
    background-repeat: no-repeat;
    background-color: var(--colors-list);
    height: 250px;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3rem 0 1rem 0;
`;
const Title = styled.h1`
    letter-spacing: 0.7rem;
`;

const Header = () => {
  return (
    <HeaderElement>
        <Container>
            <Wrapper>
                <Title>TODO</Title>
                <ThemeSwitcher/>
            </Wrapper>
        </Container>
    </HeaderElement>
  )
}

export default Header