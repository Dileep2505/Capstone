interface Props {

  name: string;

  price: string;

  quota: string;

  features: string[];

  current?: boolean;
}

function PlanCard({

  name,

  price,

  quota,

  features,

  current,

}: Props) {

  return (

    <div
      className={`
        rounded-2xl
        shadow-lg
        p-8
        bg-white
        border-2
        ${
          current
            ? "border-blue-500"
            : "border-transparent"
        }
      `}
    >

      <div className="flex items-center justify-between mb-4">

        <h2 className="text-3xl font-bold">

          {name}

        </h2>

        {current && (

          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">

            Current Plan

          </span>
        )}

      </div>

      <p className="text-5xl font-bold mb-2">

        {price}

      </p>

      <p className="text-gray-500 mb-6">

        {quota}
      </p>

      <ul className="space-y-3 mb-8">

        {features.map(
          (feature, index) => (

            <li
              key={index}
              className=""
            >

              {feature}

            </li>
          )
        )}

      </ul>

      <button
        className={`
          w-full
          py-3
          rounded-lg
          font-bold
          ${
            current
              ? "bg-gray-200 text-gray-500"
              : "bg-black text-white"
          }
        `}
        disabled={current}
      >

        {current
          ? "Current Plan"
          : "Upgrade"}

      </button>

    </div>
  );
}

export default PlanCard;