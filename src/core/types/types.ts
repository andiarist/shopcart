export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Product {
  id: number;
  reference: string;
  name: string;
  description: string;
  mediaUrl: string;
  otherMediaUrl: string[];
  sizes: string[];
  price: number;
}
