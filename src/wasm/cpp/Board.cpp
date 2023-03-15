#include <emscripten/bind.h>
#include <string>
#include "Piece.cpp"
#include <vector>

using namespace emscripten;

class Board {
    private: 
    // board state stored using FEN notation
    // https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
    // defaults to starting position
        std::string startBoard = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        std::vector<std::vector<Piece>> board;
        std::string fenBoard = this->startBoard;
    
    public:
        Board(){
            this->createBoard();
        }

        // fenBoard is returned to the client in order for it to be displayed
        std::string getBoard() {
            return this->fenBoard;
        }

        void createBoard(){
            for(int i = 0; i < 8; i++){
                for(int j = 0; j < 8; j++){
                    this->board[i][j] = Piece('P', i, j);
                }
            }
        };
};

EMSCRIPTEN_BINDINGS(Board) {
    class_<Board>("Board")
        .constructor<>()
        .function("getBoard", &Board::getBoard)
    ;
}
