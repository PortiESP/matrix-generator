export default function Cell(props) {
    const { i, j, cell, data } = props
    const { cellSize, selected, unselected } = data
    const buttonToValue = {
        0: selected,
        2: unselected,
    }

    const backgroundColor = cell === 1 ? "black" : "white"
    const cellStyle = {
        width: cellSize,
        height: cellSize,
        backgroundColor,
    }

    const handleClick = (e, i, j) => {
        e.preventDefault()
        props.handleClick(i, j, buttonToValue[e.button])
    }

    return <div key={`${i}-${j}`} className="cell" style={cellStyle} onClick={(e) => handleClick(e, i, j)} onContextMenu={(e) => handleClick(e, i, j)} />
}
