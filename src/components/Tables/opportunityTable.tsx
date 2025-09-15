import { useState } from 'react'
import Pagination from '../Pagination/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../UI/table";
import { useOpportunities } from '@/hooks/useOpportunities';
import { useLeads } from '@/hooks/useLeads';

const OpportunitiesHeaders: string[] = [
  "id",
  "name",
  "stage",
  "amount",
  "accountName",
];



const OpportunityTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {leads} = useLeads()
  const {opportunities} = useOpportunities(leads ?? [])
  
  const itemsPerPage = 6;
  const totalPages = Math.ceil((opportunities?.length || 0) / itemsPerPage);

   const paginatedOpp = opportunities?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
       <div className="w-[70%] flex flex-col gap-4 h-fit rounded-[16px] mt-6 border-2">
        <Table className="h-[80%] shadow-sm border-b">
          <TableHeader>
            <TableRow className="hover:bg-transparent border-none">
              {OpportunitiesHeaders?.map((head) => (
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
            {paginatedOpp?.length > 0 ? (
              paginatedOpp.map((op, idx) => (
                <TableRow
                  key={idx}
                  className="cursor-pointer hover:bg-gray-200 border-t border-white/12"
                >
                  <TableCell className="px-4 w-[120px] max-w-[120px] text-[14px] text-[#111827] bg-transparent">
                    {op.id}
                  </TableCell>
                  <TableCell className="w-[120px] max-w-[120px] bg-transparent px-4 text-[14px] text-[#111827]">
                    {op.name}
                  </TableCell>
                  <TableCell className="w-[120px] max-w-[120px] bg-transparent px-4 text-[14px] text-[#111827]">
                    {op.stage}
                  </TableCell>
                  <TableCell className="px-4 text-[14px] w-[120px] max-w-[120px] text-[#111827] bg-transparent">
                    {op.amount ?? "-"}
                  </TableCell>
                  <TableCell className="w-[120px] max-w-[120px] bg-transparent px-4 text-[14px] text-[#111827]">
                    {op.accountName}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={OpportunitiesHeaders.length}
                  className="text-center py-6 text-[#6B7280] text-[14px]"
                >
                  No opportunities
                  <br/>
                  Convert some leads to see opportunities here.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {
          paginatedOpp?.length > 0 &&
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        }
      </div>
    </>      
  )
}

export default OpportunityTable
