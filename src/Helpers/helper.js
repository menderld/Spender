export const ENDING = "$";

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i].constains(obj)) {
            return true;
        }
    }
    return false;
}

export const ListedCategories =
{
    "gas": ["shell oil", "costco gas", "arco", "chevron 0"],
    "food": ["costco", "qfc", "safeway", "cafe", "bai tong", "mod pizza",  "gelato", "taco bell", "pho hoa", "senor taco", "torero", "burguer king",
            "einstein bro bagels", "homegrown", "gyro to go", "chick-fil", "bistro", "starbucks", "jak's grill", "tanoor lebanese", "coffee", "garlic crush",
            "cheesecake", "el toreador", "matador redmond", "tavern hall", "tipsy cow burger", "lola restaurant", "panera bread", "outback", "wholefds",
            "le panier", "oto sushi", "7-eleven", "katsu burger", "malt &amp; vine", "ristorante italian", "dough zone", "boba t", "pinkberry",
            "lincoln south food", "tutta bella", "chipotle", "coquette bake shop", "tat's delicatessen",
        "carmine's", "anthony's homeport kirk", "tst* the french bakery", "subway 03285244", "little si restaurant",
        "subway 03285244", "buenos aires grill", "un bien", "the slip", "taqueria cantina", "pizza", "bubble tea", "frankies modern diner",
        "kanishka indian cuisi", "ittos tappas", "subway 05210679", "jinya ramen", "five guys", "redmond's bar &amp; grill",
        "agave cocina", "alaskan sourdough bakery", "woodblock", "il terrazzo carmine", "mcglinns public house", "munchen haus",
        "oph redmond", "subway", "smallwoods harvest llc", "pike place bakery", "tulalip/quil ceda liquor",
        "sq *kiwanis of redmond", "din tai fung", "leavenworth sausage garte", "red robin", "mcdonald's", "stone korean restaurant",
        "wm supercenter", "taqueria el rinconsito", "paella pro", "juicys 3 at the fair", "auntie anne's wa101", "marlowes", "rmcf - leavenworth"],
    "clothes": [],

    "amazon": ["amazon", "amzn mktp"],
    "rebtel": ["rebtel"],
    "house": ["wave", "puget sound energy"],
    "riding": ["uber", "lyft"],
    "travel": ["american air", "aa inflight visa face", "652 flight terminal", "denver airport", "delta air", "jetblue",
                "alaska air"],
    "montly premiums": ["youtube premiu", "youtubepremiu", "hulu", "netflix", "consumerreports"],
    "stores": ["home depot", "wal-mart", "dollartree", "target"],
    "tmobile": ["tmobile"],
    "clothes": ["old navy", "ross", "aldo us", "macys", "dickssporting", "express#0153", "goodwill", "payless shoes", "forever 21",
                "dsw bear creek village", "uniqlo bellevue"],
    "sports": ["24 hour fitness", "sq *join in intl dba exte"],
    "ikea": ["ikea"],
    "taxes": ["intuit *turbotax", "mailbox shipping center"],
    "laura certifications": ["bellevue college cont ed", "911 drivng sch. lake wash", "wa dol lic &amp; reg 56215"],
    "fun": ["space needle", "d2 at benaroya", "regal cinemas bella boteg", "wsferries-colman dock", "groupon", "seattle great wheel", "woodmark waterfront ad", "woodland park zoo",
            "woodlandpark zoo", "sq *jet skis ahoy", "shoreline watercraft", "butchart gardens", "clipper ferry svc vci", "pgp motorsports",
        "sq *gosq.com octavio alle", "washington state fair", "xtadium lounge"],
    "parking": ["u-park system 041", "ipm fgi cp"],
    "medical":["living well health cent", "bartell drug"],
    "not mine":["wildwater river guides"],
    "movies": ["century theatres", "cnk*cinemark.com", "acmetec*seaaqua"],
    "boba tea": ["mi tea", "over the rainbow", "sharetea"]
}


function getPath(item, categories){
    if(categories["category"] === ENDING){
        if(categories["transactions"].contains(item)){
            return [ENDING];
        }

        return null;
    }

    for(var index in categories){
        let cat = categories[index];
        let path = getCategoryHierarchy(item, cat)
        if(path){
            path.push(cat["category"]);
            return path;
        }
    }

    return []
}

/*
    @categories: categories
    @return: {"cat": [transactions]}
*/
function getItems(categories){
    let res = []

    for(var i in categories){
        if(categories[i]["category"] == ENDING){
            categories[i]["category"].transactions.forEach(function(ele){
                res.push(ele.transactions[0])
            })
            return;
        }

        res.concat(getItems(categories[i]["transactions"]));
    }

    return res;
}

/*
    @item: value to look up
    @categories: categories
    @return [string] path of categories where item belongs to
*/
export const getCategoryHierarchy = function(item, categories)
{
    if(item == null){
        return null;
    }
    item = item.toLowerCase();
    if(item.includes("payment thank you"))
    {
        return null;
    }

    let res = {"category": "other", "subCategory": ""};
    for(var cat in categories){
        if(categories[cat].findIndex(prod=>item.includes(prod)) >= 0){
            return {"category": cat, "subCategory": categories[cat]};
        }
    }

    return res;
}

/*
*@data: Transaction[]
*@part: options are : day, week, month, year
*return: [] of transactions grouped by time range
*/
export const partitionByRange = function(data, part){
    data.sort(function(a, b){
        if(a.TransDate < b.TransDate){
            return -1
        }
        if(a.TransDate > b.TransDate){
            return 1;
        }
        return 0;
    });

    var buckets = [];
    var i = 0;

    while(i < data.length){

        var j = i + 1;
        var aux = [data[i]];

        while(j < data.length && getPart(data[j].TransDate, part) == getPart(data[i].TransDate, part)){
            aux.push(data[j]);
            j += 1
        }

        i = j;
        buckets.push({"date":getPart(aux[0].TransDate, part),  "values":aux});
    }

    return buckets;
}

function getPart(date, part){
    switch(part){
        case "day":
            return getDay(date)
        case "week":
            return getWeekNumber(date)
        case "month":
            return date.getUTCMonth()
        case "year":
            return date.getUTCFullYear()
    }
}

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);

    return weekNo;
}

function getDay(d){
    var now = new Date(d);
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}


export const groupDataByCategory = function(transactions, categories){
    if(!transactions || transactions.length == 0)
    {
        return;
    }

    let expenses = {};
    let itemsByCat = {};

    transactions.forEach (function(value){
        if(!value.Description)
        {
            return;
        }

        let catPath = getCategoryHierarchy(value.Description, categories);
        if(!catPath || catPath.length == 0)
        {
            return;
        }

        let cat = catPath.category;
        if((cat in expenses) == false)
        {
            expenses[cat] = 0;
            itemsByCat[cat] = []
        }
        expenses[cat] += value.Price;
        itemsByCat[cat].push(value);
    });

    return [expenses, itemsByCat];

}


function transform(categories){
    let res = [];

    let index = 1;
    for(var key in categories){
        let g = []
        for(var t in categories[key]){
            g.push({"category": ENDING, "transactions": [categories[key][t]]})
        }

        res.push({ "category": key, "transactions": g});
    }


    console.log(JSON.stringify(res, null, 2));// spacing level = 2
}