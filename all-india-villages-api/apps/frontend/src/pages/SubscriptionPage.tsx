import PlanCard from "../components/PlanCard";

function SubscriptionPage() {

  const currentPlan: string = "FREE";

  return (

    <div>

      <div className="mb-10">

        <h1 className="text-4xl font-bold mb-2">

          Subscription Plans

        </h1>

        <p className="text-gray-500">

          Upgrade your API access

        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <PlanCard
          name="FREE"
          price="$0"
          quota="1,000 requests / month"
          current={currentPlan === "FREE"}
          features={[
            "Basic API access",
            "Community support",
            "Village search",
          ]}
        />

        <PlanCard
          name="PRO"
          price="$29"
          quota="100,000 requests / month"
          current={currentPlan === "PRO"}
          features={[
            "Priority API access",
            "Analytics dashboard",
            "Faster rate limits",
            "Email support",
          ]}
        />

        <PlanCard
          name="ENTERPRISE"
          price="Custom"
          quota="Unlimited requests"
          current={currentPlan === "ENTERPRISE"}
          features={[
            "Unlimited access",
            "Dedicated support",
            "Custom integrations",
            "SLA guarantee",
          ]}
        />

      </div>

    </div>
  );
}

export default SubscriptionPage;