import { savePersonage } from "../../service/actionIndexedDB";
import { heroDefault } from "../../service/heroFunctions";

const Hero = ({personage, setPersonage, count, setCount}) => {
    const refreshData = (personage) => {
        setCount(++count);
        savePersonage(personage);
    }
    const killPersonage = () => {
        refreshData(heroDefault);
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
    const takeDamage = () => {
        personage.takeDamage();
        refreshData(personage);
    }
    const changeName = (e) => {
        personage.nameHero = e.target.value;
        refreshData(personage);
    }
    return (
        <>  
            <div>
                <button onClick={killPersonage}>Обнулить персонажа</button>
            </div>
            <div>
                <h2>Имя: <input onChange={changeName} defaultValue={personage?.nameHero}/></h2>
            </div>
            <div>
                <button onClick={takeDamage}>Получить урон</button>
            </div>
            <div>
                <ul className="baseSkills" >
                    <label>Параметры</label>
                    <li>Сила:
                        <button onClick={() => changeHaract('Force',-1)}>-</button> 
                        {personage.force}
                        <button onClick={() => changeHaract('Force',+1)}>+</button> 
                    </li>
                     <li>Ловкость:
                        <button onClick={() => changeHaract('Aility',-1)}>-</button> 
                        {personage.agility}
                        <button onClick={() => changeHaract('Aility',+1)}>+</button> 
                    </li>
                     <li>Интелект:
                        <button onClick={() => changeHaract('Intelligence',-1)}>-</button> 
                        {personage.intelligence}
                        <button onClick={() => changeHaract('Intelligence',+1)}>+</button> 
                    </li>
                     <li>Харизма:
                        <button onClick={() => changeHaract('Charisma',-1)}>-</button> 
                        {personage.charisma}
                        <button onClick={() => changeHaract('Charisma',+1)}>+</button> 
                    </li>
                     <li>Жизненная сила:
                        {personage.health}
                    </li>
                     <li>Уклонение:
                        {personage.evasion}
                    </li>
                     <li>Энергичность:
                        {personage.energy}
                    </li>
                </ul>
                <ul onClick={trainSkill}>
                    <label>Навыки</label>
                    <li>Атака: {personage.getSkillValue('attack')} <button name="attack">Тренировать</button></li>
                    <li>Стелс: {personage.getSkillValue('stealth')} <button name="stealth">Тренировать</button></li>
                    <li>Стрельба из лука: {personage.getSkillValue('archery')} <button name="archery">Тренировать</button></li>
                    <li>Обучаемость: {personage.getSkillValue('learnability')} <button name="learnability">Тренировать</button></li>
                    <li>Выживание: {personage.getSkillValue('survival')} <button name="survival">Тренировать</button></li>
                    <li>Медицина: {personage.getSkillValue('medicine')} <button name="medicine">Тренировать</button></li>
                    <li>Запугивание: {personage.getSkillValue('intimidation')} <button name="intimidation">Тренировать</button></li>
                    <li>Проницательность: {personage.getSkillValue('insight')} <button name="insight">Тренировать</button></li>
                    <li>Внешний вид: {personage.getSkillValue('appearance')} <button name="appearance">Тренировать</button></li>
                    <li>Манипулирование: {personage.getSkillValue('manipulation')} <button name="manipulation">Тренировать</button></li>
                </ul>
            </div>
        </>
    )
}

export default Hero;