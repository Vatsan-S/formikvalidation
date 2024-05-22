import React, { useState } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Books from "./Pages/Books";
import Authors from "./Pages/Authors";
import TopCards from "./Components/TopCards";
import Topnav from "./Components/Topnav";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const App = () => {
  const [bookDetails, setBookDetails] = useState([
    {
      id: 1,
      title: "5 AM club",
      publish_date: "2018",
      author: "Robin Sharma",
      genres: "Self Help",
      ISBN_no: 9876543210,
    },
    {
      id: 2,
      title: "Ikigai",
      publish_date: "2016",
      author: "Hector Garcia and Francesc Miralles",
      genres: "Self Help",
      ISBN_no: 9876543210,
    },
    {
      id: 3,
      title: " Shoe dog",
      publish_date: "2016",
      author: " Phil Knight",
      genres: "Memoir",
      ISBN_no: 9876543210,
    },
    {
      id: 4,
      title: "Talk to anyone",
      publish_date: "1999",
      author: "Liel Lowndess",
      genres: "Self Help",
      ISBN_no: 9876543210,
    },
    {
      id: 5,
      title: "Le Père Goriot",
      publish_date: "1835",
      author: "Honoré de Balzac",
      genres: "Novel",
      ISBN_no: 9876543210,
    },
    {
      id: 6,
      title: "Origin",
      publish_date: 2017,
      author: "Dan Brown",
      genres: "Novel",
      ISBN_no: 9876543210,
    },
    {
      id: 7,
      title: "Angels & Demons",
      publish_date: 2000,
      author: "Dan Brown",
      genres: "Novel",
      ISBN_no: 9876543210,
    },
    {
      id: 8,
      title: "Steve Jobs",
      publish_date: 2011,
      author: "Walter Isaacson",
      genres: "Biography",
      ISBN_no: 1 - 4516 - 4853 - 7,
    },
    {
      id: 9,
      title: "Wings of Fire",
      publish_date: 1999,
      author: "A. P. J. Abdul Kalam, Arun Tiwari",
      genres: "Biography",
      ISBN_no: 9876543210,
    },
    {
      id: 10,
      title: "Sapiens",
      publish_date: 2011,
      author: "Yuval Noah Harari",
      genres: "Non-fiction",
      ISBN_no: 9876543210,
    },
  ]);
  const [authorDetails, setAuthorDetails] = useState([
    {
      id: 1,
      name: "Yuval Noah Harari",
      birth_year: 1976,
      bio: "Yuval Noah Harari is an Israeli author, public intellectual, historian and professor in the Department of History at the Hebrew University of Jerusalem",
    },
    {
      id: 2,
      name: "Robin Sharma",
      birth_year: 1964,
      bio: "Robin Sharma is a Canadian writer born, in Port Hawkesbury, Canada. He is best known for his books Megaliving!: 30 Days to a Perfect Life, The Monk Who Sold His Ferrari, and The 5 AM Club.",
    },
    {
      id: 3,
      name: "Hector Garcia",
      birth_year: 1981,
      bio: "Hector Garcia was born in Spain in 1981 and has been living in Tokyo since 2004. During his spare time he writes aGeekinJapan.com, one of the most widely-read blogs in the world in Spanish and in English,",
    },
    {
      id: 4,
      name: "Arun Tiwari",
      birth_year: 1955,
      bio: "Arun Kumar Tiwari is an Indian missile scientist, author, and professor. He has written several books and co-authored 5 books with Dr. APJ Abdul Kalam, including Wings of Fire",
    },
    {
      id: 5,
      name: "Walter Isaacson",
      birth_year: 1952,
      bio: "Walter Seff Isaacson is an American author, journalist, and professor. He has been the president and CEO of the Aspen Institute, a nonpartisan policy studies organization based in Washington, D.C., the chair and CEO of CNN,",
    },
    {
      id: 6,
      name: "Dan Brown",
      birth_year: 1964,
      bio: "Daniel Gerhard Brown is an American author best known for his thriller novels, including the Robert Langdon novels Angels & Demons, The Da Vinci Code, The Lost Symbol",
    },
    {
      id: 7,
      name: "Phil Knight",
      birth_year: 1938,
      bio: "Philip Hampson Knight is an American billionaire business magnate who is the co-founder and chairman emeritus of Nike, Inc.",
    },
  ]);
  const totalBooks = bookDetails.length;
  const totalAuthors = authorDetails.length;
  const [createSelection, setCreateSelection] = useState(true);

  // formik validation for create
  const bookValues = {
    id: "",
    title: "",
    author: "",
    publish_date: "",
    genres: "",
    ISBN_no: "",
  };

  const authorValues = {
    id: "",
    name: "",
    birth_year: "",
    bio: "",
  };

  const bookSchema = Yup.object().shape({
    title: Yup.string().required("Title is must"),
    author: Yup.string().required("Author is must"),
    publish_date: Yup.string().required("publish date is must"),
    genres: Yup.string().required("genre is must"),
    ISBN_no: Yup.string().required("ISBN no is must"),
  });

  const authorSchema = Yup.object().shape({
    name: Yup.string().required("Author name is must"),
    birth_year: Yup.string().required("Birth year is must"),
    bio: Yup.string().required("bio is must"),
  });

  const handleBookSubmit = (values,{ resetForm }) => {
    let newBook = {
      id: bookDetails.length + 1,
      title: values.title,
      author: values.author,
      publish_date: values.genres,
      genres: values.publish_date,
      ISBN_no: values.ISBN_no,
    };

    setBookDetails([...bookDetails, newBook]);
    resetForm();
  };

  const handleauthorSubmit = (values, { resetForm }) => {
    let newAuthor = {
      id: authorDetails.length + 1,
      name: values.name,
      birth_year: values.birth_year,
      bio: values.bio,
    };
    setAuthorDetails([...authorDetails, newAuthor]);
    resetForm();
  };
  return (
    <>
      <Topnav />
      <div className="masterContainer">
        <div className="listAndData">
          <div className="dataCards">
            <TopCards totalBooks={totalBooks} totalAuthors={totalAuthors} />
          </div>
          <div className="list">
            <BrowserRouter>
              <Navbar />

              <Routes>
                <Route
                  path="/"
                  element={
                    <Books
                      bookDetails={bookDetails}
                      setBookDetails={setBookDetails}
                    />
                  }
                ></Route>
                <Route
                  path="/authors"
                  element={
                    <Authors
                      authorDetails={authorDetails}
                      setAuthorDetails={setAuthorDetails}
                    />
                  }
                ></Route>
              </Routes>
            </BrowserRouter>
          </div>
        </div>
        <button
          className="createButton btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#createModal"
        >
          Add Elements
        </button>
        {/* Modal to create books and authors starts here  */}
        <div
          className="modal fade"
          id="createModal"
          aria-labelledby="createModalLabel"
          tabIndex="-1"
        >
          <div className="modal-dialog" role="Document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="createNavi">
                  <p
                    className={createSelection ? "selectedCreation" : ""}
                    onClick={() => {
                      setCreateSelection(true);
                    }}
                  >
                    Add a Book
                  </p>
                  <p
                    className={!createSelection ? "selectedCreation" : ""}
                    onClick={() => {
                      setCreateSelection(false);
                    }}
                  >
                    Add an Author
                  </p>
                </div>
                <div className={createSelection ? "formikBook" : "display"}>
                  <Formik
                    initialValues={bookValues}
                    validationSchema={bookSchema}
                    onSubmit={handleBookSubmit}
                    resetForm
                  >
                    <Form>
                      <div className="createTitle">
                        <label>Title </label>
                        <Field type="text" name="title" />
                        <ErrorMessage name="title" component="h5" />
                      </div>
                      <div className="createAuthor">
                        <label>Author </label>
                        <Field type="text" name="author" />
                        <ErrorMessage name="author" component="h5" />
                      </div>
                      <div className="createPublish_date">
                        <label>Publish_date </label>
                        <Field type="text" name="publish_date" />
                        <ErrorMessage name="publish_date" component="h5" />
                      </div>
                      <div className="createGenre">
                        <label>Genre </label>
                        <Field type="text" name="genres" />
                        <ErrorMessage name="genres" component="h5" />
                      </div>
                      <div className="createISBN_no">
                        <label>ISBN_no </label>
                        <Field type="text" name="ISBN_no" />
                        <ErrorMessage name="ISBN_no" component="h5" />
                      </div>
                      <button type="submit" className="btn btn-dark col-3">
                        Add Book
                      </button>
                    </Form>
                  </Formik>
                </div>
                <div className={!createSelection ? "formikAuthor" : "display"}>
                  <Formik
                    initialValues={authorValues}
                    validationSchema={authorSchema}
                    onSubmit={handleauthorSubmit}
                  >
                    <Form>
                      <div className="createName">
                        <label>Name</label>
                        <Field type="text" name="name" />
                        <ErrorMessage name="name" component="h5" />
                      </div>
                      <div className="createBirth_year">
                        <label>Birth_year</label>
                        <Field type="text" name="birth_year" />
                        <ErrorMessage name="birth_year" component="h5" />
                      </div>
                      <div className="createBio">
                        <label>Bio</label>
                        <Field type="text" name="bio" />
                        <ErrorMessage name="bio" component="h5" />
                      </div>
                      <button type="submit" className="btn btn-dark col-3">
                        Add Author
                      </button>
                    </Form>
                  </Formik>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
