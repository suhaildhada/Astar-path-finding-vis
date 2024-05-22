export function drawGrid(p, grid, openSet, closedSet, rows, cols) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j].isBlocked) {
                grid[i][j].show(p, p.color(0));
            } else if (grid[i][j].isStart) {
                grid[i][j].show(p, p.color(0, 128, 0));
            } else if (grid[i][j].isEnd) {
                grid[i][j].show(p, p.color(128, 0, 0));
            } else {
                grid[i][j].show(p, p.color(249, 249, 249));
            }
        }
    }

    for (let i = 0; i < openSet.length; i++) {
        if (!openSet[i].isStart && !openSet[i].isEnd) {
            openSet[i].show(p, p.color(90, 169, 230));
        }
    }

    for (let i = 0; i < closedSet.length; i++) {
        if (!closedSet[i].isStart && !closedSet[i].isEnd) {
            closedSet[i].show(p, p.color(255, 99, 146));
        }
    }
}
