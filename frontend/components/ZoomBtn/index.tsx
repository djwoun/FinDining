import styles from "./ZoomBtn.module.scss"

const ZoomBtn: React.FC = () =>{
    return(
        <>
            <div className = {styles.bg}>
                <div className = {styles.btn}>
                    <div className = {styles.ZoomIn}></div>
                    <div className = {styles.ZoomOut}></div>
                    <div className = {styles.ZoomReset}></div>
                </div>
            </div>
        </>
    )
};

export default ZoomBtn;