export default class StateDistrict {

    private name: string
    private districts: [string] | null = null
    
    constructor(
        name: string,
        districts: [string]
    ) {
        this.name = name;
        this.districts = districts || null;
    }

    getName = () => this.name
    getDistricts = () => this.districts
}