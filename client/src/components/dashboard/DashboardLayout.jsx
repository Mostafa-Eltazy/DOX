import { useState } from "react";
import { useQuery } from "react-query";
import useTokenPagination from "token-pagination-hooks";
import { getFiles } from "../../api/files.api";
import Pagination from "../shared/Pagination";
import UploadPanel from "./UploadPanel";
import Files from "./Files";
import Spinner from "react-bootstrap/Spinner";

const DashboardLayout = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { currentToken, useUpdateToken, hasToken } =
    useTokenPagination(pageNumber);

  const { data, isLoading, isFetching, refetch } = useQuery(
    ["files", currentToken, pageNumber],
    () => getFiles(currentToken),
    {
      initialData: { files: [], nextPageToken: undefined },
      refetchInterval: 0,
      refetchOnWindowFocus: false,
    }
  );

  useUpdateToken(data?.nextPageToken);

  return (
    <>
      <div className="container">
        <div className="row mt-4 ">
          <div className="col-md-9 flow d-flex flex-column align-items-center main-column">
            {isLoading || isFetching ? (
              <>
                <span className="mb-3"> Fetching your documents ... </span>
                <Spinner
                  animation="border"
                  variant="primary"
                  className="mb-4"
                />
              </>
            ) : (
              <>
                <div className="w-100 d-flex align-items-center flex-wrap">
                  <Files fileList={data.files} />
                </div>

                {data?.files.length > 0 ? (
                  <Pagination
                    page_number={pageNumber}
                    set_page_number={setPageNumber}
                    has_token={hasToken}
                    data={data}
                  />
                ) : null}
              </>
            )}
          </div>
          <div className="col-md-3">
            <UploadPanel refetchFiles={refetch} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
