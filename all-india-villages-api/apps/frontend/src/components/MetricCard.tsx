interface MetricCardProps {

  title: string;

  value: string | number;

  change?: string;

  icon?: string;
}

function MetricCard({
  title,
  value,
  change,
  icon,
}: MetricCardProps) {

  return (

    <div className="bg-white rounded-2xl p-6 shadow-sm border">

      <div className="flex items-center justify-between mb-4">

        <span className="text-gray-500 text-sm">

          {title}

        </span>

        <span className="text-2xl">

          {icon}

        </span>

      </div>

      <h3 className="text-3xl font-bold mb-2">

        {value}

      </h3>

      {change && (

        <p className="text-green-600 text-sm">

          {change}

        </p>
      )}

    </div>
  );
}

export default MetricCard;