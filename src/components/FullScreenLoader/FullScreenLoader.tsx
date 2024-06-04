import { ClipLoader } from "react-spinners";
import { IFullScreenLoader } from "./types";

const FullScreenLoader = ({ label }: IFullScreenLoader) => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center z-50 bg-black">
      <ClipLoader size={50} color={"#FFFFFF"} loading={true} />
      {label && <span className="mt-2 text-white">{label}</span>}
    </div>
  );
};

export default FullScreenLoader;
