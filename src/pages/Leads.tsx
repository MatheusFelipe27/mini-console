import LeadTable from "../components/Tables/LeadTable"
import OpportunityTable from "@/components/Tables/opportunityTable"
import { useLeads } from "@/hooks/useLeads"
import { useOpportunities } from "@/hooks/useOpportunities"
import { useState } from "react"
const Leads = () => {
  const [isCurrentViewLead, setIsCurrentViewLead] = useState<boolean>(true)
  const { leads} = useLeads();
  const {opportunities} = useOpportunities( leads ?? [])

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <span className="text-[32px] text-black font-500">Mini Seller Console</span>
        <span className="text-[#7D7280] text-[16px] font-400">Manage your leads and opportunities</span>
        <div className="flex items-center gap-10 mt-8">
          <button className={`text-[14px] pb-1 border-b-[2px] 
            ${isCurrentViewLead? 'text-[#3B82F6] border-[#3B82F6]' :
              'hover:border-[#D1D5DB] hover:text-[#5C4151] border-transparent text-[#7D7280]'}
             cursor-pointer font-[500]`}
            onClick={()=>setIsCurrentViewLead(true)}
          >
            Leads ({leads?.length})
          </button>
          <button className={`text-[14px] pb-1 b border-b-[2px]
             ${!isCurrentViewLead? 'text-[#3B82F6] border-[#3B82F6]' :
              'hover:border-[#D1D5DB] hover:text-[#5C4151] border-transparent text-[#7D7280]'}
            cursor-pointer font-[500]`}
            onClick={()=> setIsCurrentViewLead(false)}
          >
            Opportunities ({opportunities?.length})
          </button>
        </div>
        {
          isCurrentViewLead ?
          <LeadTable/>
          :
          <OpportunityTable/>
        }
      </div>
    </>
  )
}

export default Leads
