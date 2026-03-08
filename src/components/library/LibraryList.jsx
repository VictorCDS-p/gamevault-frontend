import { useState } from "react";
import LibraryCard from "./LibraryCard";
import Pagination from "../ui/Pagination";

export default function LibraryList({ library, onStatusChange, onRemove }) {
  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);

  if (!library || library.length === 0) {
    return (
      <p className="text-center text-slate-500 dark:text-slate-400 mt-8">
        Sua biblioteca está vazia.
      </p>
    );
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedLibrary = library.slice(startIndex, endIndex);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedLibrary.map((item) => (
          <LibraryCard
            key={`${item.userId}-${item.game.id}`}
            item={item}
            onStatusChange={onStatusChange}
            onRemove={onRemove}
          />
        ))}
      </div>

      {library.length > ITEMS_PER_PAGE && (
        <div className="mt-8">
          <Pagination
            totalItems={library.length}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}