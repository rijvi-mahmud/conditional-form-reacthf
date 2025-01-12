import * as yup from "yup";
// Define Yup validation schema
export const schema = yup.object().shape({
  name: yup
    .string()
    .required("Product name is required")
    .min(5, "Product name must be at least 5 characters")
    .max(10, "Product name must be at most 10 characters"),
  unit: yup.string().required("Please select a unit"),
  conversionUnits: yup
    .array()
    .of(
      yup.object().shape({
        name: yup
          .string()
          .required("Unit name is required")
          .min(5, "Unit name must be at least 5 characters")
          .max(10, "Unit name must be at most 10 characters"),
        quantity: yup
          .string()
          .required("Quantity is required")
          .min(1, "Quantity must be a positive number"),
        unitId: yup.string(),
      })
    )
    .required(),
});

export type FormType = yup.InferType<typeof schema>;

export const initialValues: FormType = {
  name: "",
  unit: "",
  conversionUnits: [],
};
