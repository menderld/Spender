import CatMapping from './CatMapping'

export default class MappingFactory{
    constructor(data){
        this.data = data === undefined ? {} : MappingFactory.Deserialize(data);
        this.getOrCreateMapping = this.getOrCreateMapping.bind(this);
    }

    static Deserialize(data){
        let res = {}
        for(var key in data){
            res[key] = new CatMapping(key, data[key].mapping)
        }
        return res
    }

    getOrCreateMapping(key){
        if(key in this.data){
            return this.data[key];
        }

        let newMapping = new CatMapping(key, {"default": [""]});
        this.data[key] = newMapping;
        return newMapping;
    }

    getMapping(key){
        if(key in this.data){
            return this.data[key];
        }

        return undefined
    }

    setMapping(key, mapping){
        if(mapping instanceof CatMapping){
            this.data[key] = mapping;
        }
        else{
            this.data[key] = new CatMapping(key, mapping);
        }
    }
}