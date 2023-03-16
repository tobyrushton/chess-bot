import { FC, useState, useEffect } from "react"
/* @ts-ignore */
import Board from './wasm/dist/board'
/* @ts-ignore */
import BoardWASM from './wasm/dist/board.wasm'
import { generateBoard } from "./generateBoard"
import { updateBoard } from "./updateBoard"
import type { DraggableState } from './types'
import './App.css'

const App: FC = () => {
    const [board, setBoard] = useState<Board>()
    const [displayBoard, setDisplayBoard] = useState<(string | null)[][]>([])
    const [draggedPiece, setDraggedPiece] = useState<DraggableState>({ piece: '', coordinates: '' })

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
        console.log(displayBoard, 'displayBoard')
    }, [displayBoard])

    const handleDrag = (e: React.DragEvent<HTMLImageElement>) => {
        const coordinates = document.elementFromPoint(e.clientX, e.clientY)?.getAttribute('data-coordinates') || ''
        const temp = updateBoard(board.getBoard(), coordinates,draggedPiece.coordinates, draggedPiece.piece)
        setDisplayBoard(generateBoard(temp))
        board.setBoard(temp)
    }

    const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
        setDraggedPiece({
            piece: e.currentTarget.dataset.piece || '',
            coordinates: e.currentTarget.dataset.coordinates || ''
        })
    }


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
                                                data-coordinates={`${i},${j}`}
                                            >
                                                {
                                                    piece && 
                                                    ( 
                                                        <img 
                                                            src={`/pieces/${piece === piece.toUpperCase() ? `w${piece.toUpperCase()}` : `b${piece.toUpperCase()}`}.svg`} 
                                                            className="piece"
                                                            draggable
                                                            onDragEnd={handleDrag}
                                                            onDragStart={handleDragStart}
                                                            data-coordinates={`${i},${j}`}
                                                            data-piece={piece}
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