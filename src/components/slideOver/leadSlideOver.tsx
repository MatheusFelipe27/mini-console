import { leadSchema, type LeadSchema } from "@/schemas/leadSchema";
import type { Lead } from "@/types/lead";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useLeads } from "@/hooks/useLeads";


interface LeadSlideOverProps {
  open: boolean;
  onClose: () => void;
  lead: Lead | null;
}

const LeadSlideOver = ({ open, onClose, lead }: LeadSlideOverProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LeadSchema>({
    resolver: zodResolver(leadSchema),
    defaultValues: lead
    ? { email: lead.email, status: lead.status as "Converted" | "Interested" | "Deconverted" }
    : undefined,
  });

  const { updateLeadStatus } = useLeads();

  useEffect(() => {
    if (lead) {
      reset({
        email: lead.email,
        status: lead.status as "Converted" | "Interested" | "Deconverted",
      });
    }
  }, [lead, reset]);

  const onSubmit = (data: LeadSchema) => {
    updateLeadStatus.mutate(
      { id: Number(lead?.id), email: data.email, status: data.status },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            <motion.div
              className="fixed right-0 top-0 h-full rounded-tl-[24px] rounded-bl-[24px] w-[400px] bg-white shadow-xl z-50 p-8 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-lg font-semibold">Lead Details</span>
                <button
                  onClick={onClose}
                  className="rounded p-1 transform transition-transform duration-200 hover:scale-125"
                >
                  <AiOutlineClose className="w-5 h-5" />
                </button>
              </div>

              {lead ? (
                <form 
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-4 space-y-4 text-sm flex flex-col h-full"
                >
                  <div>
                    <label className="block text-[14px] font-medium text-gray-600 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={lead.name}
                      readOnly
                      className="cursor-not-allowed w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-gray-600 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-gray-600 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={lead.company}
                      readOnly
                      className="cursor-not-allowed w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-gray-600 mb-1">
                      Source
                    </label>
                    <input
                      type="text"
                      value={lead.source}
                      readOnly
                      className="cursor-not-allowed w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-gray-600 mb-1">
                      Score
                    </label>
                    <input
                      type="text"
                      value={lead.score}
                      readOnly
                      className="cursor-not-allowed w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-gray-600 mb-1">
                      Status
                    </label>
                    <select
                      {...register("status")}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2"
                    >
                      <option value="Converted">Converted</option>
                      <option value="Interested">Interested</option>
                      <option value="Deconverted">Deconverted</option>
                    </select>
                  </div>
                  <div className="flex pt-[105px] items-center justify-end gap-4">
                    <button
                      className="text-[14px] cursor-pointer px-4 py-2 border border-gray-400 rounded-[16px]
                    text-gray-700 flex items-center justify-center transform transition-transform duration-200 hover:scale-110"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="text-[14px] cursor-pointer px-4 py-2 rounded-[16px] bg-[#1876D2] 
                    text-[#F6F8FC] flex items-center justify-center transform transition-transform duration-200 hover:scale-110"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="mt-4 text-gray-500 text-sm">
                  No lead selected.
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default LeadSlideOver;
