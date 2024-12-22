import { Maybe } from "../utils/customTypes";
import { useQuery } from "@tanstack/react-query";
import { request } from "../utils/api";
import { components } from "../utils/types";
import { Loader, Modal, Stack, TextInput, Divider, Title } from "@mantine/core";
import dayjs from "dayjs";

interface Props {
  transactionId: Maybe<string>;
  onClose: () => void;
}

const TransactionDetailsModal = ({ transactionId, onClose }: Props) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions", transactionId],
    enabled: !!transactionId,
    queryFn: async () => {
      const response = await request.get<
        components["schemas"]["TransactionDto"]
      >(`/transactions/${transactionId}`);
      return response.data;
    },
  });

  if (error) {
    onClose();
  }

  return (
    <Modal
      centered
      title={<Title order={5}>Transaction Summary</Title>}
      onClose={onClose}
      opened={!!transactionId}
      size="lg"
      padding={10}
    >
      {isLoading || !data ? (
        <Loader />
      ) : (
        <Stack gap="md">
          <Divider />

          <TextInput
            label="Description"
            value={data.description}
            readOnly
            withAsterisk={false}
          />
          <TextInput
            label="Amount"
            value={`$${data.amount.toFixed(2)}`}
            readOnly
            withAsterisk={false}
          />
          <TextInput
            label="Date"
            value={dayjs(data.date).format("D MMMM YYYY")}
            readOnly
            withAsterisk={false}
          />
          <TextInput
            label="Payment Method"
            value={data.paymentMethod}
            readOnly
            withAsterisk={false}
          />
          <TextInput
            label="Category"
            value={data.categoryName}
            readOnly
            withAsterisk={false}
          />
          <TextInput
            label="Creation date"
            value={dayjs(data.createdAt).format("D MMMM YYYY")}
            readOnly
            withAsterisk={false}
          />
        </Stack>
      )}
    </Modal>
  );
};

export default TransactionDetailsModal;
