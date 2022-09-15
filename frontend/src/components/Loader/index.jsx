import logo from "../../assets/icon-left-font.svg";
import styled from "styled-components";

const FrameLoader = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 170px;
`;

const StyledLoader = styled.img`
  width: 360px;
`;

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
