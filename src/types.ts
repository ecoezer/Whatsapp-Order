export interface MenuItem {
  id: number;
  number: number | string;
  name: string;
  description?: string;
  price: number | {
    medium?: number;
    large?: number;
    family?: number;
    mega?: number;
  };
  allergens?: string;
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  address: string;
  phone: string;
  note?: string;
}