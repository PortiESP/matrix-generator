import { useEffect } from "react"
import Cell from "./Cell"
import { useRef } from "react"

export default function Grid({ grid, setGrid, data }) {
    const { rows, cols, cellSize, selected, unselected } = data
    const $cursorCell = useRef(null)

    const handleClick = (i, j, value) => {
        setGrid((old) => {
            const copy = old.map((row) => [...row])
            copy[i][j] = value
            return copy
        })
    }

    const handleMouseUp = (btn) => {
        if (btn === 0) window.mouseLDown = false
        if (btn === 2) window.mouseRDown = false
    }
    const handleMouseDown = (btn) => {
        if (btn === 0) window.mouseLDown = true
        if (btn === 2) window.mouseRDown = true
    }
    const handleMouseMove = (e) => {
        e.preventDefault()

        // Get the cell coordinates
        const { x, y } = document.querySelector(".grid").getBoundingClientRect()
        const i = Math.floor((e.clientY - y) / data.cellSize)
        const j = Math.floor((e.clientX - x) / data.cellSize)

        if (!(i >= 0 && i < rows && j >= 0 && j < cols)) {
            $cursorCell.current.innerText = "Cell: -/-"
            return
        }

        // Update the cursor cell info
        $cursorCell.current.innerText = `Cell: ${i}/${j}`

        // If the mouse is not down, return
        if (!window.mouseRDown && !window.mouseLDown) return

        // Update the grid
        setGrid((old) => {
            const copy = old.map((row) => [...row])
            if (window.mouseLDown) copy[i][j] = selected
            if (window.mouseRDown) copy[i][j] = unselected
            return copy
        })
    }

    useEffect(() => {
        document.addEventListener("mousedown", (e) => handleMouseDown(e.button))
        document.addEventListener("mouseup", (e) => handleMouseUp(e.button))
        document.addEventListener("mousemove", handleMouseMove)

        return () => {
            document.removeEventListener("mousedown", handleMouseDown)
            document.removeEventListener("mouseup", handleMouseUp)
            document.removeEventListener("mousemove", handleMouseMove)
        }
    }, [data])

    const gridStyle = { display: "grid", gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`, gridTemplateRows: `repeat(${rows}, ${cellSize}px)` }

    return (
        <>
            <div className="grid" style={gridStyle}>
                {grid.map((row, i) => row.map((cell, j) => <Cell key={`${i}-${j}`} i={i} j={j} cell={cell} handleClick={handleClick} data={data} />))}
            </div>
            <span id="cursor-cell" ref={$cursorCell}>
                Cell: 0/0
            </span>
        </>
    )
}
