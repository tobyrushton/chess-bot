import { FC, useState, useEffect } from "react"
/* @ts-ignore */
import Board from './wasm/dist/board'
/* @ts-ignore */
import BoardWASM from './wasm/dist/board.wasm'
import './App.css'

interface Board {
    new (): Board
    getBoard(): string
}

const App: FC = () => {
    const [board, setBoard] = useState<Board>()

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
        console.log(board?.getBoard())
    },[board])

    return (
        <div className="wrapper">
            <div className="board">
                {
                    new Array(8).fill(0).map((_, i) => {
                        return (
                            <div key={i}>
                                {
                                    new Array(8).fill(0).map((_, j) => {
                                        return (
                                            <div key={j} style={{ width: 75, height: 75, backgroundColor: (i + j) % 2 === 0 ? 'black' : 'white' }} />
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