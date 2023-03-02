import Hero from "../Hero/Hero";
import { heroDefault } from "../../service/heroFunctions";
import { saveDefaultPersonage, getSavedPersonage } from "../../service/actionIndexedDB";
import { useEffect, useState } from 'react';


const Main = () => {
    const [personage, setPersonage] = useState()
    //ниже счетчик для запуска рендера, поскольку Реакт не видит изменений внутри екземпляра класса personage 
    //и не рендерит при изменении его свойств.
    const [count, setCount ] = useState(0);

    useEffect( () => {
        saveDefaultPersonage(heroDefault);
        getSavedPersonage(setPersonage);
    }, [personage])

   

    return (
        <>
            {personage && <Hero personage={personage} setPersonage={setPersonage} count={count} setCount={setCount} />}
        </>
    )
}

export default Main;