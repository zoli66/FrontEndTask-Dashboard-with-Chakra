import { Box, Text, VStack } from "@chakra-ui/react";

interface Props {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
}
function StatsCard({ title, value, icon }: Props) {
  return (
    <Box bg="white" p={4} rounded="md" shadow="sm" minW="150px">
      <VStack gap={2} align="start">
        {icon && <Box>{icon}</Box>}
        <Text fontSize="sm" color="gray.500">
          {title}
        </Text>
        <Text fontSize="2xl" fontWeight="bold">
          {value}
        </Text>
      </VStack>
    </Box>
  );
}

export default StatsCard;
