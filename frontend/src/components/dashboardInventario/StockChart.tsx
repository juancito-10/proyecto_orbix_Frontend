import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import "./StockChart.css";

export interface StockChartData {
  name: string;
  valor: number;
}

export interface StockChartProps {
  data: StockChartData[];
  isLoading?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label}`}</p>
        <p className="intro">{`Valor : $ ${payload[0].value.toLocaleString('es-AR')}`}</p>
      </div>
    );
  }
  return null;
};

const StockChart = ({ data, isLoading = false }: StockChartProps) => {
  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>Valor de stock por categoría</h3>
        <p>En pesos argentinos</p>
      </div>
      <div className="chart-wrapper">
        {isLoading ? (
          <div className="skeleton skeleton-chart"></div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis 
                type="number" 
                tickFormatter={(value) => `$${value / 1000}k`}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 13 }}
                width={90}
              />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(0,0,0,0.05)'}} />
              <Bar 
                dataKey="valor" 
                fill="#10b981" 
                radius={[0, 4, 4, 0]} 
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default StockChart;
