export default function Input({ label }) {
    return (
        <div className="input-group">
            <label htmlFor={label}>{label}:</label>
            <input
                type="number"
                id={label}
                min="1"
                defaultValue="32"
                onChange={({ target, ...e }) => {
                    console.log(target.value)
                }}
            />
        </div>
    )
}
