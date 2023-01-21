import { useState } from 'react';
import {
    animated,
    useSpring,
    config,
    useSpringRef,
    useChain,
} from 'react-spring';

function Checkbox({ content, isChecked, setIsChecked, handleChecked }) {
    // const [isChecked, setIsChecked] = useState(false);
    const checkboxAnimationRef = useSpringRef();
    const checkboxAnimationStyle = useSpring({
        backgroundColor: isChecked ? '#553624' : 'transparent',
        borderColor: isChecked ? '#553624' : 'rgb(184, 184, 184)',
        config: config.gentle,
        ref: checkboxAnimationRef,
    });

    const checkmarkAnimationRef = useSpringRef();
    const [checkmarkLength, setCheckmarkLength] = useState(null);
    const checkmarkAnimationStyle = useSpring({
        x: isChecked ? 0 : checkmarkLength,
        config: config.wobbly,
        ref: checkmarkAnimationRef,
    });

    useChain(
        isChecked
            ? [checkboxAnimationRef, checkmarkAnimationRef]
            : [checkmarkAnimationRef, checkboxAnimationRef],
        [0, 0.12] // -> delay by 0.1 seconds
    );

    return (
        <label
            className={`checkbox__label ${
                isChecked ? 'checkbox--active__label' : ''
            }`}
        >
            {content}
            <animated.svg
                style={checkboxAnimationStyle}
                className={`checkbox ${isChecked ? 'checkbox--active' : ''}`}
                // This element is purely decorative so
                // we hide it for screen readers
                aria-hidden="true"
                viewBox="0 0 15 11"
                fill="none"
            >
                <animated.path
                    d="M1 4.5L5 9L14 1"
                    strokeWidth="2"
                    // stroke={isChecked ? '#fff' : 'none'} // only show the checkmark when `isCheck` is `true`
                    ref={(ref) => {
                        if (ref) {
                            setCheckmarkLength(ref.getTotalLength());
                        }
                    }}
                    stroke="#fff"
                    strokeDasharray={checkmarkLength}
                    strokeDashoffset={checkmarkAnimationStyle.x}
                />
            </animated.svg>
            <input
                type="checkbox"
                onChange={(e) => {
                    setIsChecked(!isChecked);
                    handleChecked(!isChecked);
                }}
            />
        </label>
    );
}

export default Checkbox;
