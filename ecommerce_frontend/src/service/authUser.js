import Cookies from "js-cookie";
import { validateToken } from "../api/auth";

export const checkIfUserAuthAndNavigate = async () => {
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

export const checkIfUserAuth = async () => {
	if (Cookies.get("Authorization")) {
		const res = await validateToken("cart");
		console.log("response for checking user auth token", res);
		if (res) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};
