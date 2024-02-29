import { Icon } from '../Icon';
import styles from './Dropdown.module.css';
import { useEffect, useState } from 'react';
import { vibrate } from '../../../utils/vibrate';

export function Dropdown(props) {

  const config = props.config || {};

  const data = config.data || [],
    icon = config.icon,
    [visible, setVisible] = useState(false),
    configStyles = config.styles || {};

  const handleClickOutside = (event) => {
    if (event.target.closest(`.${styles.dropdown}`) || event.target.closest(`.${styles.persist}`)) return
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
        select-none
        ${styles.dropdown}
        ${configStyles.main}
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
          ${configStyles.menu}
        `}>
          <ul className="py-1">
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