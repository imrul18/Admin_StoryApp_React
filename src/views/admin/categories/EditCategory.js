import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { LoaderContext } from "context/LoaderContext";
import Alert from "core/Alert";
import moment from "moment";

export default function EditCategory() {
  const [data, setData] = useState();

  const [status, setStatus] = React.useState({});

  const { loading, setLoading } = React.useContext(LoaderContext);

  const history = useHistory();
  const { id } = useParams();

  const fetchSeller = () => {
    setLoading(true);
    axios
      .get(`/category/${id}`)
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSeller();
  }, []);

  const updateSupplier = (e) => {
    e.preventDefault();
    if (data?.name == "") {
      setStatus({
        type: "DANGER",
        message: `Category Name cann't be Empty!!!`,
      });
    } else {
      setLoading(true);
      axios
        .put(`/category/${id}?name=${data?.name}`)

        .then((response) => {
          history.push("/categories");
        })
        .catch((error) => {
          setStatus({
            message: "Something Went Wrong",
            type: "DANGER",
          });
        });
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="px-8 mt-8 mb-4 flex justify-between">
        <p className="font-Poppins font-medium text-base text-pageHeading">
          Update Category
        </p>
      </div>
      <Alert
        status={status?.type}
        type={status?.type}
        changeStatus={() => setStatus()}
        message={status?.message}
        width="w-1/2"
        margin="ml-8"
      />
      <div className="grid grid-cols-12 px-8 gap-8">
        <div className="col-span-8">
          <div className="bg-white w-full shadow-md rounded-md">
            <p className="py-4 border-b pl-8 font-Poppins font-medium text-base text-pageHeading">
              Category Information
            </p>
            <div className="pl-8 pr-20 pt-8 pb-8">
              <div className="grid grid-cols-12">
                <div className="col-span-4 flex items-center">
                  <label htmlFor="name" className="createFromInputLabel">
                    Name
                  </label>
                </div>
                <div className="col-span-8">
                  <input
                    type="text"
                    id="name"
                    className="createFromInputField"
                    value={data?.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 mt-4">
                <div className="col-span-4 flex items-center">
                  <label htmlFor="mobile" className="createFromInputLabel">
                    Created At
                  </label>
                </div>
                <div className="col-span-8">
                  <input
                    type="text"
                    className="createFromInputField"
                    value={moment(data?.created_at).format("D MMM YYYY")}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-8 mt-8 flex justify-end">
        {loading ? (
          <>
            <button className="button button-primary w-32" disabled>
              {" "}
              <span className="fas fa-sync-alt animate-spin"></span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={updateSupplier}
              className="button button-primary w-32"
            >
              Update Categories
            </button>
          </>
        )}
      </div>
    </div>
  );
}
