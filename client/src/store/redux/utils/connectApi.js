import { connectApiSliceActions } from "../connect-api-slice";

export const fetchAll = () => {
  return async (dispatch) => {
        dispatch(connectApiSliceActions.fetchDataLoading(true));
        dispatch(connectApiSliceActions.fetchDataFail(false));

      try {
        const res = await fetch("/database/posts.json");
        if (!res.ok) {
          throw new Error(`HTTP error! Status Code: ${res.status}`);
        }

        const data = await res.json();
        dispatch(connectApiSliceActions.fetchDataSuccess(data));
        dispatch(connectApiSliceActions.fetchDataLoading(false));
        return data;
      } catch (err) {
        dispatch(connectApiSliceActions.fetchDataFail(err.message));
        dispatch(connectApiSliceActions.fetchDataLoading(false));
      }
    };
};
