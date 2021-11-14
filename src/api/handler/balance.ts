import {DB} from "../../database";

export const handleGetBalance = () => {
    return DB.get('balance');
}
