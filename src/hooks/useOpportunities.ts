import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Opportunity } from "@/types/opportunity";
import type { Lead } from "@/types/lead";


export const useOpportunities = (leads: Lead[]) => {
  const queryClient = useQueryClient();

  const { data: opportunities = [], isLoading } = useQuery<Opportunity[]>({
    queryKey: ["opportunities", leads],
    queryFn: () =>
      leads
      .filter((lead) => lead.status === "Converted")
      .map((lead) => ({
        id: lead.id,
        name: lead.name,
        stage: "Prospecting",
        amount: lead.score*2,
        accountName: lead.company,
      })),
    enabled: leads.length > 0, 
  });

  const createOpportunity = useMutation({
    mutationFn: (newOpportunity: Opportunity) => {
      return new Promise<Opportunity>((resolve) => {
        setTimeout(() => resolve(newOpportunity), 300);
      });
    },
    onSuccess: (newOpportunity) => {
      queryClient.setQueryData<Opportunity[]>(["opportunities"], (old) => [
        ...(old ?? []),
        newOpportunity,
      ]);
    },
  });

  return { opportunities, isLoading, createOpportunity };
};
