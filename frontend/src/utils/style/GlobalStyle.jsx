import { createGlobalStyle } from "styled-components";

const StyledGlobalStyle = createGlobalStyle`
    *
    {
        box-sizing: border-box;
    }

    body
    {
        font-family: "Lato";
    }
`;

function GlobalStyle() {
  return <StyledGlobalStyle />;
}

export default GlobalStyle;
