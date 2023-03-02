const maxValue = 5;
export const mapSkills = ['Нетренированный', 'Новичок', 'Ученик', 'Адепт', 'Эксперт', 'Мастер']

export const heroDefault = {
    nameHero: 'Nemo',
    _force:  0,
    _agility: 0,
    _intelligence:  0,
    _charisma: 0,
    _health: 3,
    _skills: [
        { 
            name: 'attack',
            value: 0,
            parent: 'force'
        },
        { 
            name: 'stealth',
            value: 0,
            parent: 'agility'
        },
        { 
            name: 'archery',
            value: 0,
            parent: 'agility'
        },
        { 
            name: 'learnability',
            value: 0,
            parent: 'intelligence'
        },
        { 
            name: 'survival',
            value: 0,
            parent: 'intelligence'
        },
        { 
            name: 'medicine',
            value: 0,
            parent: 'intelligence'
        },
        { 
            name: 'intimidation',
            value: 0,
            parent: 'charisma'
        },
        { 
            name: 'insight',
            value: 0,
            parent: 'charisma'
        },
        { 
            name: 'appearance',
            value: 0,
            parent: 'charisma'
        },
        { 
            name: 'manipulation',
            value: 0,
            parent: 'charisma'
        },
    ]
}

export class Personage {
    constructor(paramsHero) {
        this.nameHero = paramsHero.nameHero;
        this._force = paramsHero._force;
        this._agility = paramsHero._agility;
        this._intelligence = paramsHero._intelligence;
        this._charisma = paramsHero._charisma;
        this._health =  paramsHero._health;
        this._evasion = paramsHero._agility + 10;
        this._energy = paramsHero._agility +  paramsHero._intelligence ;
        this._skills = paramsHero._skills;
    }
    takeDamage() {
        let health = this._health;
        if (health === 0) return;
        this._health--;
    }
    getSkillValue(nameSkill) {
        return this._skills.find((val) => {
            return val.name == nameSkill;
        }).value;
    }
    trainSkill(nameSkill) {
        let oldSkillIndex = this._skills.findIndex((val) => {
            return val.name == nameSkill;
        });
        let oldSkill = this._skills[oldSkillIndex];
        if (oldSkill.value >= this[oldSkill.parent]) return;
        this._skills[oldSkillIndex].value ++;
    }
    get force() {
        return this._force
    }
    setForce(difference){
        let force = this._force;
        if (force === 0 && difference === -1) return;
        if (force >= maxValue && difference === +1 ) return;
        this._force =  this._force + difference;
        this._health = this._force + 3; 
    }
    get agility() {
        return this._agility
    }
    setAility(difference){
        let agility = this._agility ;
        if (agility === 0 && difference === -1) return;
        if (agility >= maxValue && difference === +1) return;
        this._agility =  this._agility + difference;
        this._evasion = this._agility + 10;
        this._energy = this._agility +  this._intelligence; 
    }
    get intelligence() {
        return this._intelligence
    }
    setIntelligence(difference){
        let intelligence = this._intelligence;
        if (intelligence === 0 && difference === -1) return;
        if (intelligence >= maxValue && difference === +1) return;
        this._intelligence =  this._intelligence + difference;
        this._energy = this._agility + this._intelligence;  
    }
    get charisma() {
        return this._charisma
    }
    setCharisma(difference){
        let charisma = this._charisma;
        if (charisma === 0 && difference === -1) return;
        if (charisma >= maxValue && difference === +1) return;
        this._charisma =  this._charisma + difference;
    }
    get health() {
        return this._health
    }
    get evasion() {
        return this._evasion
    }
    get energy() {
        return this._energy
    }
}


