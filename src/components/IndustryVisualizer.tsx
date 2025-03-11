
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { 
  ChartPie, 
  Building2, 
  TrendingUp, 
  DollarSign,
  BarChart4
} from "lucide-react";

type IndustryVisualizerProps = {
  industryId: string;
};

const IndustryVisualizer = ({ industryId }: IndustryVisualizerProps) => {
  // Market share data for pie charts
  const getIndustryData = () => {
    switch (industryId) {
      case "health-insurance":
        return {
          title: "Market Share",
          data: [
            { name: "Top 6 Providers", value: 50, color: "#9b87f5" },
            { name: "Other Companies", value: 50, color: "#E5DEFF" }
          ],
          marketCap: "$400 billion",
          icon: <ChartPie className="w-6 h-6 text-roman-red" />
        };
      case "social-media":
        return {
          title: "Industry Consolidation",
          data: [
            { name: "Market Leader", value: 65, color: "#8B5CF6" },
            { name: "Other Platforms", value: 35, color: "#E5DEFF" }
          ],
          marketCap: "$1.6 trillion",
          icon: <TrendingUp className="w-6 h-6 text-roman-red" />
        };
      case "search-engines":
        return {
          title: "Market Dominance",
          data: [
            { name: "Market Leader", value: 85, color: "#D946EF" },
            { name: "Competitors", value: 15, color: "#E5DEFF" }
          ],
          marketCap: "$2.2 trillion",
          icon: <BarChart4 className="w-6 h-6 text-roman-red" />
        };
      case "ecommerce":
        return {
          title: "US eCommerce Market",
          data: [
            { name: "Market Leader", value: 40, color: "#F97316" },
            { name: "Other Retailers", value: 60, color: "#E5DEFF" }
          ],
          marketCap: "$2.1 trillion",
          icon: <DollarSign className="w-6 h-6 text-roman-red" />
        };
      case "cities":
        return {
          title: "Real Estate Value",
          data: [
            { name: "Top 5 Cities", value: 60, color: "#0EA5E9" },
            { name: "All Other Cities", value: 40, color: "#E5DEFF" }
          ],
          marketCap: "$2.8 trillion (NYC)",
          icon: <Building2 className="w-6 h-6 text-roman-red" />
        };
      case "computer-hardware":
        return {
          title: "Semiconductor Industry",
          data: [
            { name: "Market Leader", value: 70, color: "#403E43" },
            { name: "Competitors", value: 30, color: "#E5DEFF" }
          ],
          marketCap: "$2.8 trillion",
          icon: <ChartPie className="w-6 h-6 text-roman-red" />
        };
      default:
        return {
          title: "Market Share",
          data: [
            { name: "Market Leaders", value: 60, color: "#8E9196" },
            { name: "Others", value: 40, color: "#E5DEFF" }
          ],
          marketCap: "$1+ trillion",
          icon: <ChartPie className="w-6 h-6 text-roman-red" />
        };
    }
  };

  const industryData = getIndustryData();

  return (
    <div className="mt-4 mb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mb-2">
          {industryData.icon}
          <h4 className="font-semibold">{industryData.title}</h4>
        </div>
        <div className="bg-roman-red/10 text-roman-red px-3 py-1 rounded-full text-sm font-medium">
          {industryData.marketCap}
        </div>
      </div>
      
      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={industryData.data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {industryData.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Market Share']}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IndustryVisualizer;
