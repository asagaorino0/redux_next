export default class UserW {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    sayHi(): void {
        console.log('Hi, I am ' + this.name);
    }
}