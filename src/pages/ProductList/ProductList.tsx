import Layout from '../../components/Layout/Layout';
import styles from './styles.module.scss';

const ProductList = () => {
  const products = [
    {
      name: 'CHAQUETA ENTALLADA PIEL LUDOVIC DE SAINT SERNIN x ZARA',
      mediaUrl:
        'https://static.zara.net/assets/public/cfd7/fc94/66a34f12b04a/81a5b186976d/02297042800-ult21/02297042800-ult21.jpg?ts=1762931766425',
    },
    {
      name: 'TOP DRAPEADO LUDOVIC DE SAINT SERNIN x ZARA',
      mediaUrl:
        'https://static.zara.net/assets/public/073e/5ad9/3cb943d5bb2a/6d341a2c9d9b/09177607922-ult21/09177607922-ult21.jpg?ts=1762931775954',
    },
    {
      name: 'JEANS BOOTCUT TIRO BAJO ENCERADO LUDOVIC DE SAINT SERNIN x ZARA',
      mediaUrl:
        'https://static.zara.net/assets/public/5569/4884/c63f4f69830a/6dcff19fcb81/06840302800-ult21/06840302800-ult21.jpg?ts=1762931775079',
    },
    {
      name: 'VESTIDO PUNTO LANA SEDA LUDOVIC DE SAINT SERNIN x ZARA',
      mediaUrl:
        'https://static.zara.net/assets/public/4ea0/2a72/ddd34cf99c4e/9ef55c8d02cc/09598253800-ult21/09598253800-ult21.jpg?ts=1763376659700',
    },
    {
      name: 'CHAQUETA ENTALLADA PIEL LUDOVIC DE SAINT SERNIN x ZARA',
      mediaUrl:
        'https://static.zara.net/assets/public/cfd7/fc94/66a34f12b04a/81a5b186976d/02297042800-ult21/02297042800-ult21.jpg?ts=1762931766425',
    },
    {
      name: 'TOP DRAPEADO LUDOVIC DE SAINT SERNIN x ZARA',
      mediaUrl:
        'https://static.zara.net/assets/public/073e/5ad9/3cb943d5bb2a/6d341a2c9d9b/09177607922-ult21/09177607922-ult21.jpg?ts=1762931775954',
    },
    {
      name: 'JEANS BOOTCUT TIRO BAJO ENCERADO LUDOVIC DE SAINT SERNIN x ZARA',
      mediaUrl:
        'https://static.zara.net/assets/public/5569/4884/c63f4f69830a/6dcff19fcb81/06840302800-ult21/06840302800-ult21.jpg?ts=1762931775079',
    },
    {
      name: 'VESTIDO PUNTO LANA SEDA LUDOVIC DE SAINT SERNIN x ZARA',
      mediaUrl:
        'https://static.zara.net/assets/public/4ea0/2a72/ddd34cf99c4e/9ef55c8d02cc/09598253800-ult21/09598253800-ult21.jpg?ts=1763376659700',
    },
  ];
  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div>List View</div>
          <input type="text" />
        </div>
        <div className={styles.content}>
          {products.map((p) => (
            <div className={styles.photo} key={p.name}>
              <img className={styles.main_image} src={p.mediaUrl} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductList;
