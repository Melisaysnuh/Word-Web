import { UserI } from "./user.js";
import { Daylist } from "./Daylist.js";

declare global {
    namespace Express {
        interface Request {
            user?: UserI;
            list?: Daylist;
        }
    }
}