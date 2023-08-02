import styles from "./ZoomBtn.module.scss"

interface Props {
    ZoomInFn: (step: number) => void;
    ZoomOutFn: (step: number) => void;
    ZoomResetFn: () => void;
    OpenHelp: () => void;
    OpenStrip: () => void;
}




const ZoomBtn: React.FC<Props> = ({ ZoomInFn, ZoomOutFn, ZoomResetFn, OpenHelp, OpenStrip }) =>{
    const STEP: number = 0.5;

    return (
        <div className={styles.btn}>
            <button onClick={() => ZoomInFn(STEP)} className={styles.ZoomIn}></button>
            <button onClick={() => ZoomOutFn(STEP)} className={styles.ZoomOut}></button>
            <button onClick={ZoomResetFn} className={styles.ZoomReset}></button>
            <button onClick={OpenHelp} className={styles.help}></button>
            <button onClick={OpenStrip} className={styles.strip}></button>
        </div>
    )
};

export default ZoomBtn;