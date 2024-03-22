import { Icon } from '../Icon';
import styles from './Dropdown.module.css';
import { useEffect, useState } from 'react';
import { vibrate } from '../../../utils/vibrate';

export function Dropdown(props) {

  const config = props.config || {};

  const data = config.data || [],
    icon = config.icon,
    label = config.label,
    [selected, setSelected] = useState(null),
    [visible, setVisible] = useState(false),
    configStyles = config.styles || {},
    vibrateEnabled = config.vibrateEnabled;

  const handleClickOutside = (event) => {
    if (event.target.closest(`.${styles.dropdown}`) || event.target.closest(`.${styles.persist}`)) return
    setVisible(false);
  };

  const handleKeyDown = (event, item) => {
    if (event.key === 'Enter') {
      if (visible && item) {
        setSelected(item.id);
        item.onClick();
      }
    }
  };

  const handleSelect = (option) => {
    setSelected(option);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="inline-block relative">
      <button className={`
        cursor-pointer
        select-none
        ${styles.dropdown}
        ${configStyles.main}
      `}
        aria-haspopup="listbox"
        aria-label={label}
        aria-expanded={visible}
        onClick={vibrateEnabled ? () => {vibrate(); setVisible(!visible);} : () => {setVisible(!visible);}}
      >
        <Icon id={icon} />
      </button>
      {visible && (
        <div className={`
          absolute
          mt-2
          origin-top
          right-0
          rounded-md
          shadow-md
          z-10
          ${configStyles.menu}
        `}>
          <ul className="py-1" role="listbox">
            {data.map((item) =>
              <li className={`
                cursor-pointer
                flex
                items-center
                p-2
                select-none
                ${configStyles.data}
                ${item.styles ? item.styles : ''}
                ${item.persist ? styles.persist : ''}
              `}
                aria-selected={item.id === selected?.value}
                key={item.id}
                onClick={() => {handleSelect(item.label); item.onClick()}}
                onKeyDown={(event) => handleKeyDown(event, item)}
                role="option"
                tabIndex={visible ? 0 : -1}
              >
                <Icon id={item.icon} /><span className="ml-2">{item.label}</span>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}