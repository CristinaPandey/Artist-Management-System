import { useError } from "../context/ErrorContextProvider";
import ErrorBar from "../Snackbar/ErrorBar";

const GlobalError = () => {
  const { error, clearError } = useError();

  return (
    <ErrorBar
      snackbarOpen={!!error}
      setSnackbarOpen={clearError}
      message={error || "You don't have permission"}
    />
  );
};

export default GlobalError;
