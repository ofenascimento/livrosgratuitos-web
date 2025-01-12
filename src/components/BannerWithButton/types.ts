export interface IBannerWithButton {
    title: string;
    subtitle: string;
    srcImg: string;
    buttonLabel: string;
    onClick: () => void;
    backgroundColor?: string;
}