import { PricingTable } from "@clerk/nextjs";

export default function SubscriptionsPage() {
  return (
    <div className="clerk-subscriptions">
      <div className="max-w-4xl w-full">
        <h1 className="page-title">Unlock Your Reading Potential</h1>
        <p className="page-description">
          Choose the plan that fits your library. From casual readers to book enthusiasts.
        </p>
        <div className="clerk-pricing-table-wrapper w-full mt-12">
          {/* Clerk's PricingTable will render our configured plans */}
          <PricingTable />
        </div>
      </div>
    </div>
  );
}
