import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IRoleBasedData {
  roleBasedData: {
    count: number;
    role: string;
  }[];
}
const COLORS = ["#0088FE", '#00C49F', '#FF8042'];

export default function RoleBasedPieChart({ roleBasedData }: IRoleBasedData) {
  const data = roleBasedData;
  return (
    <Card className="rounded-xl border-primary border">
      <CardHeader>
        <CardTitle>Role Based PieChart</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={100} dataKey="count" nameKey="role">
              {data?.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
