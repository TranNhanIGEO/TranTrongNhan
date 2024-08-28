import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import StringHelper from 'helpers/stringHelper';

export const useGetQueryParams = <T>() => {
  const [searchParams] = useSearchParams();
  const hasSearchParams: boolean = searchParams.size > 0;

  const searchModel = useMemo(() => {
    const model: T = StringHelper.toObject(searchParams);
    return model;
  }, [searchParams])

  return {
    hasSearchParams,
    searchModel,
  };
};

export const usePostQueryParams = <T>(queryModel: T) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = StringHelper.toParams(queryModel);
    setSearchParams(params);
  }, [queryModel, setSearchParams]);

  return {
    searchParams,
  };
};
