import styles from "./help.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

const Help: React.FC = () =>{
    return(
        /* bb is for putting background map so that popup would be more like popup*/
        <div className = {styles.bb}>
            <div className = {styles.bg}>
                {/* Icons */}
                <div>
                    <a href="http://localhost:3000/map" className = {styles.emoji}><FontAwesomeIcon icon={faLocationDot} /></a>
                   
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
                            <div className = {styles.middle}>The store is open when the border around the store button is green</div>
                            
                        </div>
                    </div>
                    <div className = {styles.row}>
                        <div className = {styles.divider}></div>
                        <div className = {styles.menu}>
                            <div className = {styles.left} >  <img src="red.png" className = {styles.image}></img>  </div>
                            <div className = {styles.middle}>The store is closed when the border around the store button is red</div>

                        </div>
                    </div>
                    <div className = {styles.row}>
                        <div className = {styles.divider}></div>
                        <div className = {styles.menu}>
                            <div className = {styles.left} >  <img src="List_Button.png" className = {styles.imageButton}></img>  </div>
                            <div className = {styles.middle}>Shows the dining location in a streamlined list sorted by filters</div>
                            
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
                            <div className = {styles.left}>Menu 5</div>
                            <div className = {styles.middle}> $ ??.??</div>
                           
                        </div>
                    </div>
                    <div className = {styles.row}>
                        <div className = {styles.divider}></div>
                        <div className = {styles.menu}>
                            <div className = {styles.left}>Menu 6</div>
                            <div className = {styles.middle}> $ ??.??</div>
                            
                        </div>
                    </div>
                </div>
                {/* Right Side of Menu */}
                
            </div>
        </div>
    )
};

export default Help;