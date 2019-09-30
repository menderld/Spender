
export default class Group{

    /*
        @category: String
    */
    constructor(category){
        this.Category = category;
        this.Transactions = []
    }

    /*
        @category: String
        @transactions: Transaction[]
    */
    constructor(category, transactions){
        this.Category = category;
        this.Transactions = transactions;
    }
}