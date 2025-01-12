import { FormType } from "@/schema";
import { ItemType } from "@/type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const findUnitById = (units: ItemType[], id: string) =>
  units.find((unit) => unit.id === id);

function collectUnits(units: ItemType[], unit: ItemType): ItemType[] {
  if (!unit) return [];

  const baseUnit = findUnitById(units, unit.baseUnit as string);
  const chain = collectUnits(units, baseUnit as ItemType);

  return [unit, ...chain];
}

// unit conversion function
export const unitConversion = (units: ItemType[], id: string) => {
  const startingUnit = findUnitById(units, id);
  return collectUnits(units, startingUnit as ItemType);
};

export const getFormattedValues = (values: FormType) => {
  const conversionUnits = values.conversionUnits.map((unit) => ({
    unit: unit.unitId,
    quantity: parseInt(unit.quantity),
    name: unit.name,
  }));

  return {
    name: values.name,
    conversionUnits,
  };
};
