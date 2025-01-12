import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cn, getFormattedValues, unitConversion } from "./lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Button } from "./components/ui/button";
import { FormType, initialValues, schema } from "./schema";
import { units } from "./data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import { useState } from "react";
import { Trash2Icon } from "lucide-react";

function App() {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const { getValues, control, setValue, reset, handleSubmit } = form;

  const formValues = getValues();
  const conversionUnitsLength = formValues.conversionUnits.length;

  const onSubmit: SubmitHandler<FormType> = () => {
    if (conversionUnitsLength > 0) {
      setOpen(true);
    }
    getFormattedValues(formValues);
    setTimeout(() => {
      handleReset();
      setOpen(false);
    }, 4000);
  };

  const handleReset = () => {
    reset(initialValues);
  };

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "conversionUnits",
  });

  const handleUnitChange = (value: string) => {
    const conversionUnits = unitConversion(units, value);
    reset({
      ...formValues,
      conversionUnits: [],
    });

    setValue("unit", value);

    conversionUnits.forEach((unit) => {
      append({ unitId: unit.id, quantity: "0", name: "" });
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Conversion Form
      </h1>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Unit</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleUnitChange(value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {units.map((unit) => (
                          <SelectItem key={unit.id} value={unit.id}>
                            {unit.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {fields.length > 0 && (
            <div>
              <h2 className="text-xl font-medium text-gray-700 mb-4">
                Conversion Units
              </h2>
              <div
                className={cn("grid gap-4", {
                  "grid-cols-2": fields.length > 1,
                })}
              >
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="p-4 border rounded-lg bg-gray-50 space-y-4"
                  >
                    <FormField
                      control={control}
                      name={`conversionUnits.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Unit Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Unit Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name={`conversionUnits.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input placeholder="Quantity" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => {
                        remove(index);
                        if (conversionUnitsLength === 1) {
                          handleReset();
                        }
                      }}
                    >
                      <Trash2Icon />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="sm:flex sm:justify-center">
            <Button type="submit" className="w-full sm:w-1/2">
              Submit
            </Button>
          </div>
        </form>
      </Form>

      <Dialog open={open} onOpenChange={setOpen} defaultOpen={false}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>See the form values</DialogTitle>
            <DialogDescription>
              {JSON.stringify(getFormattedValues(formValues), null, 2)}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
