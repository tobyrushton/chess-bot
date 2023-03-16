export const generateBoard = (fen:string):string[][] => {
    const rows = fen.split('/')
    const board = rows.map(row => {
        return row.split('').map(cell => {
            if (cell.match(/[1-8]/)) {
                return Array(parseInt(cell)).fill(null)
            }
            return cell
        }).flat().splice(0, 8)
    })
    return board
}