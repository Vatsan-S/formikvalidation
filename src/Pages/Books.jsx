import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Books = ({ bookDetails, setBookDetails }) => {
  // handling Edit function

  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(!edit);
  };
  // opening ID is to receive data while opening a modal

  const [openingID, setOpeningID] = useState([
    {
      title: "",
      author: "",
      publish_date: "",
      genres: "",
      ISBN_no: "",
    },
  ]);

  // handle click while clicking on a list data
  const handleClick = (id) => {
    setOpeningID();
    setOpeningID(
      bookDetails.filter((ele) => {
        return ele.id === id;
      })
    );
  };
  useEffect(() => {}, [openingID]);

  const editData = (values) => {
    setOpeningID([values]);
    // console.log(values.id)
    let e = bookDetails.filter((ele) => {
      return ele.id == values.id;
    });

    e[0].title = values.title;
    e[0].author = values.author;
    e[0].publish_date = values.publish_date;
    e[0].genres = values.genres;
    e[0].ISBN_no = values.ISBN_no;
  };

  // formikData
  const formik = useFormik({
    initialValues: {
      id: openingID[0].id,
      title: openingID[0].title,
      author: openingID[0].author,
      publish_date: openingID[0].publish_date,
      genres: openingID[0].genres,
      ISBN_no: openingID[0].ISBN_no,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      author: Yup.string().required("Required"),
      publish_date: Yup.number().required("Required"),
      genres: Yup.string().required("Required"),
      ISBN_no: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      // setOpeningID([values])
      editData(values);
    },
    enableReinitialize: true,
  });

  // handling delete
  const handleDelete = (id) => {
    setBookDetails(bookDetails.filter((ele) => ele.id !== id));
  };
  // formik details
  // const formik = useFormik()
  //  jsx
  return (
    <div className="container containerCard col-12">
      <table className="table dark  table-striped">
        <thead className="dark">
          <tr >
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col" className="resp">
              Published
            </th>
            <th scope="col" className="resp">
              Genre
            </th>
            <th scope="col" className="resp">
              ISBN No
            </th>
          </tr>
        </thead>
        <tbody>
          {bookDetails.map((ele, index) => {
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
                <td>{ele.title}</td>
                <td>{ele.author}</td>
                <td className="resp">{ele.publish_date}</td>
                <td className="resp">{ele.genres}</td>
                <td className="resp">{ele.ISBN_no}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* table and mapping ends here  */}

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
                Book details
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
                <h3>{openingID[0].title}</h3>
                <p className="authorName">{openingID[0].author}</p>
                <div className="split">
                  <div className="split1">
                    <p className="otherInfo">
                      <b>Publish Year: </b>
                      {openingID[0].publish_date}
                    </p>
                    <p className="otherInfo">
                      <b>Genres: </b>
                      {openingID[0].genres}
                    </p>
                  </div>
                  <div className="split2">
                    <p className="otherInfo">
                      <b>ISBN_no: </b>
                      {openingID[0].ISBN_no}
                    </p>
                  </div>
                </div>

                <div className="functionality">
                  <button className="editButton" onClick={handleEdit}>
                    Edit
                  </button>
                  <button
                    className="deleteButton"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      handleDelete(openingID[0].id);
                    }}
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
                  <label htmlFor="title">Title</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <div>{formik.errors.title}</div>
                  ) : null}

                  <label htmlFor="author">Author</label>
                  <input
                    id="author"
                    name="author"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.author}
                  />
                  {formik.touched.author && formik.errors.author ? (
                    <div>{formik.errors.author}</div>
                  ) : null}

                  <label htmlFor="publish_date">Publish Date</label>
                  <input
                    id="publish_date"
                    name="publish_date"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.publish_date}
                  />
                  {formik.touched.publish_date && formik.errors.publish_date ? (
                    <div>{formik.errors.publish_date}</div>
                  ) : null}

                  <label htmlFor="genres">Genres</label>
                  <input
                    id="genres"
                    name="genres"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.genres}
                  />
                  {formik.touched.genres && formik.errors.genres ? (
                    <div>{formik.errors.genres}</div>
                  ) : null}

                  <label htmlFor="ISBN_no">ISBN_no</label>
                  <input
                    id="ISBN_no"
                    name="ISBN_no"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.ISBN_no}
                  />
                  {formik.touched.ISBN_no && formik.errors.ISBN_no ? (
                    <div>{formik.errors.ISBN_no}</div>
                  ) : null}

                  <button
                    type="submit"
                    onClick={() => {
                      formik.handleSubmit();
                    }}
                    className="save btn btn-dark"
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

export default Books;
