import { Icon } from '../Icon';
import { useEffect, useState } from 'react';
import { vibrate } from '../../../utils/vibrate';

export function Keyboard(props) {

  const configButtons = props.config.buttons?.data || [],
    configButtonsStyles = props.config.buttons?.styles || {},
    [dynamicStyles, setDynamicStyles] = useState(''),
    [pressedKey, setPressedKey] = useState(''),
    setCurrentInput = props.config.setCurrentInput,
    vibrateEnabled = props.config.buttons?.vibrateEnabled;

  const buttons = configButtons.map((button) => ({
    aria: button.aria ? button.aria : button.label ? button.label : button.value,
    icon: button.icon || {},
    id: button.id,
    label: button.label || button.value,
    order: button.order,
    stylesType: configButtonsStyles[button.type] || configButtonsStyles.main,
    type: button.type,
    value: button.value
  }));

  const handleInput = (input) => {
    if (vibrateEnabled) vibrate();
    setCurrentInput(input);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const button = buttons.find(button => button.value === event.key);
      if (button) {
        setPressedKey(button.id);
        setDynamicStyles(button.stylesType.active || '');
        setTimeout(() => {
          setPressedKey(null);
          setDynamicStyles('');
        }, 100);
        setCurrentInput(button);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [buttons, setCurrentInput]);

  return (
    <div className="
      flex
      lg:aspect-square
      lg:w-auto
      rpncalc-tall:aspect-square
      rpncalc-tall:items-center
      sm:w-full
      w-auto
    ">
      <div className="
        flex
        flex-wrap
        items-center
        justify-center
        w-full
      ">
        {buttons.map((button) =>
          <div
            className={`
              ${button.type === 'fn' ? 'basis-1/5' : 'basis-1/4'}
              ${button.order}
              sm:basis-1/5
            `}
            key={`button-${button.id}`}
          >
            <button
              className={`
                aspect-square
                cursor-pointer
                dark:text-neutral-100
                flex
                font-bold
                items-center
                justify-center
                lg:aspect-square
                mx-auto
                my-[0.125rem]
                rounded-full
                rpncalc-tall:aspect-square
                rpncalc-tall:text-3xl
                select-none
                size-3/4
                sm:aspect-auto
                sm:size-11/12
                sm:text-xl
                text-center
                text-neutral-900
                text-2xl
                ${button.stylesType.etc}
                ${`button-${button.id}` === `button-${pressedKey}` ? dynamicStyles : button.stylesType.main ? button.stylesType.main : ''}
              `}
              aria-label={button.aria}
              onClick={() => handleInput(button)}
              tabIndex={-1}
            >
              {button.icon.id ? <Icon id={button.icon.id} styles={button.icon.styles ? button.icon.styles : 'lg:size-6 rpncalc-tall:size-6 size-8 sm:size-7'} /> : button.label}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}