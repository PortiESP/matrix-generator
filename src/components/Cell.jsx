export default function Cell(props) {
    const { i, j, cell, data } = props
    const { cellSize, selected, unselected } = data
    const buttonToValue = {
        0: selected,
        2: unselected,
    }

    const className = cell === data.selected ? "cell selected" : "cell"

    const handleClick = (e, i, j) => {
        e.preventDefault()
        props.handleClick(i, j, buttonToValue[e.button])
    }

    return (
        <div key={`${i}-${j}`} title={`${i}/${j}`} className={className} onClick={(e) => handleClick(e, i, j)} onContextMenu={(e) => handleClick(e, i, j)}>
            {data.showCellInfo && (
                <>
                    <span className="ij">
                        {i}/{j}
                    </span>
                </>
            )}
        </div>
    )
}
