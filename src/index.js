import p5 from "p5";
import { mySketch } from "./sketch.js";
import "./index.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

new p5(mySketch, document.getElementById("sketch"));
