import { savePersonage } from "../../service/actionIndexedDB";
import { heroDefault, mapSkills } from "../../service/heroFunctions";
import styles from './Hero.module.scss';
import {BsPencilFill} from 'react-icons/bs';
const Hero = ({personage, count, setCount}) => {
    let inpRef;
    let nameRef;
    const refreshData = (personage) => {
        savePersonage(personage);
        setCount(++count);
    }
    const killPersonage = () => {
        refreshData(heroDefault);
    }
    const takeDamage = () => {
        personage.takeDamage();
        refreshData(personage);
    }
    const changeHaract = (par, val) => {
        personage['set'+par](val) ;
        refreshData(personage);
    }
    const trainSkill = (e) => {
        if (e.target.tagName !== 'BUTTON') return;
        personage.trainSkill(e.target.name);
        refreshData(personage);
    }
    const callInput = (e) => {
        nameRef.hidden = true;
        inpRef.hidden = false;
    }
    const changeName = () => {
        personage.nameHero = inpRef.value;
        inpRef.hidden = true;
        nameRef.hidden = false;
        refreshData(personage);
    }
    const pressEnter = (e) => {
        if (!(e.code === 'Enter' || e.code === 'NumpadEnter' || e.keyCode === 13)) {
            return
        };
        changeName();
    }

    return (
        <>  
            <div className={styles.header}>
                <div>
                    <h2>
                        Имя: <span ref={e => nameRef = e } onClick={callInput}>{personage?.nameHero} <BsPencilFill size={10} /> </span> 
                        <input defaultValue={personage?.nameHero} ref={e => inpRef = e} onBlur={changeName} onKeyDown={pressEnter} hidden  type='text'/>
                    </h2>
                    <button onClick={takeDamage}>Получить урон</button>
                    <button onClick={killPersonage}>Обнулить персонажа</button>
                </div>
            </div>
        
            <div className={styles.baseSkills} >
                <ul >
                    <h2>Параметры</h2>
                    <li><h4>Сила:</h4>
                        <button onClick={() => changeHaract('Force',-1)}>-</button> 
                        {personage.force}
                        <button onClick={() => changeHaract('Force',+1)}>+</button> 
                    </li>
                     <li><h4>Ловкость:</h4>
                        <button onClick={() => changeHaract('Aility',-1)}>-</button> 
                        {personage.agility}
                        <button onClick={() => changeHaract('Aility',+1)}>+</button> 
                    </li>
                     <li><h4>Интелект:</h4>
                        <button onClick={() => changeHaract('Intelligence',-1)}>-</button> 
                        {personage.intelligence}
                        <button onClick={() => changeHaract('Intelligence',+1)}>+</button> 
                    </li>
                     <li><h4>Харизма:</h4>
                        <button onClick={() => changeHaract('Charisma',-1)}>-</button> 
                        {personage.charisma}
                        <button onClick={() => changeHaract('Charisma',+1)}>+</button> 
                    </li>
                     <li><h4>Жизненная сила:</h4>
                        <p>{personage.health}</p>
                    </li>
                     <li><h4>Уклонение:</h4>
                        <p>{personage.evasion}</p>
                    </li>
                     <li><h4>Энергичность:</h4>
                        <p>{personage.energy}</p>
                    </li>
                </ul>
            </div>
            <div className={styles.extraSkills}>   
                <ul onClick={trainSkill}>
                    <h2>Навыки</h2>
                    <li><h4>Атака:</h4><span>{mapSkills[personage.getSkillValue('attack')]}</span><button name="attack">Тренировать</button></li>
                    <li><h4>Стелс:</h4><span>{mapSkills[personage.getSkillValue('stealth')]}</span><button name="stealth">Тренировать</button></li>
                    <li><h4>Стрельба из лука:</h4><span>{mapSkills[personage.getSkillValue('archery')]}</span><button name="archery">Тренировать</button></li>
                    <li><h4>Обучаемость:</h4><span>{mapSkills[personage.getSkillValue('learnability')]}</span><button name="learnability">Тренировать</button></li>
                    <li><h4>Выживание:</h4><span>{mapSkills[personage.getSkillValue('survival')]}</span><button name="survival">Тренировать</button></li>
                    <li><h4>Медицина:</h4><span>{mapSkills[personage.getSkillValue('medicine')]}</span><button name="medicine">Тренировать</button></li>
                    <li><h4>Запугивание:</h4><span>{mapSkills[personage.getSkillValue('intimidation')]}</span><button name="intimidation">Тренировать</button></li>
                    <li><h4>Проницательность:</h4><span>{mapSkills[personage.getSkillValue('insight')]}</span><button name="insight">Тренировать</button></li>
                    <li><h4>Внешний вид:</h4><span>{mapSkills[personage.getSkillValue('appearance')]}</span><button name="appearance">Тренировать</button></li>
                    <li><h4>Манипулирование:</h4><span>{mapSkills[personage.getSkillValue('manipulation')]}</span><button name="manipulation">Тренировать</button></li>
                </ul>
            </div>
        </>
    )
}

export default Hero;