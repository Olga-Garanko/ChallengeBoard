import React from 'react';
import './styles.scss';
import cx from 'classnames'

type ButtonProps = {
    type: any,
    className: string,
    isActive: boolean,
    isRadius: number,
    disabled: boolean,
    onClick: (isActive: boolean) => {},
    children?: any
}

export const Button = ({
        type = 'button',
        className = '',
        isActive = true,
        isRadius = 5,
        disabled = false,
        onClick,
        children
    }: ButtonProps) => {
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