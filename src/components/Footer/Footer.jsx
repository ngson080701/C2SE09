import React from "react";
import "../../styles/components/footer.css";

import { AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Footer() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8800/api/store/getById");
      setData(res.data.value);
    };
    fetchData();
  }, []);

  return (
    <div className="footer-container">
      {
      }
      <div className="last">
        <span>
           with{" "}
          <AiFillHeart /> by C2SE09
        </span>
      </div>
    </div>
  );
}
