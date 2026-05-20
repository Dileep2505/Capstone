interface Props {

  title: string;

  value: number | string;
}

function StatsCard({
  title,
  value,
}: Props) {

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <h3 className="text-gray-500 text-sm">

        {title}

      </h3>

      <p className="text-3xl font-bold mt-2">

        {value}

      </p>

    </div>
  );
}

export default StatsCard;