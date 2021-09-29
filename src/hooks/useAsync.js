import { useCallback, useEffect, useState } from "react";

export const useAsync = (asyncFunction, immediate = false) => {
    const [status, setStatus] = useState("idle")
    const [value, setValue] = useState(null)
    const [error, setError] = useState(null)
    const execute = useCallback(() => {
      setStatus("pending")
      setValue(null);
      setError(null);
      return asyncFunction()
        .then((response) => {
          setValue(response)
          setStatus("success")
        })
        .catch((error) => {
          setError(error)
          setStatus("error")
        });
    }, [asyncFunction])
    useEffect(() => {
      if (immediate) {
        execute();
      }
    }, [execute, immediate])
    return { execute, status, value, error }
  };