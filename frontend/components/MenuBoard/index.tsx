import styles from "./MenuBoard.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

interface Props{
    Menu: string;
    priceone: string;
    pricetwo: string;
    pricethree: string;
}
interface Props extends Array<Props>{}

const MenuBoard: React.FC<Props> = (props) =>{

    const category: Props = [
        {Menu: "Entrees", priceone: "", pricetwo: "Sandwich", pricethree: "Meal"},
        {Menu: "Sides", priceone: "", pricetwo: "Medium", pricethree: "Large"},
        {Menu: "Treats", priceone: "", pricetwo: "Medium", pricethree: "Large"},
        {Menu: "Beverages", priceone: "Small", pricetwo: "Medium", pricethree: "Large"}
    ]
    
    const menus: Props = [
        {Menu: "ChickenBurger", priceone: "", pricetwo: "$ 12.34", pricethree: "$ 56.78"},
        {Menu: "SpicyBurger", priceone: "", pricetwo: "$ 56.78", pricethree: "$ 90.12"},
        {Menu: "SpicyBurger", priceone: "", pricetwo: "$ 56.78", pricethree: "$ 90.12"}
    ]
    //let i: number = 0;
    
    return(
        /* bb is for putting background map so that popup would be more like popup*/
        <div className = {styles.bb}>
            <div className = {styles.bg}>
                {/* Icons */}
                <div>
                    <div className = {styles.splitleft}>
                      <a className = {styles.emoji}><FontAwesomeIcon icon={faHouse} /></a>
                    </div>
                    <div className = {styles.splitright}>
                      <div className = {styles.button} id = {styles.buttonFunc}>
                          <input type = "checkbox" className = {styles.checkbox} />
                            <div className = {styles.knobs}>
                              <span>Meal Swipe</span>
                            </div>
                          <div className = {styles.layer}></div>
                        </div>
                    </div>
                </div>
                {/*Menu */}
                <div className = {styles.scroll}>
                {category.map(item=>(
                    <div>
                        <div className = {styles.solid}></div>
                        <div className = {styles.row}>
                            <div className = {styles.list}>
                                <div className = {styles.first}> {item.Menu}</div>
                                <div className = {styles.second}> {item.priceone}</div>
                                <div className = {styles.third}> {item.pricetwo}</div>
                                <div className = {styles.third}> {item.pricethree}</div>
                            </div>
                        </div>
                        <div className = {styles.dot}></div>
                        <div>
                            {menus.map(mitem => (
                            <div className = {styles.row}>
                                <div className = {styles.divider}></div>
                                <div className = {styles.menu}>
                                    <div className = {styles.first}>{mitem.Menu}</div>
                                    <div className = {styles.second}>{mitem.priceone}</div>
                                    <div className = {styles.third}> {mitem.pricetwo}</div>
                                    <div className = {styles.fourth}> {mitem.pricethree}</div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                ))}
                  <div className = {styles.solid}></div>
                </div>
            </div>
        </div>
    )
};

export default MenuBoard;