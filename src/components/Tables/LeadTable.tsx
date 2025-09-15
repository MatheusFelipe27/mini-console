import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../UI/table";
import StatusFlag from "../UI/statusFlag";
import Pagination from "../Pagination/pagination";
import { useState } from "react";
import TableFilterSelect from "../UI/tableFilterSelect";
import { IoSearchOutline } from "react-icons/io5";
import { useLeads } from "@/hooks/useLeads";
import { useOpportunities } from "@/hooks/useOpportunities";
import LeadSlideOver from "../slideOver/leadSlideOver";
import type { Lead } from "@/types/lead";

const leadHeaders: string[] = [
  "id",
  "lead",
  "company",
  "source",
  "score",
  "status",
  "actions",
];

const LeadTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const { leads, convertLead } = useLeads();
  const { createOpportunity} = useOpportunities(leads??[])
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem("leadTableFilters");
    return savedFilters
      ? JSON.parse(savedFilters)
      : { status: "All", sortOrder: "None (—)" };
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    localStorage.setItem("leadTableFilters", JSON.stringify(newFilters));
  };

  const itemsPerPage = 6;
  const totalPages = Math.ceil((leads?.length || 0) / itemsPerPage);

  const filteredLeads =
    leads
      ?.filter((val) => {
        const matchesSearch =
          val.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          val.company.toLowerCase().includes(searchValue.toLowerCase());

        const matchesStatus =
          filters.status === "All" ||
          val.status.toLowerCase() === filters.status.toLowerCase();

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (filters.sortOrder === "Ascending A → Z") {
          return a.score - b.score;
        } else if (filters.sortOrder === "Descending Z → A") {
          return b.score - a.score;
        }
        return 0;
      }) ?? [];

  const paginatedLeads = filteredLeads?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="w-[75%] flex flex-col gap-4 h-fit rounded-[16px] mt-6 border-2">
        <div className="flex gap-2 w-[75%] items-center justify-between mt-4 ml-4">
          <div className="relative w-[80%]">
            <IoSearchOutline
              className="absolute left-4 top-1/2 bg-transparent -translate-y-1/2 pointer-events-none"
              size={18}
              color={"#F6F8FC"}
            />
            <input
              type="text"
              placeholder="Search lead by Name or Company"
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-[80%] rounded-[24px] pl-10 pr-4 py-2 
                outline-none bg-gray-500 text-[14px] text-[#F6F8FC] font-[400]
                placeholder:text-[#F6F8FC] placeholder:font-[400]"
            />
          </div>
          <TableFilterSelect
            value={filters.status}
            onChange={(val) => handleFilterChange({ ...filters, status: val })}
            options={["All", "Converted", "Interested", "Deconverted"]}
          />
          <TableFilterSelect
            value={filters.sortOrder}
            onChange={(val) => handleFilterChange({ ...filters, sortOrder: val })}
            options={["None (—)", "Ascending A → Z", "Descending Z → A"]}
          />
        </div>

        <Table className="h-[80%] shadow-sm border-b">
          <TableHeader>
            <TableRow className="hover:bg-transparent border-none">
              {leadHeaders.map((head) => (
                <TableHead
                  key={head}
                  className="px-4 py-4 text-gray-700 bg-gray-200 font-[600] text-[14px] uppercase"
                >
                  {head}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLeads?.length > 0 ? (
              paginatedLeads.map((lead, idx) => (
                <TableRow
                  onClick={() => {
                    setSelectedLead(lead);
                    setIsSlideOverOpen(true);
                  }}
                  key={idx}
                  className="cursor-pointer hover:bg-gray-200 border-t border-white/12"
                >
                  <TableCell className="px-4 text-[14px] text-[#111827] bg-transparent">
                    {lead.id}
                  </TableCell>
                  <TableCell className="px-4 max-w-[200px] bg-transparent">
                    <div className="flex flex-col bg-transparent">
                      <span className="text-[14px] truncate bg-transparent text-[#111827] max-w-full">
                        {lead.name}
                      </span>
                      <span className="font-[200] text-[14px] bg-transparent text-[#6B7280] max-w-full">
                        {lead.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="w-[180px] max-w-[180px] bg-transparent px-4 text-[14px] text-[#111827]">
                    {lead.company}
                  </TableCell>
                  <TableCell className="px-4 text-[14px] text-[#111827] bg-transparent">
                    {lead.source}
                  </TableCell>
                  <TableCell className="px-4 flex items-center bg-transparent mt-2 gap-2 justify-center">
                    <div className="w-20 h-2 bg-gray-300 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#111827] rounded-full"
                        style={{ width: `${lead.score}%` }}
                      ></div>
                    </div>
                    {lead.score}
                  </TableCell>
                  <TableCell className="px-4 bg-transparent">
                    <StatusFlag status={lead.status} />
                  </TableCell>
                  <TableCell className="px-4 bg-transparent">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const newStatus =
                          lead.status === "Converted" ? "Deconverted" : "Converted";
                        convertLead.mutate({ id: lead.id, newStatus });
                        if (newStatus === "Converted") {
                          createOpportunity.mutate({
                            id: lead.id,
                            name: lead.name,
                            stage: "Prospecting",
                            amount: lead.score * 2,
                            accountName: lead.company,
                          });
                        }
                      }}
                      className={`font-[600] text-[14px] ${
                        lead.status === "Converted" ? "text-[#EF4444]" : "text-[#3B82F6]"
                      } cursor-pointer z-10`}
                    >
                      {lead.status === "Converted" ? "Revert" : "Convert Lead"}
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={leadHeaders.length}
                  className="text-center py-6 text-[#6B7280] text-[14px]"
                >
                  No leads
                  <br />
                  {searchValue 
                    ? "Try adjusting your search or filters." 
                    : "Add new leads to see them listed here."
                  }
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
      <LeadSlideOver
        lead={selectedLead}
        open={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
      />
    </>
  );
};

export default LeadTable;
