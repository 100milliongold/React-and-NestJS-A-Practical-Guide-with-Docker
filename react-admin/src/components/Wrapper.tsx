import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "./Menu";
import Nav from "./Nav";
import { Navigate } from "react-router";

export default function Wrapper(props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("user");
      } catch (error) {
        setRedirect(true);
      }
    })();
  }, []);

  if (redirect) return <Navigate to={"/login"} />;

  return (
    <>
      <Nav />
      <div className="container-fluid">
        <div className="row">
          <Menu />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {props.children}
          </main>
        </div>
      </div>
    </>
  );
}
