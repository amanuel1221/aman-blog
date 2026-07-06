import { FiFileText, FiUsers, FiHeart, FiMessageCircle, FiEye, FiMail, FiTrendingUp } from "react-icons/fi";

const iconMap = {
  posts: {
    icon: FiFileText,
    bg: "bg-blue-50 border-blue-100/70",
    color: "text-blue-600",
  },
  users: {
    icon: FiUsers,
    bg: "bg-green-50 border-green-100/70",
    color: "text-green-600",
  },
  likes: {
    icon: FiHeart,
    bg: "bg-red-50 border-red-100/70",
    color: "text-red-600",
  },
  comments: {
    icon: FiMessageCircle,
    bg: "bg-amber-50 border-amber-100/70",
    color: "text-amber-600",
  },
  views: {
    icon: FiEye,
    bg: "bg-purple-50 border-purple-100/70",
    color: "text-purple-600",
  },
  messages: {
    icon: FiMail,
    bg: "bg-cyan-50 border-cyan-100/70",
    color: "text-cyan-600",
  },
};

const formatNumber = (value) => {
  if (value === undefined || value === null) return "0";
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toLocaleString();
};

const StatCard = ({ title, value, type }) => {
  const item = iconMap[type];

  const Icon = item?.icon || FiTrendingUp;
  const bg = item?.bg || "bg-slate-50 border-slate-100";
  const color = item?.color || "text-slate-600";

  return (
    <article
      data-testid={`stat-card-${type}`}
      className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm transition duration-200 hover:scale-[1.01] hover:border-slate-300/80 select-none flex items-center justify-between gap-4"
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {title}
          </h3>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {formatNumber(value)}
          </h2>
        </div>

        {/* Growth Curve Metrics Descriptor */}
        <div className="flex items-center gap-1.5 text-xs font-medium">
          <span className="inline-flex items-center gap-0.5 text-green-600 bg-green-50 px-1.5 py-0.5 rounded font-bold">
            <FiTrendingUp size={12} />
            +12%
          </span>
          <span className="text-slate-400">
            vs baseline epoch
          </span>
        </div>
      </div>

      {/* Decorative Icon Wrapper */}
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center border shadow-3xs shrink-0 ${bg}`}
      >
        <Icon
          className={color}
          size={22}
        />
      </div>
    </article>
  );
};

export default StatCard;