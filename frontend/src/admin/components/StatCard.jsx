import {
  FiFileText,
  FiUsers,
  FiHeart,
  FiMessageCircle,
  FiEye,
  FiMail,
  FiTrendingUp,
} from "react-icons/fi";

const iconMap = {
  posts: {
    icon: FiFileText,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  users: {
    icon: FiUsers,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  likes: {
    icon: FiHeart,
    bg: "bg-red-100",
    color: "text-red-600",
  },
  comments: {
    icon: FiMessageCircle,
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
  views: {
    icon: FiEye,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
  messages: {
    icon: FiMail,
    bg: "bg-cyan-100",
    color: "text-cyan-600",
  },
};

const formatNumber = (value) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toLocaleString();
};

const StatCard = ({ title, value, type }) => {
  const item = iconMap[type];

  const Icon = item?.icon || FiTrendingUp;
  const bg = item?.bg || "bg-gray-100";
  const color = item?.color || "text-gray-600";

  return (
    <div
      data-testid={`stat-card-${type}`}
      className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        border-gray-200
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div className="flex items-center justify-between">
        {/* Left */}
        <div>
          <p className="text-sm text-gray-500 font-medium">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {formatNumber(value)}
          </h2>

          <div className="flex items-center gap-2 mt-4">
            <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <FiTrendingUp />
              +12%
            </span>

            <span className="text-gray-400 text-sm">
              from last month
            </span>
          </div>
        </div>

        {/* Right */}
        <div
          className={`
            w-16
            h-16
            rounded-2xl
            flex
            items-center
            justify-center
            ${bg}
          `}
        >
          <Icon
            className={`${color}`}
            size={30}
          />
        </div>
      </div>
    </div>
  );
};

export default StatCard;