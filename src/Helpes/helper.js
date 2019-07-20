const category =
{
    "gas": ["shell oil", "costco gas", "arco", "chevron 0098795"],
    "food": ["costco", "qfc", "safeway", "cafe", "bai tong", "mod pizza",  "gelato", "taco bell", "pho hoa", "senor taco", "torero", "burguer king",
            "einstein bro bagels", "homegrown", "gyro to go", "chick-fil", "bistro", "starbucks", "jak's grill", "tanoor lebanese", "coffee", "garlic crush",
            "cheesecake", "el toreador", "matador redmond", "tavern hall", "tipsy cow burger", "lola restaurant", "panera bread", "outback", "wholefds",
            "le panier", "oto sushi", "7-eleven", "katsu burger", "malt &amp; vine", "ristorante italian", "dough zone", "boba t", "pinkberry",
            "lincoln south food", "tutta bella", "chipotle", "coquette bake shop", "tat's delicatessen",
        "carmine's", "anthony's homeport kirk", "tst* the french bakery", "subway 03285244", "little si restaurant",
        "subway 03285244", "buenos aires grill", "un bien", "the slip"],
    "clothes": [],

    "amazon": ["amazon"],
    "rebtel": ["rebtel"],
    "house": ["wave", "puget sound energy"],
    "riding": ["uber", "lyft"],
    "travel": ["american air", "aa inflight visa face", "652 flight terminal", "denver airport"],
    "montly premiums": ["youtube premiu", "youtubepremiu", "hulu", "netflix"],
    "stores": ["home depot", "wal-mart", "dollartree", "target"],
    "tmobile": ["tmobile"],
    "clothes": ["old navy", "ross", "aldo us", "macys", "dickssporting", "express#0153", "goodwill", "payless shoes", "forever 21",
                "dsw bear creek village"],
    "sports": ["24 hour fitness"],
    "ikea": ["ikea"],
    "taxes": ["intuit *turbotax", "mailbox shipping center"],
    "laura certifications": ["bellevue college cont ed", "911 drivng sch. lake wash", "wa dol lic &amp; reg 56215"],
    "fun": ["space needle", "d2 at benaroya", "regal cinemas bella boteg", "wsferries-colman dock", "groupon", "seattle great wheel", "woodmark waterfront ad", "woodland park zoo",
            "woodlandpark zoo"],
    "parking": ["u-park system 041"],
    "medical":["living well health cent", "bartell drug "],
    "not mine":["wildwater river guides"],
    "movies": ["century theatres", "cnk*cinemark.com", "acmetec*seaaqua"]
}

export const getCategory = function(item)
{
    if(item == null){
        return null;
    }
    item = item.toLowerCase();
    if(item.includes("payment thank you"))
    {
        return null;
    }

    for(var key in category)
    {
        for(var index in category[key])
        {
            let values = category[key][index];
            if(item.includes(values))
            {
                return {"category": key, "subCategory": values};
            }
        }
    }

    return {"category": "other", "subCategory": ""};
}

/*
*@data: Transaction[]
*@timerange: options are : day, week, month, year
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
            return date.getUTCDay()
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


export const groupDataByCategory = function(transactions){
    if(!transactions || transactions.length == 0)
    {
        return;
    }

    let expenses = {};
    let itemsByCat = {}

    transactions.forEach (function(value){
        if(!value.Description)
        {
            return;
        }

        let res = getCategory(value.Description);
        if(!res)
        {
            return;
        }

        if(res.category in expenses == false)
        {
            expenses[res.category] = 0;
            itemsByCat[res.category] = []
        }
        expenses[res.category] += value.Price;
        itemsByCat[res.category].push(value);
    });

    return [expenses, itemsByCat];

}