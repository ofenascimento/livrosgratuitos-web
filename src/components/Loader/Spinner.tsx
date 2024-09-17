// components/Loader.js
import { ClipLoader } from "react-spinners";

const SpinnerLoader = () => {
    return (
        <>
            <ClipLoader size={14} color={"#FFFFFF"} loading={true} />
        </>

    );
};

export default SpinnerLoader;
