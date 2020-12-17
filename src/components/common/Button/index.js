import './styles.scss';
import cx from 'classnames'

export const Button = ({
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
                'button',
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