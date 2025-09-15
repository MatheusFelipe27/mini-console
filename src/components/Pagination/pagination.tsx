import { LuChevronFirst, LuChevronLast, LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface PaginationProps {
  setCurrentPage: (page: number) => void;
  currentPage: number
  totalPages: number
}

const Pagination = ({setCurrentPage, currentPage, totalPages}: PaginationProps ) => {
  
  return (
    <>
       <div className="flex items-center h-10 gap-6 justify-end mr-8">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 cursor-pointer"
              }`}
            >
              <LuChevronFirst size={18} />
            </button>
            <button
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-500 cursor-pointer"
              }`}
            >
              <LuChevronLeft size={18} />
            </button>
            <span className="text-gray-400 text-[14px] font-[500] font-heading">
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-500 cursor-pointer"
              }`}
            >
              <LuChevronRight size={18} />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-500 cursor-pointer"
              }`}
            >
              <LuChevronLast size={18} />
            </button>
          </div>
    </>      
  )
}

export default Pagination
