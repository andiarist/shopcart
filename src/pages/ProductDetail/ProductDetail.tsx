import { useState } from 'react';
import styles from './styles.module.scss';
import Layout from '../../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import { useAddProductMutation, useGetProductDetailQuery } from '../../core/services/shopCartApi';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetProductDetailQuery(id || '');
  const [postCart] = useAddProductMutation();

  const [size, setSize] = useState(data?.sizes[0] || '');
  const [amount, setAmount] = useState(1);

  const handleAdd = async () => {
    try {
      const res = await postCart({ id: Number(id), size, total: amount });
      console.log('res: ', res);
    } catch {
      alert('No se ha podido añadir al carro');
    }
  };

  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div>Detail View</div>
        </div>
        {isLoading ? (
          <div>Loading detail</div>
        ) : data ? (
          <div className={styles.content}>
            <div className={`${styles.product_item} ${styles.product_images}`}>
              <img src={data.mediaUrl} alt="imagen de producto" />
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
                <select
                  name="size"
                  id="size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAmount(Number(e.target.value))
                  }
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
