export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  quantity?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ApiResponse<T> {
  responseCode: number;
  message: string;
  content: T;
}

export interface JotformPaymentInfo {
  // We'll update this once we know the exact structure
  products?: any[];
  settings?: any;
}

export interface JotformSubmission {
  id: string;
  form_id: string;
  ip: string;
  created_at: string;
  status: string;
  new: string;
  flag: string;
  notes: string;
  updated_at: string;
  answers: Record<string, JotformAnswer>;
}

export interface JotformAnswer {
  name: string;
  order: number;
  text: string;
  type: string;
  answer: any;
} 