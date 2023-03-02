import { savePersonage } from "../../service/actionIndexedDB";
import styles from './Backup.module.scss';


const Backup = ({personage, setPersonage, setCount, count}) => {
    let aRef;
    let inpRef;
    const saveFile = () => {
        const file = new Blob([JSON.stringify(personage)], {
            type: 'json'
        });
        const currentDate =new Intl.DateTimeFormat('ru').format(new Date());
        aRef.href = URL.createObjectURL(file);
        aRef.download = `backup${currentDate}.json`;
        aRef.click();
    }
    const loadFile = () => {
        inpRef.click();
    }
    const readFile = () => {
        let file = inpRef.files[0];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function() {
            const loadedPersonage = JSON.parse(reader.result);
            savePersonage(loadedPersonage);
            setTimeout(() => setCount(++count), 1000);
        };
        inpRef.type = 'text';
        inpRef.type = 'file';
    }
    return (
        <>
            <div className={styles.backup}>
                <div className={styles.buttonCont}>
                    <a ref={(e) => aRef = e } style={{visibility: 'hidden'}} >link </a>
                    <button onClick={saveFile} >Выгрузить персонажа в файл</button>
                </div>
                <div className={styles.buttonCont}>
                    <button onClick={loadFile}>Загрузить персонажа из файла</button>
                    <input ref={(e) => inpRef = e } type='file'  onChange={readFile} style={{visibility: 'hidden'}} />
                </div>
            </div>
        </>
    )
}

export default Backup;