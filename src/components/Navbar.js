import { useState } from "react";
function Navbar({ addCity }) {
  const [val, setVal] = useState("");
  const handleSubmitt = (e) => {
    e.preventDefault();
    addCity(val);
    setVal("");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg app">
        <div className="container-fluid  ">
          <div className="w-100" id="navbarSupportedContent">
            <form
              className="d-flex justify-content-center search-form  w-75"
              role="search"
              onSubmit={handleSubmitt}
            >
              <button
                className="rounded-start-5 p-2 border-end-0 border border-dark"
                type="submit"
              >
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
              <input
                className="rounded-end-5 p-2 border border-dark border-start-0 w-75"
                type="search"
                placeholder="Search for your preffered Location..."
                aria-label="Search"
                onChange={(e) => {
                  setVal(e.target.value);
                }}
                value={val}
              />
            </form>
          </div>
          <i className="mb-2 fa-solid fa-sun main"></i>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
