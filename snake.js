const size = 15
const initialSnakeSize = 5
const center = Math.round(size / 2 - 1)
let eatOn = false
let snake = []
let tableObject = {}

let table = document.getElementById('myTable')
for (let i = 0; i < size; i++) {
    let row = table.insertRow(i)
    for (let j = 0; j < size; j++) {
        row.insertCell(j)
        tableObject[`${i}_${j}`] = ''
    }
}
createStartingSnake()
let timer2 = setInterval(snakeMove, 1000)
let timer1 = setInterval(eatForSnake, 1100)

window.onkeydown = function (event) {
    if (event.keyCode === 39) newHead(0, 1)
    else if (event.keyCode === 38) newHead(-1, 0)
    else if (event.keyCode === 37) newHead(0, -1)
    else if (event.keyCode === 40) newHead(1, 0)
}

function setColor(x, y, color) {
    table.rows[x].cells[y].bgColor = color
}

function createStartingSnake() {
    for (let i = 0; i < initialSnakeSize; i++) {
        const tile = { row: center + i, cell: center }
        snake.push(tile)
        setColor(tile.row, tile.cell, 'green')
    }
}

function eatForSnake() {
    if (!eatOn) {
        for (let i = 0; i < snake.length; i++) {
            let { row, cell } = snake[i]
            delete tableObject[`${row}_${cell}`]
        }
        let keysArray = Object.keys(tableObject)
        let randomValue = Math.floor(Math.random() * (keysArray.length - 1))
        let [row, cell] = keysArray[randomValue].split('_')
        setColor(row, cell, 'red')
        eatOn = true
        for (let i = 0; i < snake.length; i++) {
            tableObject[`${snake[i].row}_${snake[i].cell}`] = ''
        }
    }
}

function error() {
    snake = []
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            setColor(i, j, '')
        }
    }
    eatOn = false
    createStartingSnake()
}

function newHead(addRow, addCell) {
    const head = { row: snake[0].row + addRow, cell: snake[0].cell + addCell }
    if (head.row === -1 || head.row === size || head.cell === -1 || head.cell === size) {
        error()
        return
    }

    let color = table.rows[head.row].cells[head.cell].bgColor

    if (color === 'green') error()
    else {
        snake.unshift(head)
        setColor(snake[0].row, snake[0].cell, 'green')

        if (color === 'red') {
            eatOn = false
        } else {
            const [row, cell] = snake[snake.length - 1]
            setColor(row, cell, '')
            snake.pop()
        }
    }
}

function snakeMove() {
    if (snake[0].cell > snake[1].cell) newHead(0, 1)
    else if (snake[0].cell < snake[1].cell) newHead(0, -1)

    if (snake[0].row > snake[1].row) newHead(1, 0)
    else if (snake[0].row < snake[1].row) newHead(-1, 0)
}
