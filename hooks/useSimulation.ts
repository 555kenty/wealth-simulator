"use client";

import { useMemo, useState, useEffect } from "react";
import { SimulationParams, SimulationResult, simulate } from "@/lib/engine";

export function useSimulation(params: SimulationParams): SimulationResult {
  return useMemo(() => simulate(params), [params]);
}

export function useDebouncedSimulation(
  params: SimulationParams,
  delay: number = 150
): SimulationResult {
  const [debouncedParams, setDebouncedParams] = useState(params);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedParams(params);
    }, delay);

    return () => clearTimeout(timer);
  }, [params, delay]);

  return useSimulation(debouncedParams);
}
