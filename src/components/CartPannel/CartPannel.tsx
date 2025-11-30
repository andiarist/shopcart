import { ShoppingCart } from 'lucide-react';
import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../core/store/store';
import { resetCart } from '../../core/store/cartSlice';
import { cartStore } from '../../core/store/store-selects';

export const CartPannel = () => {
  const dispatch = useAppDispatch();
  const { totalElements } = useAppSelector(cartStore);
  const [panelVisible, showPanelVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        showPanelVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [panelRef, showPanelVisible]);

  return (
    <>
      <div className={styles.button_wrapper}>
        {totalElements > 0 && (
          <div className={styles.badge_wrapper}>
            <span>{totalElements}</span>
          </div>
        )}
        <button onClick={() => showPanelVisible((prev) => !prev)} className={styles.icon}>
          <ShoppingCart />
        </button>
      </div>
      {panelVisible && (
        <div className={styles.pannel} ref={panelRef}>
          {totalElements > 0 ? (
            <>
              <p>Total elements: {totalElements} </p>
              <button
                onClick={() => {
                  dispatch(resetCart());
                  showPanelVisible(false);
                }}
              >
                Empty cart
              </button>
            </>
          ) : (
            <p>Cart empty </p>
          )}
        </div>
      )}
    </>
  );
};
