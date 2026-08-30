import TrackList from "../TrackList/TrackList";

import styles from "./SearchResults.module.css";

function SearchResults({
  searchResults = [],
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onAdd,
}) {
  const safeCurrentPage = Math.min(currentPage, totalPages);

  return (
    <div className={styles.resultsPanel}>
      <h2 className={styles.sectionTitle}>Results</h2>

      <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={true} />

      {totalPages > 1 && (
        <nav
          className={styles.pagination}
          aria-label="Search results pagination"
        >
          <button
            type="button"
            className={styles.pageButton}
            onClick={() => onPageChange(Math.max(1, safeCurrentPage - 1))}
            disabled={safeCurrentPage === 1}
            aria-label="Previous page"
          >
            &laquo;
          </button>

          <ol className={styles.pageList}>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <li key={page} className={styles.pageItem}>
                  <button
                    type="button"
                    className={
                      page === safeCurrentPage
                        ? `${styles.pageButton} ${styles.activePage}`
                        : styles.pageButton
                    }
                    onClick={() => onPageChange(page)}
                    aria-label={`Go to page ${page}`}
                    aria-current={page === safeCurrentPage ? "page" : undefined}
                  >
                    {page}
                  </button>
                </li>
              ),
            )}
          </ol>

          <button
            type="button"
            className={styles.pageButton}
            onClick={() =>
              onPageChange(Math.min(totalPages, safeCurrentPage + 1))
            }
            disabled={safeCurrentPage === totalPages}
            aria-label="Next page"
          >
            &raquo;
          </button>
        </nav>
      )}
    </div>
  );
}

export default SearchResults;
