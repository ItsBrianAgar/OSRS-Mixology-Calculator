import { useEffect } from "react";
import { setFavicon, setPageTitle } from "../utils/documentUtills";

const useDocumentMeta = (title, faviconUrl) => {
  useEffect(() => {
    setPageTitle(title);
    setFavicon(faviconUrl);
  }, [title, faviconUrl]);
};

export default useDocumentMeta;
