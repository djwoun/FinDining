import styles from "./help.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

interface Props {
    isVisible: boolean;
    CloseHelp: () => void;
}

const Help: React.FC<Props> = (props) =>{
    return(
        /* bb is for putting background map so that popup would be more like popup*/
        <>
            <div onClick={() => {props.CloseHelp()}}className = {`${styles.bb} ${props.isVisible ? styles.showbb: ''}`}></div>
            <div className = {`${styles.bg} ${props.isVisible ? styles.showbg: ''}`}>
                {/* Icons */}
                <div>
                    {/* <a onClick={() => {props.CloseHelp()}} className = {styles.emoji}><FontAwesomeIcon icon={faLocationDot} /></a> */}
                   
                </div>
                {/* Left Side of Menu */}
                <div className = {styles.splitleft}>
                    <div className = {styles.solid}></div>
                    <div className = {styles.row}>
                        <div className = {styles.list}>
                            
                            <div className = {styles.left}>Button</div>
                            <div className = {styles.middle}>Explanation</div>
                            
                        </div>
                    </div>
                    <div className = {styles.row}>
                        <div className = {styles.menu}>
                            <div className = {styles.dot}></div>
                            {/* */}
                            <div className = {styles.left} >  <img src="open.png" className = {styles.image}></img>  </div>
                            <div className = {styles.middle}>The store is open when the border around<br/> the store button is green</div>
                            
                        </div>
                    </div>
                    <div className = {styles.row}>
                        <div className = {styles.divider}></div>
                        <div className = {styles.menu}>
                            <div className = {styles.left} >  <img src="red.png" className = {styles.image}></img>  </div>
                            <div className = {styles.middle}>The store is closed when the border around <br/>the store button is red</div>

                        </div>
                    </div>
                    <div className = {styles.row}>
                        <div className = {styles.divider}></div>
                        <div className = {styles.menu}>
                            <div className = {styles.left} >  <img src="List_Button.png" className = {styles.imageButton}></img>  </div>
                            <div className = {styles.middle}>Shows the dining location in a streamlined <br/>list sorted by filters</div>
                            
                        </div>
                    </div>
                    <div className = {styles.row}>
                        <div className = {styles.divider}></div>
                        <div className = {styles.menu}>
                            <div className = {styles.left} >  <img src="Zoom_in.png" className = {styles.imageButton}></img>  </div>
                            <div className = {styles.middle}>Zooms in to the map</div>
                        
                        </div>
                    </div>
                    <div className = {styles.row}>
                        <div className = {styles.divider}></div>
                        <div className = {styles.menu}>
                            <div className = {styles.left} >  <img src="Zoom_out.png" className = {styles.imageButton}></img>  </div>
                            <div className = {styles.middle}>Zooms out of the map</div>
                            
                        </div>
                    </div>
                    <div className = {styles.row}>
                        <div className = {styles.divider}></div>
                        <div className = {styles.menu}>
                            <div className = {styles.left} >  <img src="Zoom_reset.png" className = {styles.imageButton}></img>  </div>
                            <div className = {styles.middle}>Resets to the original location</div>
                           
                        </div>
                    </div>
                    <div className = {styles.row}>
                        <div className = {styles.divider}></div>
                        <div className = {styles.menu}>
                            <div className = {styles.leftMenu} >  <img src="dining.png" className = {styles.imageMenu}></img>  </div>
                            <div className = {styles.middleMenu}>Provides general information about the store.<br/> Information includes open/close times, rating, and menu. The menu popup can be open by the button top left. <br/>The location of the restaurant is shown.</div>
                        </div>
                    </div>
                    <div className = {styles.solid}></div>
                </div>
                {/* Right Side of Menu */}
            </div>
            </>
    )
};

export default Help;