import { Icon } from './icon';
import { useEffect, useState } from 'react';

export function Dropdown(props) {

  const config = props.config || {};

  const data = config.data || [],
    icon = config.icon,
    [isOpen, setIsOpen] = useState(false),
    styles = config.styles || {},
    vibrateEnabled = (typeof window.navigator.vibrate === 'function') ? true : false;

  const handleClickOutside = (event) => {
    if (event.target.closest('.dropdown')) return
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const vibrateBasic = (pattern = [50]) => {
    if (!vibrateEnabled) return
    window.navigator.vibrate(pattern);
  };

  return (
    <div className="inline-block relative">
      <div className={`
        cursor-pointer
        dropdown
        select-none
        ${styles.main && styles.main}
      `} onClick={() => {vibrateBasic(); setIsOpen(!isOpen);}}>
        <Icon id={icon} />
      </div>
      {isOpen && (
        <div className={`
          absolute
          mt-2
          origin-top
          right-0
          rounded-md
          shadow-md
          z-10
          ${styles.menu && styles.menu}
        `}>
          <ul className="py-1">
            {data.map((item) =>
              <li className={`
                cursor-pointer
                flex
                items-center
                p-2
                select-none
                ${styles.data && styles.data}
                ${item.styles && item.styles}
              `} key={`dropdown-${item.id}`} onClick={item.onClick}>
                <Icon id={item.icon} /><span className="pl-2">{item.label}</span>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}