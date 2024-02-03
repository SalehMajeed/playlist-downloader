import { useRoutes } from "react-router-dom";
import ROUTES from "../Constants/routes";
import HOME from "../Pages/HOME/Home";
import ShowMetaDataList from "../Pages/ShowMetadataList/ShowMetaDataList";

function AppRoutes() {
  return useRoutes([
    {
      path: ROUTES.HOME,
      element: <HOME />,
    },
    {
      path: ROUTES.SHOW_METADATA_LIST,
      element: <ShowMetaDataList />,
    },
  ]);
}

export default AppRoutes;
