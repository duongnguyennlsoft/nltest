type User = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  dayOfBirth?: string;
};

type Product = {
  id: string;
  image: string[];
  price: number;
  name: string;
  description: string;
};

interface CartItem extends Product {
  quantity: number;
}

type Discount = {
  id: string;
  code: string;
  isPercent: boolean;
  discountValue: number;
};
