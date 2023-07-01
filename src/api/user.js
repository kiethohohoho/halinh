import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { fetcher, endpoints } from 'src/utils/axios';
import { encodeParams } from 'src/utils/api';

// ----------------------------------------------------------------------

export function useGetUsers({
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
    OrderBy: OrderBy || 'Role',
    AES: AES || 'true',
    PageIndex: PageIndex || 0,
    PageSize: PageSize || 10
  };

  // Generate the URL with encoded parameters
  const URL = `${endpoints.user.list}?${encodeParams(params)}`;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      users: data?.data?.data || [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !isLoading && !data?.length,
      usersMutate: mutate,
    }),
    [data?.data?.data, data?.length, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
