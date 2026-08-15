import { ChevronLeft, ChevronRight } from 'lucide-react'

interface RoomPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const RoomPagination = ({ currentPage, totalPages, onPageChange }: RoomPaginationProps) => {
  if (totalPages <= 1) {
    return null
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Phân trang danh sách phòng">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Trang trước"
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          border-gray-200
          bg-white
          text-gray-600
          transition
          hover:border-amber-400
          hover:text-amber-600
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map(page => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          className={`
            h-10
            min-w-10
            rounded-xl
            px-3
            text-sm
            font-medium
            transition
            ${
              page === currentPage
                ? 'bg-amber-500 text-white'
                : 'border border-gray-200 bg-white text-gray-600 hover:border-amber-400 hover:text-amber-600'
            }
          `}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Trang sau"
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          border-gray-200
          bg-white
          text-gray-600
          transition
          hover:border-amber-400
          hover:text-amber-600
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  )
}

export default RoomPagination
