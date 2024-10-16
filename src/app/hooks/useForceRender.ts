import { useCallback, useState } from "react";

export const useForceRender = () => {
  const [updateState, setUpdateState] = useState({});
  const forceUpdate = useCallback(() => setUpdateState({}), []);
  return { updateState, forceUpdate };
};
