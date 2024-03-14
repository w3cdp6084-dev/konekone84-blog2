import Link from 'next/link';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage }) => {
  return (
    <div className="control">
      {currentPage > 1 && (
        <Link href={`/posts/page/${currentPage - 1}`}>
          <span className="moreBtn">前へ</span>
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => (
        <Link key={i} href={`/posts/page/${i + 1}`}>
          <span className={`moreBtn ${currentPage === i + 1 ? 'active' : ''}`}>{i + 1}</span>
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={`/posts/page/${currentPage + 1}`}>
          <span className="moreBtn">次へ</span>
        </Link>
      )}
    </div>
  );
};

export default Pagination;