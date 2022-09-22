import logo from "../../assets/icon-left-font.svg";
import styled from "styled-components";
import { FrameLoader, StyledLoader } from "../../utils/style/Loader";

function Loader() {
  return (
    <div>
      <FrameLoader>
        <StyledLoader src={logo} alt="logo-Groupomania" />
      </FrameLoader>
    </div>
  );
}

export default Loader;
