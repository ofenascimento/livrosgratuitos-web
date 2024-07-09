import { ClipLoader } from "react-spinners";
import { IFullScreenLoader } from "./types";
import styles from './styles.module.scss'

const FullScreenLoader = ({ label }: IFullScreenLoader) => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center z-50 bg-black">
      <div className={styles.loader}></div>
      {label && <span className="mt-8 text-white font-semibold  font-raleway text-lg">{label}</span>}
    </div>
  );
};

export default FullScreenLoader;
