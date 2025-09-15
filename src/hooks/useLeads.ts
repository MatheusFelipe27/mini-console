import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import leadsData from "@/assets/data/leads.json";
import type { Lead } from "@/types/lead";

export const useLeads = () => {
  const queryClient = useQueryClient();

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      return new Promise<Lead[]>((resolve) => setTimeout(() => resolve(leadsData), 500));
    },
    initialData: leadsData,
    staleTime: Infinity
  });

  const updateLeadStatus = useMutation({
    mutationFn: ({ id, email, status }: { id: number; email: string; status: string }) => {
      return new Promise<Lead>((resolve) => {
        setTimeout(() => {
          const leadToUpdate = leads?.find((l) => Number(l.id) === Number(id));
          const updatedLead = { ...leadToUpdate, email, status };
          resolve(updatedLead as Lead);
        }, 300);
      });
    },
    onSuccess: (updatedLead) => {
      queryClient.setQueryData<Lead[]>(["leads"], (oldData) => {
        if (!oldData) return [updatedLead];
        return oldData.map((lead) =>
          lead.id === updatedLead.id ? updatedLead : lead
        );
      });
    },
  });

  const convertLead = useMutation({
    mutationFn: ({ id, newStatus }: { id: string; newStatus: string }) => {
      return new Promise<Lead>((resolve) => {
        const lead = leads.find((l) => l.id === id);
        resolve({ ...lead, status: newStatus } as Lead);
      });
    },
    onSuccess: (updatedLead) => {
      queryClient.setQueryData<Lead[]>(["leads"], (old) =>
        old?.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
      );
    },
  });

  return { leads, isLoading, updateLeadStatus, convertLead };
};
