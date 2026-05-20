interface Props {

  usage: number;

  quota: number;
}

function UsageCard({

  usage,

  quota,

}: Props) {

  const percentage =
    Math.min(
      (usage / quota) * 100,
      100
    );

  return (

    <div className="bg-white rounded-2xl shadow p-6 mb-8">

      <div className="flex items-center justify-between mb-4">

        <h2 className="text-2xl font-bold">

          Monthly Usage

        </h2>

        <span className="text-gray-500">

          {usage} / {quota}
        </span>

      </div>

      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

        <div
          className="h-full bg-blue-500"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <p className="text-sm text-gray-500 mt-3">

        {percentage.toFixed(1)}%
        of quota used
      </p>

    </div>
  );
}

export default UsageCard;