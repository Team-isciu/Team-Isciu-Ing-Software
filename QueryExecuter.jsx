import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import * as queries from './allQuerys';

export const useDynamicQuery = (categoryFrom, att, value, categoryTo) => {
  const [executeQuery, { data, loading, error }] = useLazyQuery(queries.QUERY_GET_ARTICOLO);

  useEffect(() => {
    console.log("Executing query with parameters:", categoryFrom, att, value, categoryTo);
    

    if (queryToExecute) {
      console.log("Executing GraphQL query:", queryToExecute, "with variables:", { categoryFrom, att, value, categoryTo });
      executeQuery({ variables: { categoryFrom, att, value, categoryTo } });
    }
  }, [categoryFrom, att, value, categoryTo, executeQuery]);

  useEffect(() => {
    console.log("Data:", data);
    console.log("Loading:", loading);
    console.log("Error:", error);
  }, [data, loading, error]);

  return { data, loading, error };
};

