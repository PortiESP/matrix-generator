import { useEffect, useState } from "react"
import "./App.css"
import Grid from "./components/Grid"
import GLOBAL from "./data/globals"

function loadGrid(rows, cols) {
    const grid = JSON.parse(localStorage.getItem("grid"))
    if (grid && grid.length === rows && grid[0].length === cols) return grid
    else return Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0))
}

function App() {
    const [data, setData] = useState(GLOBAL)
    const [grid, setGrid] = useState(loadGrid(data.rows, data.cols))

    // Store grid in local storage
    useEffect(() => {
        localStorage.setItem("grid", JSON.stringify(grid))
    }, [grid])

    return (
        <div className="wrapper">
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
