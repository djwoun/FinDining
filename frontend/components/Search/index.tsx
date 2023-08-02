import styles from "./search.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

interface Props {
  locations: Array<Array<any>>;
  setList: React.Dispatch<React.SetStateAction<any[]>>;
  setFiltersVisibility: React.Dispatch<React.SetStateAction<any>>;
}

const Search: React.FC<Props> = ({ locations, setList, setFiltersVisibility }) => {

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newList: Array<Array<any>> = [];

    for (let i = 0; i < locations.length; i++) {
      if (locations[i][1].toUpperCase().includes(e.target.value.toUpperCase())) newList.push(locations[i]);
    }

    setList(newList);
  };
    
  return (
    <div className={styles.center}>
      <input className={styles.search} onChange={onSearch} type="search" placeholder="Search..." />
      <div onClick={() => { setFiltersVisibility((prevState) => (prevState ? 0 : 1)) }} className = {styles.emoji}><FontAwesomeIcon icon={faFilter} /></div>
    </div>
  )
}; 

export default Search;