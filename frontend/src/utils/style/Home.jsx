import styled from "styled-components";

export const StyledHeader = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 70px;
`;

export const StyledLogo = styled.img`
    width: 250px;
    height: 100px;
`;

export const StyledNavHome = styled.nav`
    display: flex;
    width: 100%;
    justify-content: space-around;
`;

export const StyledMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (min-width: 630px) {
        flex-direction: initial;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: initial;
    }
`;
