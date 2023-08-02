import styles from "./help.module.scss"

interface Props {
    isVisible: boolean;
    CloseStrip: () => void;
}

const Strip: React.FC<Props> = (props) =>{
    return(
        /* bb is for putting background map so that popup would be more like popup*/
        <>
            <div onClick={() => {props.CloseStrip()}}className = {`${styles.bb} ${props.isVisible ? styles.showbb: ''}`}></div>
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
                            
                            <div className = {styles.left}>Strip Stores</div>
                            <div className = {styles.middle}>Explanation</div>
                            
                        </div>
                    </div>
                    <div className = {styles.row}>
                        <div className = {styles.menu}>
                            <div className = {styles.dot}></div>
                            {/* */}
                            <div className = {styles.left} >  <img src="cookout.png" className = {styles.image}></img>  </div>
                            <div className = {styles.middle}>Branch of a fast-food chain known for its drive-thru BBQ,<br/> burgers & more than 40 milkshake flavors</div>
                            
                        </div>
                    </div>
                    <div className = {styles.row}>
                        <div className = {styles.divider}></div>
                        <div className = {styles.menu}>
                            <div className = {styles.left} >  <img src="panera.png" className = {styles.image}></img>  </div>
                            <div className = {styles.middle}>Counter-serve bakery/cafe chain serving sandwiches<br/>& more, known for its bread & free WiFi.</div>

                        </div>
                    </div>
                    <div className = {styles.row}>
                        <div className = {styles.divider}></div>
                        <div className = {styles.menu}>
                            <div className = {styles.left} >  <img src="tacobell.png" className = {styles.image}></img>  </div>
                            <div className = {styles.middle}>Fast-food chain serving Mexican-inspired<br/>fare such as tacos, quesadillas & nachos.</div>
                            
                        </div>
                    </div>
                    <div className = {styles.row}>
                        <div className = {styles.divider}></div>
                        <div className = {styles.menu}>
                            <div className = {styles.left} >  <img src="jj.png" className = {styles.image}></img>  </div>
                            <div className = {styles.middle}>Counter-serve chain specializing in sub<br/> & club sandwiches, plus signature potato chips.</div>
                            
                        </div>
                    </div>
                    <div className = {styles.row}>
                        <div className = {styles.divider}></div>
                        <div className = {styles.menu}>
                            <div className = {styles.left} >  <img src="mcd.png" className = {styles.image}></img>  </div>
                            <div className = {styles.middle}>Classic, long-running fast-food chain<br/>known for its burgers & fries.</div>
                            
                        </div>
                    </div>
                    <div className = {styles.row}>
                        <div className = {styles.divider}></div>
                        <div className = {styles.menu}>
                            <div className = {styles.left} >  <img src="chip.png" className = {styles.image}></img>  </div>
                            <div className = {styles.middle}>Fast-food chain offering Mexican fare, including<br/>design-your-own burritos, tacos & bowls.</div>
                            
                        </div>
                    </div>
                    <div className = {styles.row}>
                        <div className = {styles.divider}></div>
                        <div className = {styles.menu}>
                            <div className = {styles.leftMenu} >  <img src="papajohns.jpg" className = {styles.image}></img>  </div>
                            <div className = {styles.middle}>Pizza take-out & delivery chain offering classic <br/>& specialty pizzas, plus wings, sides & desserts.</div>
                            
                        </div> 
                    </div>
                    <div className = {styles.solid}></div>
                </div>
                {/* Right Side of Menu */}
            </div>
            </>
    )
};

export default Strip;