import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { useProductDetail } from '../../hooks/useProductDetail';
import styles from './styles.module.scss';
import { PhotoGallery } from '../../components/PhotoGallery/PhotoGallery';
import { ShoppingCart } from 'lucide-react';
import { Loader } from '../../components/Loader/Loader';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { handleAdd, data, isLoading, size, handleChangeSize, amount, handleChangeAmount } =
    useProductDetail(id || '');

  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>Detail View</h1>
        </div>
        {isLoading ? (
          <Loader />
        ) : data ? (
          <div className={styles.content}>
            <div className={` ${styles.product_images}`}>
              <PhotoGallery
                images={data.otherMediaUrl.map((img: string, index: number) => ({
                  src: img,
                  alt: `${data.reference}_thumb-${index}`,
                }))}
              />
            </div>
            <div className={`${styles.product_data}`}>
              <div>
                <p className={styles.light_text}>Ref: {data.reference}</p>
                <p className={styles.product_name}>{data.name}</p>
                <p className={styles.product_price}>{data.price / 100} EUR</p>
                <p className={styles.light_text}>Description:</p>
                <p className={styles.product_desc}>{data.description}</p>
              </div>
              <div className={styles.actions}>
                <div className={styles.selectors}>
                  <div className={styles.select_size}>
                    <label htmlFor="size">Select size:</label>
                    <select name="size" id="size" value={size} onChange={handleChangeSize}>
                      {data.sizes.map((s: string) => (
                        <option value={s} key={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.select_quantity}>
                    <label htmlFor="amount">Quantity:</label>
                    <input
                      type="number"
                      id="amount"
                      aria-describedby="helper-text-explanation"
                      className={styles.amount_input}
                      value={amount}
                      min={1}
                      onChange={(e) => handleChangeAmount(e)}
                    />
                  </div>
                </div>
                <button onClick={handleAdd} className={styles.add_cart_btn}>
                  <ShoppingCart />
                  Add to car
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>There was an error, please try it later</div>
        )}
      </div>
    </Layout>
  );
};
export default ProductDetail;
