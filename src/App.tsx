import { FC, useState, useEffect } from "react"
/* @ts-ignore */
import Board from './wasm/dist/board'
/* @ts-ignore */
import BoardWASM from './wasm/dist/board.wasm'
import { generateBoard } from "./generateBoard"
import './App.css'

interface Board {
    new (): Board
    getBoard(): string
}

const App: FC = () => {
    const [board, setBoard] = useState<Board>()
    const [displayBoard, setDisplayBoard] = useState<string[][]>([])

    useEffect(() => {
        const init = async () => {
            const core = await Board({
                locateFile: (path: string) => {
                    if (path.endsWith('.wasm')) {
                        return BoardWASM
                    }
                    return path
                }
            })
            setBoard(new core.Board())
        }
        init()
    }, [])

    useEffect(() => {
        setDisplayBoard(generateBoard(board?.getBoard() || ''))
    },[board])

    useEffect(() => {
        console.log(displayBoard)
    }, [displayBoard])

    return (
        <div className="wrapper">
            <div className="board">
                {
                    displayBoard.map((row, i) => {
                        return (
                            <div key={i}>
                                {
                                    row.map((piece, j) => {
                                        return (
                                            <div 
                                                key={j} 
                                                style={{ 
                                                    width: 75, 
                                                    height: 75, 
                                                    backgroundColor: (i + j) % 2 === 0 ? '#769656' : 'white', 
                                                    display: 'inline-grid',
                                                    }}
                                            >
                                                {
                                                    displayBoard[i][j] && 
                                                    ( 
                                                        <img 
                                                            src={`/pieces/${piece === piece.toUpperCase() ? `w${piece.toUpperCase()}` : `b${piece.toUpperCase()}`}.svg`} 
                                                            className="piece"
                                                        /> 
                                                    )
                                                }
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default App