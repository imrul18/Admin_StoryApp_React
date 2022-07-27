import { Link, Switch, Route, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Moment from "react-moment";
import "moment-timezone";

import { LoaderContext } from "context/LoaderContext";

export default function Stories() {
  const [storiesData, setStoriesData] = useState(null);
  const [data, setData] = useState(null);
  const { loading, setLoading } = React.useContext(LoaderContext);
  const [search, setSearch] = useState("");

  const [reload, setReload] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/story")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((errors) => {});
    setLoading(false);
  }, [reload]);

  console.log(data);

  useEffect(() => {
    if (search.length) {
      const val = data.filter((val) =>
        val.name.toLowerCase().includes(search.toLowerCase())
      );
      setStoriesData(val);
    } else {
      setStoriesData(data);
    }
  }, [search, data]);

  return (
    <>
      <div className="px-8 mt-8 mb-8">
        <div className="page-heading">
          <h1 className="pageHeading">All Stories</h1>
          <div className="flex">
            <Link
              to="/stories/create"
              className="button button-outline-primary w-48"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-2 buttonText">Add a New Story</span>
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="border-b">
            <div className="card-header">
              <div>
                <h4 className="pageHeading">Stories</h4>
              </div>
              <input
                className="inputBox"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="card-body overflow-x-auto">
            <table className="w-350 2xl:w-full table-fixed">
              <thead>
                <tr className="border-b h-12">
                  <th className="tableHeader w-1/7">SL</th>
                  <th className="tableHeader w-2/7">Category</th>
                  <th className="tableHeader w-1/7">Name</th>
                  <th className="tableHeader w-1/7">Read</th>
                  <th className="tableHeader w-2/7">Created At</th>
                  <th className="tableHeader w-1/7">Action</th>
                </tr>
              </thead>
              <tbody>
                {storiesData?.map((item, index) => (
                  <tr className="border-b py-4 h-20" key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.category_table?.name}</td>
                    <td>{item?.name}</td>
                    <td>{item?.count}</td>
                    <td>
                      <Moment format="MMM, D YYYY">{item.created_at}</Moment>
                    </td>

                    <td>
                      <Link
                        to={`stories/${item.id}/edit`}
                        className="focus:outline-none mr-5"
                      >
                        <i className="fas fa-pen"></i>
                      </Link>
                      <button
                        onClick={() => {
                          setLoading(true);
                          axios
                            .delete(`/story/${item?.id}`)
                            .then((response) => {
                              setReload(!reload);
                              setLoading(false);
                            });
                        }}
                        className="focus:outline-none"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
