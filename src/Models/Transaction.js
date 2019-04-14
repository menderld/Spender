
export default class Transactions{

    constructor(type, category, description, price, transDate, postDate){
        this.Type = type;
        this.Name = description;
        this.Price = price;
        this.TransDate = transDate;
        this.PostDate = postDate;
        this.Category = category;
    }
}