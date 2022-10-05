import styled, { keyframes } from "styled-components";

export const StyledForm = styled.form`
    margin-left: 22px;
`;

export const StyledFrame = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 35px;
`;

export const StyledLabel = styled.label`
    margin-bottom: 10px;
    font-size: large;
`;
export const StyledInputMessage = styled.input`
    width: 289px;
    height: 38px;
    border-radius: 13px;
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
