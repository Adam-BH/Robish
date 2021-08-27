
export class Room {
    key: string;
    battery :{
        percentage : number
    }
    buzzer : {
        lastUpdate: number,
        state: boolean
    }
    capacitiveSens:{
        lastUpdate: number,
        state: boolean,
        value: number
    }
    destination :{
        lat: number,
        lng: number
    }
    directions :{
        right: any,
        left : any,
        forward : any,
        backward : any
    }
    harmful :{
        KSADKSA847s : {
            lat : number,
            lng : number
        }
    }
    harmless :{
        KSADKSA847s: {
            lat : number,
            lng : number,
            accuracy: any
        }
    }
    inductiveSens :{
        lastUpdate: boolean,
        state: boolean,
        value: number
    }
    location :{
        lat : number,
        lng : number
    }
    ultrasonicSens: {
        lastUpdate: number,
        state: boolean,
        value: number
    }
    distance: number
    status: any
    scanning: any
    manual: any
}
