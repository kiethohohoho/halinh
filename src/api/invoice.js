import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { fetcher, endpoints } from 'src/utils/axios';
import { encodeParams } from 'src/utils/api';

// ----------------------------------------------------------------------

export function useGetInvoices({
  Role,
  Belong,
  OrderBy,
  AES,
  PageIndex,
  PageSize,
}) {
  const params = {
    ...Role,
    ...Belong,
    OrderBy: OrderBy || 'DateUsed',
    AES: AES || 'false',
    PageIndex: PageIndex || 0,
    PageSize: PageSize || 100
  };

  // Generate the URL with encoded parameters
  const URL = `${endpoints.invoice.list}?${encodeParams(params)}`;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      invoices: data?.data?.data || [],
      invoicesLoading: isLoading,
      invoicesError: error,
      invoicesValidating: isValidating,
      invoicesEmpty: !isLoading && !data?.length,
      invoicesMutate: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}