import { createGlobalStyle } from "styled-components";
import colors from "./colors";
const StyledGlobalStyle = createGlobalStyle`
    *
    {
        box-sizing: border-box;
    }

    body
    {
        font-family: "Lato";        
        background-color: ${colors.secondary};
        margin: 0px;
        @media screen and (min-width: 900px) {
            display: flex;
            justify-content: center;
            background: ${colors.tertiary}
        }
    }

    #root
    {
        @media screen and (min-width: 900px) {
            width: 850px;
            background: ${colors.secondary};
            position: absolute;
            min-height: 100%;
        }
    }

    img
    {
        width: 250px;
    }

    a, .deleted, #valid_form 
    {
        text-decoration: none;
        color: white;
        border: solid ${colors.primary};
        border-radius: 25px 0px 25px 1px;
        padding: 10px;
        box-shadow: 7px 8px 4px 2px rgb(0 0 0 / 47%);
         background: ${colors.tertiary};
        &:active {
            background: none;
            color: black;        
            box-shadow: 5px 3px 4px 2px rgb(0 0 0 / 33%);
            transform: translate(0px, 5px);
            transition: transform 250ms ease-in-out;
        }
    }
`;

function GlobalStyle() {
    return <StyledGlobalStyle />;
}

export default GlobalStyle;
