import Daylist from "../types/Daylist";

const ListBackUpJSON = {
    "_id": {
        "$oid": "67dc1df95fc018ac9370b213"
    },
    "daylist_id": "2025_03_20",
    "centerLetter": "t",
    "pangrams": [
        "trunked"
    ],
    "letters": [
        "t",
        "r",
        "u",
        "n",
        "k",
        "e",
        "d"
    ],
    "validWords": [
        {
            "word": "dent",
            "points": 1,
            "pangram": false
        },
        {
            "word": "eterne",
            "points": 6,
            "pangram": false
        },
        {
            "word": "nett",
            "points": 1,
            "pangram": false
        },
        {
            "word": "rent",
            "points": 1,
            "pangram": false
        },
        {
            "word": "rente",
            "points": 5,
            "pangram": false
        },
        {
            "word": "teen",
            "points": 1,
            "pangram": false
        },
        {
            "word": "tend",
            "points": 1,
            "pangram": false
        },
        {
            "word": "tent",
            "points": 1,
            "pangram": false
        },
        {
            "word": "tern",
            "points": 1,
            "pangram": false
        },
        {
            "word": "terne",
            "points": 5,
            "pangram": false
        },
        {
            "word": "tree",
            "points": 1,
            "pangram": false
        },
        {
            "word": "treed",
            "points": 5,
            "pangram": false
        },
        {
            "word": "treen",
            "points": 5,
            "pangram": false
        },
        {
            "word": "trek",
            "points": 1,
            "pangram": false
        },
        {
            "word": "trend",
            "points": 5,
            "pangram": false
        },
        {
            "word": "true",
            "points": 1,
            "pangram": false
        },
        {
            "word": "trunk",
            "points": 5,
            "pangram": false
        },
        {
            "word": "trunked",
            "points": 14,
            "pangram": true
        },
        {
            "word": "tune",
            "points": 1,
            "pangram": false
        },
        {
            "word": "turn",
            "points": 1,
            "pangram": false
        }
    ],
    "sessions": [],
    "__v": 0
}

export const ListBackUpTemp: Daylist = JSON.parse(JSON.stringify(ListBackUpJSON))
