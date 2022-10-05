import styled from "styled-components";
import colors from "./colors";

export const StyledConnect = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const StyledHeader = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 60px;
`;

export const StyledPrimaryTitle = styled.h1`
    color: ${colors.tertiary};
    font-size: x-large;
    text-shadow: 7px 8px 13px black;
`;

export const StyledSecondaryTitle = styled.h2`
    color: ${colors.tertiary};
    font-size: larger;
    text-shadow: 7px 8px 13px black;
`;

export const StyledGroupo = styled.span`
    color: ${colors.primary};
`;

export const StyledForm = styled.form`
    margin-top: 50px;
    background: ${colors.form};
    border-radius: 50px 50px 0px 0px;
    box-shadow: 13px 11px 28px 0px rgb(169 89 151 / 69%);
    width: 285px;
`;

export const StyledFrame = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

export const StyledLabel = styled.label`
    font-size: larger;
    margin: 20px 0px 15px;
`;

export const StyledInput = styled.input`
    border-radius: 10px;
    width: 225px;
`;

export const StyledSubmits = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    padding-bottom: 32px;
`;

export const StyledOneSubmit = styled.input`
    border-radius: 50px;
    font-size: large;
`;

export const StyledError = styled.p`
    font-size: large;
    margin-left: 25px; ;
`;

export const StyledDisplayPass = styled.input`
    margin: 5px 0px 0px 170px;
    border: none;
    background: none;
    font-size: medium;
    text-decoration: underline;
    text-underline-offset: 3px;
`;

export const StyledListing = styled.ul`
    font-size: large;
`;

export const StyledLastBlock = styled.div`
    background: #fc466b;
    border-radius: 0px 0px 50px 50px;
    box-shadow: 13px 11px 28px 0px rgb(169 89 151 / 69%);
    width: 285px;
    position: relative;
    top: -2px;
    display: flex;
    justify-content: space-between;
    padding: 0px 9px 30px 12px;
`;

export const StyledInputLastBlock = styled.input`
    border: none;
    background: none;
    font-size: little;
    text-decoration: underline;
    text-underline-offset: 3px;
    font-weight: 700;
`;
