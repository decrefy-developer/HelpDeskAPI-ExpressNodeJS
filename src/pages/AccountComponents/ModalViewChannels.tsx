import {
  Skeleton,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import ModalComponent from "../../components/Modal";
import { useChannelsOfTheUserQuery } from "../../features/member-query";

const ModalViewTeamsandChannels: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}> = ({ isOpen, onClose, userId }) => {
  const { data: datas, isFetching } = useChannelsOfTheUserQuery(userId);
  return (
    <ModalComponent
      title="Teams & Channels"
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      isCentered={false}
    >
      {isFetching ? (
        <Stack w="full" py={10}>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      ) : datas && datas?.length <= 0 ? (
        <Text color="danger" as="em">
          No teams and channels found.
        </Text>
      ) : (
        <Table borderColor="white" size="sm">
          <Thead>
            <Tr>
              <Th>Teams</Th>
              <Th>Channels Group</Th>
            </Tr>
          </Thead>
          <Tbody>
            {datas?.map((item) => (
              <Tr key={item._id}>
                <Td>{item._id}</Td>
                <Td>[ {item.channels.join(" , ")} ]</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </ModalComponent>
  );
};

export default ModalViewTeamsandChannels;
