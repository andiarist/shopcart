import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { useProductDetail } from '../../hooks/useProductDetail';
import styles from './styles.module.scss';
import { PhotoGallery } from '../../components/PhotoGallery/PhotoGallery';

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
          <div>Loading detail</div>
        ) : data ? (
          <div className={styles.content}>
            <div className={`${styles.product_item} ${styles.product_images}`}>
              <PhotoGallery
                images={data.otherMediaUrl.map((img: string, index: number) => ({
                  src: img,
                  alt: `${data.reference}_thumb-${index}`,
                }))}
              />
            </div>
            <div className={`${styles.product_item} ${styles.product_data}`}>
              <div className={styles.descriptions}>
                <h3>Descripcion de producto</h3>
                <ul>
                  <li key={data.reference.slice(0, 10)}>Ref:{data.reference}</li>
                  <li key={data.name.slice(0, 10)}>Name: {data.name}</li>
                  <li key={data.description.slice(0, 10)}>Desc: {data.description}</li>
                </ul>
              </div>
              <div className={styles.actions}>
                <select name="size" id="size" value={size} onChange={handleChangeSize}>
                  {data.sizes.map((s: string) => (
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
                  onChange={(e) => handleChangeAmount(e)}
                />
                <button onClick={handleAdd}>Añadir</button>
              </div>
            </div>
          </div>
        ) : (
          <div>Ocurrió un error</div>
        )}
      </div>
    </Layout>
  );
};
export default ProductDetail;
