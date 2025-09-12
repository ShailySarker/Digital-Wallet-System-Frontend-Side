import {
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface ITransactionTypeBasedData {
  transactionTypeBasedData: {
    type: string;
    count: number;
  }[];
}

export default function TransactionTypeBasedBarChart({
  transactionTypeBasedData,
}: ITransactionTypeBasedData) {
  const isMobile = useIsMobile();

  return (
    <Card className="rounded-xl border border-primary">
      <CardHeader>
        <CardTitle>Transaction Type Based BarChart</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] p-0 pr-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={transactionTypeBasedData}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 50,
            }}
            barSize={35}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {isMobile ? (
              <XAxis
                dataKey="type"
                tick={{ fontSize: 10, fontWeight: 600 }}
                angle={-40}
                textAnchor="end"
                />
              ) : (
                <XAxis
                dataKey="type"
                tickSize={10}
                padding={{ left: 10 }}
                fontWeight={600}
                angle={-40}
                textAnchor="end"
              />
            )}
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="#0088FE"
              style={{ cursor: "pointer" }}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
