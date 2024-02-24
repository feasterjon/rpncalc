import { vibrate } from './helpers';
import { Icon } from './icon';
import { useEffect, useState } from 'react';

export function Dropdown(props) {

  const config = props.config || {};

  const data = config.data || [],
    icon = config.icon,
    [visible, setVisible] = useState(false),
    styles = config.styles || {};

  const handleClickOutside = (event) => {
    if (event.target.closest('.dropdown')) return
    setVisible(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="inline-block relative">
      <div className={`
        cursor-pointer
        dropdown
        select-none
        ${styles.main && styles.main}
      `} onClick={() => {vibrate(); setVisible(!visible);}}>
        <Icon id={icon} />
      </div>
      {visible && (
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
                <Icon id={item.icon} /><span className="ml-2">{item.label}</span>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}