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
`;

function GlobalStyle() {
  return <StyledGlobalStyle />;
}

export default GlobalStyle;
