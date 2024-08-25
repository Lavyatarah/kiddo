import { useEffect, useState } from "react";
import axios from "axios";

export const useAllAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAllAssignments = async () => {
      try {
        const res = await axios.get(
          "https://2541-41-139-206-153.ngrok-free.app/assignments",
          {
            headers: {
              "ngrok-skip-browser-warning": "*",
            },
          }
        );
        setAssignments(res.data);
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchAllAssignments();
  }, []);

  return {
    assignments,
  };
};
