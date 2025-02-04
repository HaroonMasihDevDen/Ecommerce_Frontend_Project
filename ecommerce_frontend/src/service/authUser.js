import Cookies from "js-cookie";
import { validateToken } from "../api/auth";

export const checkIfUserAuthAndNavigate = async () => {
	console.log("checkIfUserAuthAndNavigate is calling");
	if (Cookies.get("Authorization")) {
		const res = await validateToken("cart");
		console.log("response for checking user auth token", res);
		if (res) {
			return true;
		} else {
			localStorage.setItem("lastLocation", window.location.pathname);
			window.location = "/login";
			return false;
		}
	} else {
		localStorage.setItem("lastLocation", window.location.pathname);
		window.location = "/login";
		return false;
	}
};
