import { sleep } from "../helpers/sleep";

export class AStar {
    constructor(p, start, end) {
        this.p = p;
        this.openSet = [];
        this.closedSet = [];
        this.path = [];
        this.start = start;
        this.end = end;
        this.openSet.push(start);
        this.finding = false;
    }

    updateStartEndNodes(ops = { start: undefined, end: undefined }) {
        if (ops.start) {
            let start = ops.start;
            this.start = start;
            this.openSet = [];
            this.openSet.push(start);
            console.log(this.openSet, this.start);
        }

        if (ops.end) {
            let end = ops.end;
            this.end = end;
        }
    }

    findWinnerIndex() {
        let openSet = this.openSet;
        let idx = 0;
        for (let i = 0; i < openSet.length; i++) {
            let ele1 = openSet[i];
            let ele2 = openSet[idx];
            if (ele1.f < ele2.f) {
                idx = i;
            }
        }
        return idx;
    }

    heuristic(a, b) {
        let d = this.p.dist(a.j, a.i, b.j, b.i);
        return d;
    }

    async Algo() {
        this.finding = true;
        let p = this.p;
        let found = false;
        console.log(this.openSet, this.closedSet, this.path);
        while (this.openSet.length > 0) {
            let winnerIdx = this.findWinnerIndex();
            var current = this.openSet[winnerIdx];
            if (current === this.end) {
                let temp = current;
                this.path.push(temp);
                while (temp.parent) {
                    this.path.push(temp.parent);
                    temp = temp.parent;
                }
                this.path.reverse();
                console.log("DONE");
                p.noLoop();
                found = true;
                break;
            }
            this.openSet.splice(winnerIdx, 1);
            this.closedSet.push(current);

            let neighbors = current.neighbors;
            for (let i = 0; i < neighbors.length; i++) {
                let neighbor = neighbors[i];
                let betterPath = false;
                if (neighbor.isBlocked || this.closedSet.includes(neighbor)) continue;

                let tempG = current.g + 1;
                if (this.openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        betterPath = true;
                    }
                } else {
                    neighbor.g = tempG;
                    betterPath = true;
                    this.openSet.push(neighbor);
                }
                if (betterPath) {
                    neighbor.parent = current;
                    neighbor.h = this.heuristic(neighbor, this.end);
                    neighbor.f = neighbor.g + neighbor.h;
                }
            }
            await sleep(50);
        }
        this.finding = false;

        if (!found) {
            console.log("NOT FOUND!");
            p.noLoop();
        }
    }

    reset(start, end) {
        if (this.finding) return;
        this.openSet = new Array();
        this.start = start;
        this.end = end;
        this.openSet.push(start);
        this.closedSet = new Array();
        this.path = new Array();
        this.finding = false;
    }
}
