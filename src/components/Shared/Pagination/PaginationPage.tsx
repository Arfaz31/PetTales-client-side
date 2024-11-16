import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Paginationpage = ({
  handlePageChange,
  totalPages,
  currentPage,
}: {
  handlePageChange: (page: number) => void;
  totalPages: number;
  currentPage: number;
}) => {
  return (
    <div>
      {/* pagination */}
      <div className="pt-24 overflow-x-hidden ">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  if (currentPage === 1) {
                    e.preventDefault();
                  } else {
                    handlePageChange(currentPage - 1);
                  }
                }}
                className={
                  currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1} // Marks the current page as active
                  onClick={() => handlePageChange(index + 1)} // Change to clicked page
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  if (currentPage === totalPages) {
                    e.preventDefault();
                  } else {
                    handlePageChange(currentPage + 1);
                  }
                }}
                className={
                  currentPage === totalPages
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Paginationpage;
