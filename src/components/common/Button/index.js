import './styles.scss';
import cx from 'classnames'

const Button = ({
        type = 'button',
        className = '',
        isActive = true,
        isRadius = 5,
        disabled = false,
        onClick,
        children
    }) => {
    return (
        <button
            type={type}
            className={cx(
                'btn',
                { 'button_active': isActive },
                { [`button_radius-${isRadius}`]: isRadius },
                className
            )}
            disabled={disabled}
            onClick={() => {
                if (!disabled) onClick(isActive)
            }}
        >
            {children}
        </button>
    );
}
export default Button;