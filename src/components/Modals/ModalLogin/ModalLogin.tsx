import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { MdClose } from 'react-icons/md';
import styles from './styles.module.scss';

interface IModalLogin {
    isOpen: boolean;
    onClose: () => void;
}

const ModalLogin: React.FC<IModalLogin> = ({ isOpen, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (modalRef.current) {
            if (isOpen) {
                setTimeout(() => {
                    modalRef.current!.classList.add(styles.translateY0);
                }, 10);
            } else {
                modalRef.current.classList.remove(styles.translateY0);
            }
        }
    }, [isOpen]);

    return (
        <div className={`${styles.modalWrapper} ${isOpen ? 'flex' : styles.hidden}`}>
            <div className={styles.modalOverlay} onClick={onClose}></div>
            <div
                ref={modalRef}
                className={styles.modalContent}
            >
                <div className='flex justify-end items-end'>
                    <MdClose className='cursor-pointer' size={20} onClick={onClose} />
                </div>
                <h2 className="text-3xl font-bold text-center text-main-100">Login</h2>
                <p className="mt-2 text-center mb-6 text-gray-300 font-raleway">Entre com o seu email</p>
                <input type="text" className='border-2 bg-dark-background border-gray-600 p-2 m-2 rounded-lg text-white font-raleway' placeholder='Digite seu email' />
                <input type="password" className='border-2 bg-dark-background border-gray-600 p-2 m-2 rounded-lg text-white font-raleway' placeholder='Digite sua senha' />
                <button onClick={onClose} className="mt-4 bg-main-400 rounded-lg text-white px-4 py-2 mx-2 font-base font-semibold lg:font-medium font-poppins">
                    Entrar
                </button>
                <div className='mt-6 px-4'>
                    <p className='text-xs font-light font-poppins text-center border-b-2 border-b-gray-600 pb-4'>Ao continuar você concorda com nossos <span className='text-main-200'>Termos de Servico</span> e <span className='text-main-200'>Política de Privacidade</span> </p>
                </div>
                <div className='text-sm mt-6 flex flex-col font-poppins justify-center items-center gap-2'>
                    <h5>Esqueceu a senha? <Link href='/'><span className='text-main-200'>Resetar</span></Link></h5>
                    <h5>Não tem conta? <Link href='/'><span className='text-main-200'>Criar conta</span></Link></h5>
                </div>
            </div>
        </div>
    );
};

export default ModalLogin;
