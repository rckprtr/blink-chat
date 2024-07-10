// import { kv } from "@vercel/kv";


function kvFid(fid: string) {
    return `user:${fid}`;
}

function kvMap() {
    return 'map:v1';
}

export class State {
    public user: User;
    public map: Map;
    constructor(user: User, map: Map) {
        this.user = user;
        this.map = map;
    }
}

// export async function getUser(fid: string): Promise<User> {
//     let userObj = await kv.get<User>(kvFid(fid));

//     if (!userObj) {
//         console.log('Creating new user:', fid);
//         let userSettings = new UserSettings(new Point2D(MAP_WIDTH / 2, MAP_HEIGHT / 2), 1);
//         let newUser = new User(fid, userSettings);
//         await kv.set(kvFid(fid), JSON.stringify(newUser));
//         return newUser;
//     }
//     let userSettings = new UserSettings(
//         new Point2D(userObj.settings.coords.x, userObj.settings.coords.y),
//         userObj.settings.color
//     );
//     let user = new User(userObj.fid, userSettings);
//     return user;
// }



export class User {
    public fid: string;
    public settings: UserSettings;
    constructor(fid: string, settings: UserSettings) {
        this.fid = fid;
        this.settings = settings;
    }

    save() {
        //kv.set(kvFid(this.fid), JSON.stringify(this));
        console.log('Saving user:', this);
    }

    setColor(color: number) {
        this.settings.color = color;
        this.save();
    }

    moveRight() {
        console.log('moving right', this);
        this.settings.coords.x++;
        this.save();
    }

    moveDown() {
        console.log('moving down', this);
        this.settings.coords.y++;
        this.save();
    }

    setCoords(x: number, y: number) {
        this.settings.coords.x = x;
        this.settings.coords.y = y;
        this.save();
    }
}

export class UserSettings {
    public color: number;
    public coords: Point2D;
    constructor(coords: Point2D, color: number) {
        this.color = color;
        this.coords = coords;
    }

    static fromJSON(json: string) {
        let obj = JSON.parse(json);
        return new UserSettings(obj.coords, obj.color);
    }
}

export class Point2D {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export async function getMap(): Promise<Map> {
    let mapObj = null;// await kv.get<Map>(kvMap());
    console.log('Creating new map');
    let newMap = new Map(1, 1, 5);
    //await kv.set(kvMap(), JSON.stringify(newMap));
    return newMap;
    
    // Reconstruct the Map instance
    // let map = new Map(mapObj.width, mapObj.height, mapObj.grid_multiplier);
    // map.grid = mapObj.grid;
    // return map;
}

export class Map {
    public width: number;
    public height: number;
    public grid: number[][];
    public grid_multiplier: number;

    constructor(width: number, height: number, grid_multiplier: number) {
        this.width = width;
        this.height = height;
        this.grid_multiplier = grid_multiplier;
        this.grid = [];
        for (let y = 0; y < this.height; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.grid[y][x] = 0;
            }
        }
    }

    isOutOfBounds(x: number, y: number) {
        return x < 0 || x >= this.width || y < 0 || y >= this.height;
    }


    setPixel(x: number, y: number, color: number) {
        this.grid[y][x] = color;
    }

    getPixel(x: number, y: number) {
        return this.grid[y][x];
    }

    getGridX(x: number) {
        return x * this.grid_multiplier;
    }

    getGridY(y: number) {
        return y * this.grid_multiplier;
    }

    save() {
        //kv.set(kvMap(), JSON.stringify(this));
    }
}