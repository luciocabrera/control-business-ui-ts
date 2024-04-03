import { useState } from 'react';
import { AiFillFilter, AiFillHome } from 'react-icons/ai';
import { BiSortAlt2 } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiViewColumns } from 'react-icons/hi2';
import { MdOutlineSwipeVertical } from 'react-icons/md';
import { SiMicrosoftexcel } from 'react-icons/si';
import { Link, useLocation } from 'react-router-dom';
import { useOutsideClick } from 'hooks/useOutsideClick';

import type { TTableSettingsMenuButtonProps } from './TableSettingsMenuButton.types';

import styles from './TableSettingsMenuButton.module.css';

const TableSettingsMenuButton = ({
  isPivot = false,
  onClickExportToExcel,
  onToggleExpandGroupedRows,
  showColumns = true,
  showFilters = true,
  showSorting = true,
}: TTableSettingsMenuButtonProps) => {
  const { search } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const onMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const onCloseMenu = () => setIsOpen(false);

  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });

  return (
    <section
      ref={ref}
      className={styles.menu}
    >
      <button
        aria-label='Table Settings'
        name='tableSettingsButton'
        title='Table Settings'
        type='button'
        onClick={onMenuClick}
      >
        <GiHamburgerMenu />
      </button>
      {isOpen && (
        <ul>
          {showFilters && (
            <li>
              <Link
                to={`filter${search}`}
                onClick={onCloseMenu}
              >
                <AiFillFilter />
                Filters{''}
              </Link>
            </li>
          )}
          {showSorting && (
            <li>
              <Link
                to={`sorting${search}`}
                onClick={onCloseMenu}
              >
                <BiSortAlt2 />
                Sorting{''}
              </Link>
            </li>
          )}
          {showColumns && (
            <li>
              <Link
                to={`columns${search}`}
                onClick={onCloseMenu}
              >
                <HiViewColumns />
                Columns{''}
              </Link>
            </li>
          )}
          <li onClick={onCloseMenu}>
            <button
              aria-label='Export to Excel'
              name='exportToExcelButton'
              title='Export to Excel'
              type='button'
              onClick={onClickExportToExcel}
            >
              <SiMicrosoftexcel />
              <span>Export</span>
            </button>
          </li>
          {isPivot && (
            <li onClick={onCloseMenu}>
              <button
                aria-label='Expand / Collapse'
                name='expandCollapseButton'
                title='Expand / Collapse'
                type='button'
                onClick={onToggleExpandGroupedRows}
              >
                <MdOutlineSwipeVertical />
                <span>Expand/Collapse</span>
              </button>
            </li>
          )}
          <li>
            <Link
              to='/'
              onClick={onCloseMenu}
            >
              <AiFillHome />
              Home{' '}
            </Link>
          </li>
        </ul>
      )}
    </section>
  );
};

export default TableSettingsMenuButton;
