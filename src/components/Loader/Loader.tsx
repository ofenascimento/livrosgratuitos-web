// components/Loader.js
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader size={50} color={"#FFFFFF"} loading={true} />
    </div>
  );
};

export default Loader;
