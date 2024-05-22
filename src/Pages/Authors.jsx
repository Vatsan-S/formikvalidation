import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";

const Authors = ({ authorDetails, setAuthorDetails }) => {
  // handling edit
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(!edit);
  };

  // openingID is to receive data while opening a modal
  const [openingID, setOpeningID] = useState([
    {
      name: "",
      birth_year: "",
      bio: "",
    },
  ]);

  // handle click while clicking on a list data
  const handleClick = (id) => {
    setOpeningID();
    setOpeningID(
      authorDetails.filter((ele) => {
        return ele.id === id;
      })
    );
  };
  useEffect(() => {}, [openingID]);

  // edit data
  const editData = (values) => {
    setOpeningID([values]);
    // console.log(values.id)
    let e = authorDetails.filter((ele) => {
      return ele.id == values.id;
    });

    e[0].name = values.name;
    e[0].birth_year = values.birth_year;
    e[0].bio = values.bio;
  };
  const formik = useFormik({
    initialValues: {
      id: openingID[0].id,
      name: openingID[0].name,
      birth_year: openingID[0].birth_year,
      bio: openingID[0].bio,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      birth_year: Yup.string().required("Required"),
      bio: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      // setOpeningID([values])
      editData(values);
    },
    enableReinitialize: true,
  });

  // handling delete
  const handleDelete = (id) => {
    setAuthorDetails(
      authorDetails.filter((ele) => {
        return ele.id !== id;
      })
    );
  };

  return (
    <div className="container containerCard col-12">
      <table className="table thead-dark table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">BirthYear</th>
            <th scope="col" className="resp">
              Bio
            </th>
          </tr>
        </thead>
        <tbody>
          {authorDetails.map((ele, index) => {
            return (
              <tr
                key={ele.id}
                onClick={() => {
                  handleClick(ele.id);
                }}
                className="userRow"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <td scope="row">{ele.id}</td>
                <td>{ele.name}</td>
                <td>{ele.birth_year}</td>
                <td className="resp">{ele.bio}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* modal begins here  */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Author Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* modal Body  starts */}
              <div className={edit ? "viewField display" : "viewField"}>
                <div className="imageContainer"></div>
                <h3>{openingID[0].name}</h3>
                <p>{openingID[0].birth_year}</p>
                <p>{openingID[0].bio}</p>

                <div className="functionality">
                  <button className="editButton" onClick={handleEdit}>
                    Edit
                  </button>
                  <button
                    className="deleteButton"
                    onClick={() => {
                      handleDelete(openingID[0].id);
                    }}
                    data-bs-dismiss="modal"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className={edit ? "editField " : "editField display"}>
                <i
                  className="fa fa-arrow-left"
                  aria-hidden="true"
                  onClick={handleEdit}
                />
                <form onSubmit={formik.handleSubmit}>
                  <label htmlFor="name">name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div>{formik.errors.name}</div>
                  ) : null}

                  <label htmlFor="birth_year">birth_year</label>
                  <input
                    id="birth_year"
                    name="birth_year"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.birth_year}
                  />
                  {formik.touched.birth_year && formik.errors.birth_year ? (
                    <div>{formik.errors.birth_year}</div>
                  ) : null}

                  <label htmlFor="bio">Bio</label>
                  <textarea
                  rows={8}
                   
                    name="bio"
                    id="bio"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.bio}
                  />

                  {formik.touched.bio && formik.errors.bio ? (
                    <div>{formik.errors.bio}</div>
                  ) : null}

                  <button
                  className=" btn btn-dark save"
                    type="submit"
                    onClick={() => {
                      formik.handleSubmit();
                    }}
                  >
                    Save
                  </button>
                </form>
              </div>
              {/* modal body ends here  */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => {
                  setTimeout(() => setEdit(false), 500);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* modal ends here  */}
    </div>
  );
};

export default Authors;
