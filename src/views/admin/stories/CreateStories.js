import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { LoaderContext } from "context/LoaderContext";
import Alert from "core/Alert";
import moment from "moment";
import Select from "react-select";

export default function EditStories() {
  const [data, setData] = useState({
    category_id: "",
    name: "",
    story: "",
  });

  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    setLoading(true);
    axios
      .get(`/category`)
      .then((response) => {
        const res = response.data.data;
        const data = [];
        res.forEach((element) => {
          data.push({ value: element.id, label: element.name });
        });
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const [status, setStatus] = React.useState({});

  const { loading, setLoading } = React.useContext(LoaderContext);

  const history = useHistory();

  const updateSupplier = (e) => {
    e.preventDefault();
    if (data?.name == "") {
      setStatus({
        type: "DANGER",
        message: `Story Name cann't be Empty!!!`,
      });
    } else if (data?.story == "") {
      setStatus({
        type: "DANGER",
        message: `Story cann't be Empty!!!`,
      });
    } else if (data?.category_id == "") {
      setStatus({
        type: "DANGER",
        message: ` Please Select a Category!!!`,
      });
    } else {
      setLoading(true);
      axios
        .post(`/story`,data)
        .then((response) => {
          history.push("/stories");
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
          Update Story
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
              Story Information
            </p>
            <div className="pl-8 pr-20 pt-8 pb-8">
              <div className="grid grid-cols-12 mt-4">
                <div className="col-span-4 flex items-center">
                  <label htmlFor="mobile" className="createFromInputLabel">
                    Category
                  </label>
                </div>
                <div className="col-span-8">
                  <div className="w-full my-2">
                    <Select
                      options={categories}
                      onChange={(option) =>
                        setData({ ...data, category_id: option.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-12 mt-4">
                <div className="col-span-4 flex items-center">
                  <label htmlFor="mobile" className="createFromInputLabel">
                    Story Name
                  </label>
                </div>
                <div className="col-span-8">
                  <input
                    type="text"
                    className="createFromInputField"
                    value={data?.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 mt-4">
                <div className="col-span-4 flex items-center">
                  <label htmlFor="mobile" className="createFromInputLabel">
                    Story
                  </label>
                </div>
                <div className="col-span-8">
                  <textarea
                    type="text"
                    rows={12}
                    className="createFromInputField"
                    value={data?.story}
                    onChange={(e) =>
                      setData({ ...data, story: e.target.value })
                    }
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
              Create Story
            </button>
          </>
        )}
      </div>
    </div>
  );
}
