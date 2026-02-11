import { Box, Text } from "@chakra-ui/react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartItem {
  name: string;
  value: number;
}
interface DashboardChartProps {
  data: ChartItem[];
}

function DashboardChart({ data }: DashboardChartProps) {
  return (
    <Box bg="white" p={6} rounded="lg" shadow="sm" w="100%">
      {/* Placeholder for Chart */}

      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Monthly Activity
      </Text>

      <Box h="300px">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3182CE"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

export default DashboardChart;
