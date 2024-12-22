import {
  Modal,
  NumberInput,
  Button,
  Select,
  Stack,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { components } from "../utils/types";
import { DatePickerInput } from "@mantine/dates";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../utils/api";
import {
  transactionCategoryDto,
  transactionPaymentMethodDto,
} from "../utils/dtos";
import dayjs from "dayjs";

type FormType = components["schemas"]["CreateTransactionDto"];

interface Props {
  opened: boolean;
  onClose: () => void;
}

const CreateTransactionModal = ({ onClose, opened }: Props) => {
  const queryClient = useQueryClient();
  const categories = useQuery({
    queryKey: ["categories"] as const,
    queryFn: async () => {
      const { data } = await request.get<
        components["schemas"]["CategoryDto"][]
      >("/categories");
      return data;
    },
  });
  const { mutate: createTransaction } = useMutation({
    mutationFn: (data: FormType) => request.post("/transactions", data),
    async onSuccess() {
      await queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0]
            ? query.queryKey[0].toString().startsWith("/transactions")
            : false,
      });
      onClose();
    },
  });
  const form = useForm<FormType>({
    initialValues: {
      amount: 0,
      description: "",
      date: dayjs().format("YYYY-MM-DD"),
      paymentMethod: "",
      category: "",
    },
    validate: {
      amount: (value) => (value > 0 ? null : "Amount must be greater than 0"),
      description: (value) =>
        value.trim() !== "" ? null : "Description is required",
      date: (value) => (value ? null : "Date is required"),
      paymentMethod: (value) => (value ? null : "Payment method is required"),
      category: (value) => (value ? null : "Category is required"),
    },
  });

  const handleSubmit = (
    values: components["schemas"]["CreateTransactionDto"]
  ) => createTransaction(values);

  return (
    <Modal opened={opened} onClose={onClose} title="Create Transaction">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="sm">
          <NumberInput
            label="How much did you pay?"
            placeholder="Enter the amount"
            {...form.getInputProps("amount")}
            required
          />
          <Textarea
            label="What was the reason?"
            placeholder="Enter a description"
            {...form.getInputProps("description")}
            required
          />
          <DatePickerInput
            label="Transaction Date"
            placeholder="Select a date"
            {...form.getInputProps("date")}
            onChange={(val) => val && val.toISOString()}
            value={dayjs(form.values.date).toDate()}
            required
          />
          <Select
            label="Payment Method"
            placeholder="Choose a payment method"
            data={Object.entries(transactionPaymentMethodDto).map(
              ([value, label]) => ({
                label,
                value,
              })
            )}
            {...form.getInputProps("paymentMethod")}
            required
          />
          <Select
            label="Category"
            placeholder="Choose a category"
            data={
              categories.data?.map(({ name: category }) => ({
                value: category,
                label: transactionCategoryDto[category] || category,
              })) || []
            }
            {...form.getInputProps("category")}
            required
          />
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default CreateTransactionModal;
