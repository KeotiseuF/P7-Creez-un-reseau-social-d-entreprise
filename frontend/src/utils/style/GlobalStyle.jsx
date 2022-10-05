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
    }

    img
    {
        width: 250px;
    }

    a, .deleted 
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
