import { Personage } from "./heroFunctions";


export const saveDefaultPersonage = (personage) => {
    let isFirstTime = false;
    const indDB = indexedDB.open('game', 1);
    indDB.onupgradeneeded = () => {
        indDB.result.createObjectStore('personage');
        isFirstTime = true;
    }
    indDB.onsuccess = () => {
        if (isFirstTime) {
            const transaction = indDB.result.transaction('personage','readwrite');
            const hero = transaction.objectStore('personage');
            const reqPut = hero.put(personage, 'mainHero');
            reqPut.onsuccess = () => {
                console.log(personage);
            }
        }
    }
}

export const savePersonage = (personage) => {
    const indDB = indexedDB.open('game', 1);
    indDB.onupgradeneeded = () => {
        indDB.result.createObjectStore('personage');
    }
    indDB.onsuccess = () => {
        const transaction = indDB.result.transaction('personage','readwrite');
        const hero = transaction.objectStore('personage');
        const reqPut = hero.put(personage, 'mainHero');
    }
}

export const getSavedPersonage = (setPersonage) => {
    const indDB = indexedDB.open('game', 1);
    indDB.onsuccess = () => {
        const transaction = indDB.result.transaction('personage','readonly');
        const hero = transaction.objectStore('personage');
        const reqGet = hero.get('mainHero');
        reqGet.onsuccess = () => {
            setPersonage(new Personage(reqGet.result));
        }
    }
}