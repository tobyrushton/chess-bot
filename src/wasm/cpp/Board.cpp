#include <emscripten/bind.h>
#include <string>

using namespace emscripten;

class Board {
    private: 
    // board stored using FEN notation
    // https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
    // defaults to starting position
        std::string board = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    public:
        std::string getBoard() {
            return board;
        }
};

EMSCRIPTEN_BINDINGS(Board) {
    class_<Board>("Board")
        .constructor<>()
        .function("getBoard", &Board::getBoard)
    ;
}