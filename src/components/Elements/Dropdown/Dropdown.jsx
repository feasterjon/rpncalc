import { Icon } from '../Icon';
import styles from './Dropdown.module.css';
import { useEffect, useState } from 'react';
import { vibrate } from '../../../utils/vibrate';

export function Dropdown(props) {

  const config = props.config || {};

  const data = config.data || [],
    icon = config.icon,
    [selected, setSelected] = useState(null),
    [visible, setVisible] = useState(false),
    configStyles = config.styles || {};

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

  const toggle = (event) => {
    if (event.key === 'Enter') {
      setVisible(!visible);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="inline-block relative">
      <div className={`
        cursor-pointer
        select-none
        ${styles.dropdown}
        ${configStyles.main}
      `}
        aria-haspopup="listbox"
        aria-expanded={visible}
        onClick={() => {vibrate(); setVisible(!visible);}}
        onKeyDown={(event) => toggle(event)}
        tabIndex={0}
      >
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
                key={item.id}
                role="option"
                aria-selected={item.id === selected?.value}
                onClick={() => {handleSelect(item.label); item.onClick()}}
                tabIndex={visible ? 0 : -1}
                onKeyDown={(event) => handleKeyDown(event, item)}
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