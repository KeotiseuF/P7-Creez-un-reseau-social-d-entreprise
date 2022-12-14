import logo from "../../assets/icon-left-font.svg";
import { FrameLoader, StyledLoader } from "../../utils/style/Loader";

// Affiche une page de chargement.
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
