import p5 from "p5";

export default class Cell {
    constructor(p, i, j, width, isBlocked = false) {
        this.p = p;
        this.i = i;
        this.j = j;

        this.f = 0;
        this.g = 0;
        this.h = 0;

        this.neighbors = [];
        this.parent = undefined;

        this.isBlocked = isBlocked;
        this.isStart = false;
        this.isEnd = false;

        this.width = width;
        this.x = i * width;
        this.y = j * width;
        this.endX = this.x + this.width;
        this.endY = this.y + this.width;
    }
    /**
     *
     * @param {p5} p
     * @param {Number} w
     *
     */
    show(p, color) {
        p.fill(color);
        p.stroke(0);

        p.rect(this.x, this.y, this.width, this.width);
    }

    addNeighbors(grid) {
        let i = this.i;
        let j = this.j;
        let n = grid.length;
        let dirs = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
            [-1, -1],
            [1, 1],
            [-1, 1],
            [1, -1],
        ];

        for (const dir of dirs) {
            let newI = dir[0] + i;
            let newJ = dir[1] + j;
            if (newI < 0 || newJ < 0 || newI >= n || newJ >= n) continue;
            this.neighbors.push(grid[newI][newJ]);
        }
    }
}
