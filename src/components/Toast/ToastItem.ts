import { ToastType } from "./ToastType";

export type ToastItem = {
    id: number;
    title: string;
    description?: string;
    type?: ToastType;
};