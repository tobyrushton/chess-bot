import { generateBoard } from './generateBoard'

/*
    * This function takes a FEN string, a coordinate, and a piece and returns a new FEN string with the piece at the coordinate.
    * @param fenString - a FEN string
    * @param coordinates - a coordinate in x,y notation
    * @param piece - a piece in algebraic notation
    * @returns a new FEN string with the piece at the coordinate
*/
export const updateBoard = (fenString: string, coordinatesTo: string, coordinatesFrom: string, piece: string): string => {
    const board = generateBoard(fenString)
    const [y1, x1] = coordinatesTo.split(',')
    const [y2, x2] = coordinatesFrom.split(',')

    board[parseInt(y1)][parseInt(x1)] = piece
    board[parseInt(y2)][parseInt(x2)] = null

    // console.log(board[parseInt(y1)][parseInt(x1)], x1, y1)
    // console.log(board[parseInt(y2)][parseInt(x2)], x2, y2)
    // console.log(board)

    // console.log(board, parseInt(y1), parseInt(x1), piece, parseInt(y2), parseInt(x2))

    const FEN = board.map(row => {
        return row.map(cell => {
            if (cell === null) {
                return
            }
            return cell
        })
    }).map(row => {
        const temp = row.map(cell => {
            if (cell === undefined) {
                return '1'
            }
            return cell
        })

        return temp.reduce((acc, curr) => {
            if (+curr && acc === '1') {
                return acc + +curr
            }
            return acc.toString() + curr.toString()
        }, '')

    }).join('/')
    console.log(FEN)
    return FEN
}   
