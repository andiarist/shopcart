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
console.log(products);

app.get('/api/product', (req: Request, res: Response) => {
  res.json(products);
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
