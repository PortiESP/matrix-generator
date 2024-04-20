import { useEffect, useState } from "react"
import "./App.css"
import Grid from "./components/Grid"
import CONSTS from "./data/constants"

const { rows, cols } = CONSTS

function loadGrid() {
    const grid = JSON.parse(localStorage.getItem("grid"))
    if (grid) return grid
    else return Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0))
}

function App() {
    const [grid, setGrid] = useState(loadGrid())

    // Store grid in local storage
    useEffect(() => {
        localStorage.setItem("grid", JSON.stringify(grid))
    }, [grid])

    return (
        <div className="wrapper">
            <Grid grid={grid} setGrid={setGrid} />
            <div className="buttons">
                <button onClick={() => window.location.reload()}>Reset</button>
                <button onClick={() => navigator.clipboard.writeText(JSON.stringify(grid))}>Copy</button>
                <button onClick={() => console.log(JSON.stringify(grid))}>Console.log</button>
            </div>
        </div>
    )
}

export default App
