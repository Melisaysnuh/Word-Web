export function calculateTotal(list) {
    let points = 0;
    list.forEach((obj) => {
        points += obj.points;
    });
    return points;
}
