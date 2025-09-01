export type LoginType = {
  email: string;
  password: string;
};

export type SignupType = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type JWTType = {
  sellerId: string;
  sellerEmail: string;
  sellerName: string;
};

export type ListingType = {
  imageUrl: string;
  title: string;
  description?: string;
  price: number;
  stock: number;
};
