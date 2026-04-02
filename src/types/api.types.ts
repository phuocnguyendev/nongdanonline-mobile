// API Response Types
export interface ApiResponse<T = unknown> {
  statusCode: number;
  message: string;
  data: T;
}

export interface PaginatedResponse<T = unknown> {
  items: T[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  role: string;
}

export interface UserAddress {
  id: string;
  userId: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  isDefault: boolean;
}

// Auth Types
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// Farm Types
export interface Farm {
  id: string;
  farmID: string;
  name: string;
  description: string;
  address: string;
  image: string;
  animalTypes: AnimalType[];
}

export interface FarmDetails extends Farm {
  blocks: Block[];
  products: Product[];
}

export interface Block {
  blockId: string;
  blockCode: string;
  blockName: string;
  endDate: string;
  animalOwnerUsers: AnimalOwnerUser[];
}

export interface AnimalOwnerUser {
  animalOwnerUserId: string;
  animalID: string;
  animalName: string;
}

export interface AnimalType {
  animalTypeId: string;
  name: string;
}

export interface Animal {
  id: string;
  animalId: string;
  name: string;
  type: string;
}

// Package Types
export interface Package {
  id: string;
  packageId: string;
  packageName: string;
  price: number;
  description: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  farmID: string;
  type: string;
}

// Cart Types
export interface CartItem {
  id: string;
  uniqueIdentifier: string;
  name: string;
  price: number;
  quantity: number;
  quantityMonth?: number;
  type: 'product' | 'block';
  farmID: string;
  image?: string;
  description?: string;
}

// Notification Types
export interface NotificationItem {
  notificationID: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
}

export interface NotificationResponse {
  success: boolean;
  data?: NotificationItem[];
  message?: string;
}

// Order Types
export interface Order {
  orderId: string;
  orderCode: string;
  orderStatus: number;
  orderDate: string;
  totalPrice: number;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Shipping Types
export interface ShippingItem {
  shippingId: string;
  shippingCode: string;
  shippingStatus: number;
  shippingDate: string;
  farmID: string;
}

// Payment Types
export interface PaymentData {
  items: PaymentItem[];
  addressId: string;
  note?: string;
}

export interface PaymentItem {
  productId: string;
  quantity: number;
  quantityMonth?: number;
}

// Sensor Types
export interface SensorData {
  timestamp: string;
  value: number;
  unit: string;
}

// Animal Health Types
export interface AnimalHealthRecord {
  id: string;
  date: string;
  weight: number;
  feedAmount: number;
  healthStatus: string;
  notes: string;
}

// Add Animal Types
export interface AddAnimalData {
  blockOwnerUserID: string;
  animalId: string;
  animalName: string;
  myPackageId: string;
}
