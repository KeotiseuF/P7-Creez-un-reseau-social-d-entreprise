import styled, { keyframes } from "styled-components";

export const StyledForm = styled.form`
    margin-left: 22px;
    @media screen and (min-width: 630px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const StyledFrame = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 35px;
    @media screen and (min-width: 630px) {
        flex-direction: initial;
    }
`;

export const StyledLabel = styled.label`
    margin-bottom: 10px;
    font-size: large;
    @media screen and (min-width: 630px) {
        margin: 0px 20px;
    }
`;
export const StyledInputMessage = styled.input`
    width: 289px;
    height: 38px;
    border-radius: 13px;
`;

export const StyledImg = styled.img`
    margin-bottom: 20px;
    @media screen and (min-width: 630px) {
        width: 350px;
    }
`;

export const StyledInputImg = styled.input`
    font-size: large;
`;

export const StyledValidForm = styled.div`
    display: flex;
    justify-content: center;
`;

const animationValid = keyframes`
        0% {
            -webkit-transform: scale(0.5);
            transform: scale(0.5);
        }
        100% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
`;
export const StyledInputValidForm = styled.input`
    display: none;
    animation: 0.5s ${animationValid} ease-in-out;
`;

export const StyledInputModify = styled.input`
    margin-bottom: 50px;
`;
