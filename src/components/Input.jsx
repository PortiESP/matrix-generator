export default function Input({ value, setValue, label, def }) {
    return (
        <div className="input">
            <label>{label}</label>
            <input type="number" defaultValue={def} value={value} onChange={({ target }) => setValue(target.value)} />
        </div>
    )
}
