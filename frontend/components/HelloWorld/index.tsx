import styles from "./helloworld.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'

const HelloWorld: React.FC = () => {
  return (
    <h5 className={styles.title}>Hello World (from a component)! <FontAwesomeIcon icon={faGlobeAmericas} /></h5>
  )
};

export default HelloWorld;