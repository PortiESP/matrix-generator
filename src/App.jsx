import { useEffect, useState } from "react"
import "./App.css"
import Grid from "./components/Grid"
import Input from "./components/Input"

const GLOBAL = {
    // Grid values
    unselected: 0,
    selected: 1,

    // Grid dimensions
    rows: 20,
    cols: 24,
    cellSize: 32,
}

function loadGrid(rows, cols) {
    const grid = JSON.parse(localStorage.getItem("grid"))
    if (grid && grid.length === rows && grid[0].length === cols) return grid
    else return generateGrid(rows, cols)
}

function generateGrid(rows, cols) {
    return Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0))
}

function App() {
    const [data, setData] = useState(GLOBAL)
    const [grid, setGrid] = useState(loadGrid(data.rows, data.cols))

    // Store grid in local storage
    useEffect(() => {
        localStorage.setItem("grid", JSON.stringify(grid))
        setGrid(loadGrid(data.rows, data.cols))
        console.log(grid)
    }, [data])

    return (
        <div className="wrapper">
            <div className="params">
                <Input value={data.rows} setValue={(value) => setData((old) => ({ ...old, rows: value }))} label="Rows" />
                <Input value={data.cols} setValue={(value) => setData((old) => ({ ...old, cols: value }))} label="Cols" />
            </div>
            <Grid grid={grid} setGrid={setGrid} data={data} />
            <div className="buttons">
                <button onClick={() => window.location.reload()}>Reset</button>
                <button onClick={() => navigator.clipboard.writeText(JSON.stringify(grid))}>Copy</button>
                <button onClick={() => console.log(JSON.stringify(grid))}>Console.log</button>
            </div>
        </div>
    )
}

export default App
