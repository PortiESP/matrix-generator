import { useEffect, useState } from "react"
import "./App.css"
import Grid from "./components/Grid"
import Input from "./components/Input"

const GLOBAL = {
    // Grid values
    selected: 1,
    unselected: 0,
    outputSelected: 1,
    outputUnselected: 0,

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
    else return newGrid(rows, cols)
}

function resizeGrid(rows, cols, grid = undefined) {
    if (!grid) return newGrid(rows, cols)
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

function newGrid(rows, cols) {
    return Array.from({ length: rows }, () => Array.from({ length: cols }, () => GLOBAL.unselected))
}

function initGlobal() {
    const grid = JSON.parse(localStorage.getItem("grid"))
    if (grid) return { ...GLOBAL, rows: grid.length, cols: grid[0]?.length }
    else return GLOBAL
}

function MatrixGenerator() {
    const [data, setData] = useState(initGlobal())
    const [grid, setGrid] = useState(loadGrid(data.rows, data.cols))

    // Store grid in local storage
    useEffect(() => {
        setGrid(resizeGrid(data.rows, data.cols, grid))
        console.log(grid)
    }, [data])

    useEffect(() => {
        localStorage.setItem("grid", JSON.stringify(grid))
    }, [grid])

    const outputGrid = () => {
        const result = grid.map((row) => row.map((cell) => (cell ? data.outputSelected : data.outputUnselected)))
        return JSON.stringify(result)
    }

    console.log(data)

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
            <p className="hint">Choose the output values</p>
            <div className="params-output">
                <Input type="text" def={1} label="Selected" setValue={(value) => setData((old) => ({ ...old, outputSelected: value }))} />
                <Input type="text" def={0} label="Unselect" setValue={(value) => setData((old) => ({ ...old, outputUnselected: value }))} />
            </div>
            <div className="buttons">
                <button onClick={() => setGrid(newGrid(data.rows, data.cols))} className="reset-btn">
                    Reset
                </button>
                <button onClick={() => navigator.clipboard.writeText(outputGrid())}>Copy</button>
                <button onClick={() => console.log(outputGrid())}>Console.log</button>
            </div>
        </div>
    )
}

export default MatrixGenerator
