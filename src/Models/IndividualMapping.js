
export default class IndividualMapping{
    constructor(key, matches){
        this.key = keyl
        this.matches = matches;
    }

    matches(text){
        return this.matches.filter(e => text.includes(e)).length > 0;
    }

    addMatch(match){
        if(!this.matches.includes(match)){
            this.matches.add(match)
        }
    }
}