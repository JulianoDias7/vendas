import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

const data = [
  { name: 'Jan', vendas: 4000 },
  { name: 'Fev', vendas: 3000 },
  { name: 'Mar', vendas: 5000 },
  { name: 'Abr', vendas: 2780 },
  { name: 'Mai', vendas: 3890 },
  { name: 'Jun', vendas: 4300 },
  { name: 'Jun', vendas: 4300 },
  { name: 'Jun', vendas: 4300 },
  
];

export default function Home() {
  return (
    <div className="w-full flex justify-center mb-20">
      <div className="  w-11/12">
        {/* Gráfico de Área */}
        <div className="text-center" style={{ width: '100%', height: 300 }}>
          <h5>Vendas por Mês</h5>
          <ResponsiveContainer>
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 30 }}>
              <defs>
                <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#334155" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#334155" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="vendas"
                stroke="#334155"
                fillOpacity={1}
                fill="url(#colorVendas)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex m-2 text-center">
          <div className="w-1/2 h-80">
            <h5>Faturamento total</h5>
            <ResponsiveContainer>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="6 6" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="vendas" fill="#334155" fillOpacity={0.5} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="w-1/2 h-80 text-center">
            <h5>Vendas por tipo de produto</h5>
            <ResponsiveContainer>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Radar
                  name="Vendas"
                  dataKey="vendas"
                  stroke="#8884d8"
                  fill="#334155"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
