// Exporting a function called 'mySketch'

import p5 from "p5";
import { AStar } from "./algo/AStar";
import GridSettings from "./gridSettings";
import { drawGrid } from "./helpers/drawGrid";
import { sleep } from "./helpers/sleep";
const sketch = document.getElementById("sketch");
/**
 *
 * @param {p5} p
 */
export const mySketch = (p) => {
    let rows = 25;
    let cols = 25;
    let offsetLeft = sketch.offsetLeft;
    let offsetTop = sketch.offsetTop;
    const WALL = "WALL";
    const START = "START";
    const REMOVE_WALL = "REMOVE_WALL";
    const END = "END";
    let gridSettings;
    let pathfinder;

    let selectedValue = START;
    let startPos = [0, 0];
    let endPos = [cols - 1, rows - 1];

    p.setup = () => {
        p.createCanvas(700, 700);
        /** @type {GridSettings} */
        gridSettings = new GridSettings(p, startPos, endPos, rows, cols, p.width);
        /** @type {AStar} */
        pathfinder = new AStar(p, gridSettings.startNode, gridSettings.endNode);
        let startBtn = document.getElementById("start-btn");
        startBtn.addEventListener("click", () => {
            pathfinder.Algo();
        });

        let radioBtns = document.querySelectorAll("input[name='choice']");

        for (let radio of radioBtns) {
            radio.addEventListener("change", (e) => {
                selectedValue = e.target.value;
            });
        }

        let resetBtn = document.getElementById("reset-btn");
        resetBtn.addEventListener("click", () => {
            if (pathfinder.finding) return;
            gridSettings.resetGrid(pathfinder.finding);

            pathfinder.reset(gridSettings.startNode, gridSettings.endNode);

            p.loop();
        });
    };

    p.draw = async () => {
        drawGrid(p, gridSettings.grid, pathfinder.openSet, pathfinder.closedSet, rows, cols);
        for (let i = 0; i < pathfinder.path.length; i++) {
            if (pathfinder.path[i].isStart || pathfinder.path[i].isEnd) continue;
            pathfinder.path[i].show(p, p.color(255, 228, 94));
            await sleep(100);
        }
        /**
         *
         * @param {MouseEvent} e
         */

        p.mouseClicked = (e) => {
            let x = e.pageX - offsetLeft;
            let y = e.pageY - offsetTop;
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    let startX = gridSettings.grid[i][j].x;
                    let startY = gridSettings.grid[i][j].y;

                    let endX = gridSettings.grid[i][j].endX;
                    let endY = gridSettings.grid[i][j].endY;

                    if (x > startX && x < endX && y > startY && y < endY) {
                        if (selectedValue === START) {
                            gridSettings.setStart([i, j]);
                            let newStartNode = gridSettings.getStart();
                            pathfinder.updateStartEndNodes({ start: newStartNode });
                        } else if (selectedValue === END) {
                            gridSettings.setEnd([i, j]);
                            let newEndNode = gridSettings.getEnd();
                            pathfinder.updateStartEndNodes({ end: newEndNode });
                        } else if (selectedValue === WALL) {
                            if (gridSettings.grid[i][j].isStart || gridSettings.grid[i][j].isEnd) return;
                            gridSettings.grid[i][j].isBlocked = true;
                        } else if (selectedValue === REMOVE_WALL) {
                            gridSettings.grid[i][j].isBlocked = false;
                        }
                    }
                }
            }
        };

        // p.mouseDragged = (e) => {
        //     let x = e.pageX - offsetLeft;
        //     let y = e.pageY - offsetTop;
        //     for (let i = 0; i < rows; i++) {
        //         for (let j = 0; j < cols; j++) {
        //             let startX = gridSettings.grid[i][j].x;
        //             let startY = gridSettings.grid[i][j].y;

        //             let endX = gridSettings.grid[i][j].endX;
        //             let endY = gridSettings.grid[i][j].endY;

        //             if (x > startX && x < endX && y > startY && y < endY) {
        //                 console.log(`dragged ${i} - ${j}`);
        //             }
        //         }
        //     }
        // };
    };
};
