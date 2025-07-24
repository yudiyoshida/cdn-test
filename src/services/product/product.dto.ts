export type ProductDto = {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  promotionalPriceInCents: number | null;
  redirectUrl: string;
  active: boolean;
  blockedByAdmin: boolean;
  blockedReason: string | null;
  favorited: boolean;
  gender: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
  store: {
    id: string;
    name: string;
  };
  images: ProductImageDto[];
  createdAt: Date;
  updatedAt: Date;
}

export type ProductImageDto = {
  id: string;
  order: number;
  imageUrl: string;
}