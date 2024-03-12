import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  /**1) FILTERING */
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };
  // : { field: "totalPrice", value: 5000, method: "gte" };

  /**2) SORTING */
  const sortByCurr = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByCurr.split("-");
  const sortBy = { field, direction };

  /**3) PAGINATIONS */
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  /**4) QUERY */
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  /**5) PRE-FETCHING */
  const pageCount = Math.ceil(count / import.meta.env.VITE_PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }
  return { isLoading, bookings, error, count };
}
