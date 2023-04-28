import './Button.css'

const Button = (props) => {
    return (
        <button
            className={`
                button 
                ${props.operation ? 'operation' : ''}
                ${props.double ? 'double' : ''}
                ${props.triple ? 'triple' : ''}
            `}
            onClick={(e) => props.onEventClick && props.onEventClick(e.target.innerHTML)}
        >
            {props.label}
        </button>
    )
}

export default Button