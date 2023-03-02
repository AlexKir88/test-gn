import Hero from "../Hero/Hero";
import Backup from "../Backup/Backup";
import { useEffect, useState } from 'react';
import { heroDefault } from '../../service/heroFunctions' ;
import {getSavedPersonage, saveDefaultPersonage} from '../../service/actionIndexedDB';
import styles from './Main.module.scss'


const Main = () => {
    const [personage, setPersonage] = useState()
    const [count, setCount ] = useState(0);

    useEffect( () => {
        saveDefaultPersonage(heroDefault);
        getSavedPersonage(setPersonage);
    }, [personage])

   

    return (
        <div className={styles.fullScreen}>
            {personage && <Hero personage={personage} setPersonage={setPersonage} count={count} setCount={setCount} />}
            <Backup personage={personage} setPersonage={setPersonage} count={count} setCount={setCount}/>
        </div>
    )
}

export default Main;