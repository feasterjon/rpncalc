import { Icon } from '../Icon';
import styles from './Dropdown.module.css';
import { useEffect, useState } from 'react';
import { vibrate } from '../../../utils/vibrate';

type Item = {
  icon: string;
  id: number;
  label: string;
  onClick: () => void;
  persist?: boolean;
  styles?: string;
}

type Config = {
  data: Item[];
  icon: string;
  label: string;
  styles: {
    data?: string;
    main?: string;
    menu?: string;
  };
  vibrateEnabled?: boolean;
}

type DropdownProps = {
  config: Config;
}

export function Dropdown({ config }: DropdownProps) {

  const { data = [], icon, label, styles: configStyles = {}, vibrateEnabled = false } = config,
    [selected, setSelected] = useState<string | null>(null),
    [visible, setVisible] = useState<boolean>(false);

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const closestDropdown = target.closest(`.${styles.dropdown}`),
      closestPersist = target.closest(`.${styles.persist}`);
    if (closestDropdown || closestPersist) return
    setVisible(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>, item: Item) => {
    if (e.key === 'Enter' && visible && item) {
      setSelected(item.id.toString());
      item.onClick();
    }
  };

  const handleSelect = (option: string) => {
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
        ${configStyles.main || ''}
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
          ${configStyles.menu || ''}
        `}>
          <ul className="py-1" role="listbox">
            {data.map((item) =>
              <li className={`
                cursor-pointer
                flex
                items-center
                p-2
                select-none
                ${configStyles.data || ''}
                ${item.styles ? item.styles : ''}
                ${item.persist ? styles.persist : ''}
              `}
                aria-selected={item.id.toString() === selected}
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