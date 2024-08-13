import Cookies from "js-cookie";
import { validateToken } from "../api/auth";

export const checkIfUserAuthAndNavigate = async () => {
  if (Cookies.get("Authorization")) {
    const response = await validateToken("cart");
    console.log("response for checking user auth token", response);
    if (response.status.code === 200) {
      alert("User authorized");
      return true;
    } else {
      alert("User not authorized");
      alert("current location");
      alert(window.location.pathname);
      localStorage.setItem("lastLocation", window.location.pathname);
      window.location = "/login";
      return false;
    }
  } else {
    alert("current location");
    alert(window.location.pathname);
    localStorage.setItem("lastLocation", window.location.pathname);
    window.location = "/login";
    return false;
  }
};
