let _color = { r: 5, g: 1, b: 1 };
function getColorCode({ r, g, b }) { return 36 * r + 6 * g + b + 16; }

function* flow(c, v) {
    for (let i = 0; i < 4; i++) {
        _color[c] += v;
        yield getColorCode(_color);
    }
}

const color_arr = [
    ...flow("g", 1),
    ...flow("r", -1),
    ...flow("b", 1),
    ...flow("g", -1),
    ...flow("r", 1),
    ...flow("b", -1)
];

const lines = require("fs").readFileSync("./print.txt", { encoding: "utf8" }).split("\n");
let time = 0;
function getColoredText() {
    return lines.map((str, i) => [...str].map((char, j) => "\033" + `[38;5;${color_arr[(i + j + time) % color_arr.length]}m${char}`).join("")).join("\n");
}

process.stdout.write("\033[s");
setInterval(() => {
    process.stdout.write( "\033[u\033[K" + getColoredText() + "\033[0m");
    time = (time + 1) % color_arr.length;
}, 30);