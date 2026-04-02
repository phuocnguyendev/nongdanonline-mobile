import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { Block } from './api.types';

// Root Stack Param List
export type RootStackParamList = {
  'Login Navigation': undefined;
  'Main Screen': undefined;
  'Farms List': undefined;
  Camera: { penCode: string; developStage: string };
  Sensor: { penCode: string; sensorCode: string };
  Checkout: undefined;
  AddAddress: undefined;
  UpdateAddress: { addressId: string; addressData: Record<string, unknown> };
  QRCodeScreen: { data: string };
  AnimalHealth: { animalOwnerUserId: string };
};

// Login Stack Param List
export type LoginStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPass: undefined;
};

// Drawer Param List
export type DrawerParamList = {
  HomeTab: undefined;
  Profile: undefined;
  Notification: undefined;
  About: undefined;
  Contact: undefined;
};

// Tab Param List
export type TabParamList = {
  'Trang Chủ': undefined;
  'Trang Trại Của Tôi': undefined;
  'Giỏ Hàng': undefined;
};

// Home Stack Param List
export type HomeStackParamList = {
  FarmList: undefined;
  FarmInfo: { farmID: string };
  ProductFarm: { farmID: string; product: Record<string, unknown> };
  BlockList: { farmID: string; animalTypeId: string };
  InfoScreen: { blockData: Block; endDate: string };
  MainImageScreen: { blockData: Block };
  ActionsScreen: { blockData: Block };
  AddAnimalScreen: { blockData: Block; farmID: string };
  AddPackageScreen: {
    animalID: string;
    blockData: Block;
    animalOwnerUserId: string;
  };
  BuyPackageScreen: { packageData: Record<string, unknown> };
  BlockInfoScreen: { blockData: Block };
  CarePackageScreen: { animalOwnerUserId: string };
};

// Utility types for navigation
export type NavigationProp<
  T extends Record<string, object | undefined>,
  K extends keyof T,
> = StackNavigationProp<T, K>;

export type ScreenRouteProp<
  T extends Record<string, object | undefined>,
  K extends keyof T,
> = RouteProp<T, K>;
