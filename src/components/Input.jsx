export default function Input({ value, setValue, label }) {
    return (
        <div className="input">
            <label>{label}</label>
            <input type="number" value={value} onChange={({ target }) => setValue(target.value)} />
        </div>
    )
}
