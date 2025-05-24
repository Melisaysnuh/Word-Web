import { UserI } from "../../src/types/User";

export const mockUser: UserI = {
    _id: '123', // or use the actual MongoDB ID if your type expects `_id`
    email: 'jenny@gamil.com',
    firstName: 'Meli',
    password: '%%%%%%',
    history: [
        {
            daylist_id: '2025_03_19',
            guessedWords: [
                { word: 'door', points: 1, isogram: false }
            ],
            totalUserPoints: 1,
            level: 'Daddy Long-Legs',
        },
        {
            daylist_id: '2025_03_20',
            guessedWords: [
                { word: 'schlump', points: 14, isogram: true }
            ],
            totalUserPoints: 14,
            level: 'Daddy Long-Legs',
        }]
}
export const tokenMock = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywiZmlyc3ROYW1lIjoiTWVsaSIsImVtYWlsIjoibWVsaUBleGFtcGxlLmNvbSIsImV4cCI6MTcxODM1MjAwMH0.ey1QeylnnKrr7svyKQR-gNKnsIl7SAYmpKMw6BztQFLo
`