import { ShoppingCart } from 'lucide-react';
import styles from './styles.module.scss';
import { useState } from 'react';
import { useAppDispatch } from '../../core/store/store';
import { resetCart } from '../../core/store/cartSlice';

export const CartPannel = () => {
  const dispatch = useAppDispatch();
  const total = localStorage.getItem('totalElements');
  const [panelVisible, showPanelVisible] = useState(false);
  return (
    <>
      <div className={styles.button_wrapper}>
        {total && Number(total) > 0 && (
          <div className={styles.badge_wrapper}>
            <span>{total}</span>
          </div>
        )}
        <button onClick={() => showPanelVisible((prev) => !prev)} className={styles.icon}>
          <ShoppingCart />
        </button>
      </div>
      {panelVisible && (
        <div className={styles.pannel}>
          <button
            onClick={() => {
              dispatch(resetCart());
              showPanelVisible(false);
            }}
          >
            Vaciar carrito
          </button>
        </div>
      )}
    </>
  );
};
