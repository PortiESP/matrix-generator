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

    // Show cell info
    showCellInfo: false,
}

function loadGrid(rows, cols) {
    const grid = JSON.parse(localStorage.getItem("grid"))
    if (grid && grid.length === rows && grid[0].length === cols) return grid
    else return resizeGrid(rows, cols, grid)
}

function resizeGrid(rows, cols, grid = undefined) {
    if (!grid) return Array.from({ length: rows }, () => Array.from({ length: cols }, () => GLOBAL.unselected))
    else {
        const newGrid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => GLOBAL.unselected))
        for (let i = 0; i < Math.min(rows, grid.length); i++) {
            for (let j = 0; j < Math.min(cols, grid[0].length); j++) {
                newGrid[i][j] = grid[i][j]
            }
        }
        return newGrid
    }
}

function initGlobal() {
    const grid = JSON.parse(localStorage.getItem("grid"))
    if (grid) return { ...GLOBAL, rows: grid.length, cols: grid[0]?.length }
    else return GLOBAL
}

function App() {
    const [data, setData] = useState(initGlobal())
    const [grid, setGrid] = useState(loadGrid(data.rows, data.cols))

    // Store grid in local storage
    useEffect(() => {
        setGrid(loadGrid(data.rows, data.cols))
        console.log(grid)
    }, [data])

    useEffect(() => {
        localStorage.setItem("grid", JSON.stringify(grid))
    }, [grid])

    return (
        <div className="wrapper">
            <div className="params">
                <Input def={data.rows} setValue={(value) => setData((old) => ({ ...old, rows: value || 1 }))} label="Rows" />
                <Input def={data.cols} setValue={(value) => setData((old) => ({ ...old, cols: value || 1 }))} label="Cols" />
                <Input def={data.cellSize} setValue={(value) => setData((old) => ({ ...old, cellSize: value }))} label="Cell Size" />
            </div>
            <div className="info">
                <label htmlFor="info-ij">Show cell coordinates</label>
                <input type="checkbox" id="info-ij" value={data.showCellInfo} onChange={(e) => setData((old) => ({ ...old, showCellInfo: e.target.checked }))} />
            </div>
            <Grid grid={grid} setGrid={setGrid} data={data} />
            <p className="hint">
                Use <code>L-Click</code> to activate cells and <code>R-Click</code> to deactivate cells. Also, you can <strong>drag the mouse</strong> to activate or deactivate multiple cells.
            </p>
            <div className="buttons">
                <button onClick={() => window.location.reload()} className="reset-btn">
                    Reset
                </button>
                <button onClick={() => navigator.clipboard.writeText(JSON.stringify(grid))}>Copy</button>
                <button onClick={() => console.log(JSON.stringify(grid))}>Console.log</button>
            </div>
        </div>
    )
}

export default App
