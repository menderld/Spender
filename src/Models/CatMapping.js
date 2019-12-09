
export default class CatMapping{
    constructor(key, mapping){
        this.key = key;
        this.mapping = mapping;
    }

    getMapping(){
        return this.mapping;
    }

    getKey(){
        return this.key
    }
}