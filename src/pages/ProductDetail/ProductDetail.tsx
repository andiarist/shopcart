import { useState } from 'react';
import styles from './styles.module.scss';
import Layout from '../../components/Layout/Layout';

const ProductDetail = () => {
  const productData = {
    id: 471370989,
    reference: '02297042-I2025',
    name: 'CHAQUETA ENTALLADA PIEL LUDOVIC DE SAINT SERNIN x ZARA',
    description:
      'WOMAN CAZADORA W.P-EXT.CORTA CHAQUETA ENTALLADA PIEL LUDOVIC DE SAINT SERNIN x ZARA',
    mediaUrl:
      'https://static.zara.net/assets/public/cfd7/fc94/66a34f12b04a/81a5b186976d/02297042800-ult21/02297042800-ult21.jpg?ts=1762931766425',
    otherMediaUrl: [
      'https://static.zara.net/assets/public/62ba/08b4/ea0e451f9553/e2c43a9000a9/02297042800-e1/02297042800-e1.jpg?ts=1762792787540',
      'https://static.zara.net/assets/public/4a89/0836/78184d539c14/403b0e6acc45/02297042800-ult26/02297042800-ult26.jpg?ts=1762792787684',
      'https://static.zara.net/assets/public/4a89/0836/78184d539c14/403b0e6acc45/02297042800-ult26/02297042800-ult26.jpg?ts=1762792787684',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    price: 139900,
  };

  const [amount, setAmount] = useState(1);
  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div>Detail View</div>
        </div>
        <div className={styles.content}>
          <div className={`${styles.product_item} ${styles.product_images}`}>
            <img src={productData.mediaUrl} alt="imagen de producto" />
          </div>
          <div className={`${styles.product_item} ${styles.product_data}`}>
            <div className={styles.descriptions}>
              <h3>Descripcion de producto</h3>
              <ul>
                <li key={productData.reference.slice(0, 10)}>Ref:{productData.reference}</li>
                <li key={productData.name.slice(0, 10)}>Name: {productData.name}</li>
                <li key={productData.description.slice(0, 10)}>Desc: {productData.description}</li>
              </ul>
            </div>
            <div className={styles.actions}>
              <select name="size" id="size">
                {productData.sizes.map((s) => (
                  <option value={s} key={s}>
                    {s}
                  </option>
                ))}
              </select>

              <input
                type="number"
                id="amount"
                aria-describedby="helper-text-explanation"
                className={styles.amount_input}
                value={amount}
                min={1}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <button>Añadir</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ProductDetail;
