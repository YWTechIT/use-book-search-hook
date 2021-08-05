import React, { SetStateAction, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

export default function useBookSearch(query: string, pageNumber: number) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [books, setBooks] = useState<any>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel: any;
    axios({
      method: "GET",
      url: "http://openlibrary.org/search.json",
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken(function (c) {
        cancel = c;
      }),
    })
      .then((res: AxiosResponse<any>) => {
        setBooks(function (prevBooks: any) {
          return [
            ...new Set([
              ...prevBooks,
              res.data.docs.map((b: []) => console.log(b)),
            ]),
          ];
        });
      })

      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
    return () => cancel();
  }, [query, pageNumber]);
  return null;
}
