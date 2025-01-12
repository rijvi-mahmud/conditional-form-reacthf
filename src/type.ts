export type ItemType = {
  name: string;
  baseUnit?: string;
  conversionFactor?: number;
  id: string;
};

export type ConversionUnitType = {
  name: string;
  quantity: string;
  unitId: string;
};
