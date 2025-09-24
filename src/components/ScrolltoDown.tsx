/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const ScrolltoDown = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const loader = useRef(null);
  useEffect(() => {
    console.log("page", page);

    setLoading(true);
    axios
      .get(
        `https://dummyjson.com/users?limit=10&skip=${page}&select=firstName&select=lastName&select=age&select=email&select=id&select=image`
      )
      .then((response) => {
        const data = response?.data?.users;
        setUsers((prev): any => [...prev, ...data]);
      })
      .catch((err): any => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    console.log("loading", loading);

    const observer = new IntersectionObserver(
      (entries) => {
        console.log("inter", entries[0].isIntersecting);

        if (entries[0].isIntersecting) {
          setPage((prev): any => prev + 10);
        }
      },
      { threshold: 1 }
    );

    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [loading]);

  return (
    <>
      {users.map((user: any) => (
        <div
          key={user.id}
          style={{ border: "1px solid #ccc", margin: "5px", padding: "5px" }}
        >
          <div
            style={{
              margin: "20px auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {user.image ? <img src={user.image} /> : null}
          </div>
          <div>
            <b>{`First Name:`}</b> {`${user.firstName} ${user.lastName}`}
          </div>
          <div>
            <b>{`Age:`}</b> {`${user.age}`}
          </div>
          <div>
            <b>{`Email:`}</b> {`${user.email}`}
          </div>
        </div>
      ))}

      <div ref={loader} style={{ height: "200px" }}>
        {loading ? "Loading..." : ""}
      </div>
    </>
  );
};

export default ScrolltoDown;
