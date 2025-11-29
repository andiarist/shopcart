import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const productsPath = path.join(__dirname, 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

app.get('/api/product', (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = String(req.query.search) || '';

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const filteredProduct =
    search.length > 0
      ? products.filter(
          (p) =>
            p.reference.toLowerCase().includes(search) ||
            p.name.toLowerCase().includes(search) ||
            p.description.toLowerCase().includes(search)
        )
      : products;

  const paginatedProducts = filteredProduct.slice(startIndex, endIndex);
  res.json({
    pageData: {
      page,
      limit,
      total: filteredProduct.length,
      totalPages: Math.ceil(filteredProduct.length / limit),
    },
    data: paginatedProducts,
  });
});

app.get('/api/product/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = products.find((p: { id: number }) => p.id === id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.post('/api/cart', (req: Request, res: Response) => {
  const { id, size, total } = req.body;

  if (!id || !size || !total) {
    return res.status(400).json({ error: 'id, size and total  are required' });
  }

  res.json({ count: total });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
