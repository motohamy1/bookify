"use client";

import { useAuth } from "@clerk/nextjs";
import { PLANS, PLAN_LIMITS, PlanType } from "@/lib/subscription-constants";

export const usePlan = () => {
  const { has, isLoaded, userId } = useAuth();

  if (!isLoaded || !userId) {
    return {
      plan: PLANS.FREE,
      limits: PLAN_LIMITS[PLANS.FREE],
      isLoaded,
    };
  }

  const isPro = has?.({ plan: "pro" });
  const isStandard = has?.({ plan: "standard" });

  const plan: PlanType = isPro ? PLANS.PRO : isStandard ? PLANS.STANDARD : PLANS.FREE;

  return {
    plan,
    limits: PLAN_LIMITS[plan],
    isLoaded,
  };
};
