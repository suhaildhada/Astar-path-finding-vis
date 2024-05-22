import Cell from "./cell";

export default class GridSettings {
    constructor(p, startPos, endPos, rows, cols, canvasWidth) {
        this.rows = rows;
        this.p = p;
        this.width = canvasWidth / rows;
        this.cols = cols;
        this.startPos = startPos;
        this.endPos = endPos;
        this.grid = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
        this.setup();
        this.startNode = this.getStart();
        this.endNode = this.getEnd();
    }

    resetGrid(finding) {
        if (finding) return;
        this.grid = new Array(this.rows).fill(0).map(() => new Array(this.cols).fill(0));
        console.log(finding);
        this.setup();
    }

    // generateRandomPos() {
    //     let p = this.p;
    //     return [p.floor(p.random(0, this.cols - 1)), p.floor(p.random(0, this.rows - 1))];
    // }

    setEnd(endPos) {
        this.endPos = endPos;
        this.endNode = this.getEnd();
        let i = endPos[0];
        let j = endPos[1];
        this.resetEnd();
        this.grid[i][j].isEnd = true;
    }

    setStart(startPos) {
        this.startPos = startPos;
        this.startNode = this.getStart();
        let i = startPos[0];
        let j = startPos[1];
        this.resetStart();
        this.grid[i][j].isStart = true;
    }

    resetStart() {
        let rows = this.rows;
        let cols = this.cols;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                this.grid[i][j].isStart = false;
            }
        }
    }

    resetEnd() {
        let rows = this.rows;
        let cols = this.cols;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                this.grid[i][j].isEnd = false;
            }
        }
    }

    setup() {
        let rows = this.rows;
        let cols = this.cols;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                this.grid[i][j] = new Cell(this.p, i, j, this.width);
                if (this.grid[i][j] == this.getStart()) {
                    this.grid[i][j].isStart = true;
                }

                if (this.grid[i][j] == this.getEnd()) {
                    this.grid[i][j].isEnd = true;
                }
            }
        }

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                this.grid[i][j].addNeighbors(this.grid);
            }
        }
        this.startNode = this.getStart();
        this.endNode = this.getEnd();
    }

    generateRandom() {
        let rows = this.rows;
        let cols = this.cols;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                this.grid[i][j] = new Cell(this.p, i, j, this.width);
                if (this.grid[i][j] == this.getStart()) {
                    this.grid[i][j].isStart = true;
                }

                if (this.grid[i][j] == this.getEnd()) {
                    this.grid[i][j].isEnd = true;
                }
            }
        }
    }

    getGrid() {
        return this.grid;
    }

    getStart() {
        return this.grid[this.startPos[0]][this.startPos[1]];
    }

    getEnd() {
        return this.grid[this.endPos[0]][this.endPos[1]];
    }
}
