export default function Input({ setValue, label, def, type = "number" }) {
    return (
        <div className="input">
            <label>{label}</label>
            <input
                type={type}
                defaultValue={def}
                onChange={({ target }) => {
                    console.log(target.value)
                    try {
                        setValue(parseInt(target.value) || target.value)
                    } catch (e) {
                        setValue(target.value)
                    }
                }}
            />
        </div>
    )
}
