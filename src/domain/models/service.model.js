export default class Service {
    _id;
    createBy;
    cost;
    margin;
    price;
    margin_price;
    name;
    desc = "<p></p>";
    enabled;
    categories;
    subsidiaries;
    users;
    duration;
    source;

    constructor() { }

    toMap() {
        return {
            _id: this._id,
            createBy: this.createBy,
            cost: this.cost,
            margin: this.margin,
            price: this.price,
            margin_price: this.margin_price,
            name: this.name,
            desc: this.desc,
            enabled: this.enabled,
            categories: this.categories,
            subsidiaries: this.subsidiaries,
            users: this.users,
            duration: this.duration,
            source: this.source,
        };
    }

    static fromMap(json){
        const service =  new Service();
        service._id = json._id;
        service.createBy = json.createBy;
        service.cost = json.cost;
        service.margin = json.margin;
        service.price = json.price;
        service.margin_price = json.margin_price;
        service.name = json.name;
        service.desc = json.desc;
        service.enabled = json.enabled;
        service.categories = json.categories;
        service.subsidiaries = json.subsidiaries;
        service.users = json.users;
        service.duration = json.duration;
        service.source = json.source;

        return service;
    }
}