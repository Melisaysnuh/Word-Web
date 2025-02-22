import { UserI } from "./user.js";
import { Daylist } from "./Daylist.js";
import { WordObj } from "./WordObj.js";

declare global {
    namespace Express {
        interface Request {
            user?: UserI;
            list?: Daylist;
            wordObj?: WordObj;
        }
    }
}