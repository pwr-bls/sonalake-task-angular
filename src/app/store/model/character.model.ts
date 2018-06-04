import { Options } from "selenium-webdriver/ie";

export class CharacterModel {
    public id: number;
    public name: string;
    public species: string;
    public gender: string;
    public homeworld: string;

    constructor(options: {
        id?: number,
        name?: string,
        species?: string,
        gender?: string,
        homeworld?: string,
    } = {}) {
        options = options || {};
        this.id = options.id || 0;
        this.name = options.name || null;
        this.species = options.species || null;
        this.gender = options.gender || null;
        this.homeworld = options.homeworld || null;
    }
}