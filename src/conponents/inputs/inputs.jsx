import './styleInputs.css'


export const Inputs = ({ type, txt, row = '4', cols = '50', name, placeholder = '', styleName, valueSet, optionSect, func, objName }) => {
    switch (type) {
        case 'input':
            return (
                <article className={`contenF ${styleName}`} data-txt={txt}>
                    <input type="text" className="input" name={name} placeholder={placeholder} onChange={func}/>
                </article>
            );
        case 'password':
            return (
                <article className={`contenF ${styleName}`} data-txt={txt}>
                    <input type="password" className="input" name={name} placeholder={placeholder} />
                </article>
            );
        case "number":
            return (
                <article className={`contenF ${styleName}`} data-txt={txt}>
                    <input type="number" className="input" name={name} placeholder={placeholder} />
                </article>
            );
        case "email":
            return (
                <article className={`contenF ${styleName}`} data-txt={txt}>
                    <input type="email" className="input" name={name} placeholder={placeholder} />
                </article>
            )

        case 'textarea':
            return (
                <article className={`contenF ${styleName}`} data-txt={txt}>
                    <textarea className="input" name={name} placeholder={placeholder} rows={row} cols={cols} />
                </article>
            );

        case 'select':
            return (
                <article className={`contenF ${styleName}`} data-txt={txt}>
                    <select value={valueSet} onChange={func} name={name}>
                        {optionSect.map((option, index) => {
                            return (
                                <option key={index + option} value={option.id}>{option[objName]}</option>
                            );
                        })}
                    </select>
                </article>
            )
        default:
            return
    }
}
