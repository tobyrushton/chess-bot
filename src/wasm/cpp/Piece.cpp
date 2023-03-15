#include <string>

class Piece {
    private: 
        int material;
        bool isWhite;
        int position[2];
        char piece;
    public: 
        Piece(char piece, int x, int y){
            this->position[0] = x;
            this->position[1] = y;
            this->piece = piece;
            if (piece == 'P') {
                this->material = 1;
            } else if (piece == 'N') {
                this->material = 3;
            } else if (piece == 'B') {
                this->material = 3;
            } else if (piece == 'R') {
                this->material = 5;
            } else if (piece == 'Q') {
                this->material = 9;
            } else if (piece == 'K') {
                this->material = 100;
            } else {
                this->material = 0;
            }
            if(piece == toupper(piece)){
                this->isWhite = true;
            } else {
                this->isWhite = false;
            }
        }
        int getMaterial(){
            return this->material;
        }
        // int * getPosition(){
        //     return this->position;
        // }
};