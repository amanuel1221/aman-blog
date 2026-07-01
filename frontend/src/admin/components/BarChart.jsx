import {
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BarChart = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Top Performing Posts
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Views, likes and comments for your best posts.
        </p>
      </div>

      {/* Chart */}
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ReBarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: -10,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="title"
              tick={{
                fontSize: 12,
              }}
              interval={0}
              angle={-15}
              textAnchor="end"
              height={70}
            />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="views"
              name="Views"
              radius={[6, 6, 0, 0]}
              fill="#1D4ED8"
            />

            <Bar
              dataKey="likes"
              name="Likes"
              radius={[6, 6, 0, 0]}
              fill="#3B82F6"
            />

            <Bar
              dataKey="comments"
              name="Comments"
              radius={[6, 6, 0, 0]}
              fill="#60A5FA"
            />
          </ReBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;