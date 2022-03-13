import axios from "axios";
//Client side interface for interacting with the api endpoint
class meetTelHaiService {
	allMatches = () => axios.get("/api/interact/matches");
	like = (like, to) => axios.post("api/interact/interact", { to, like });
	available = () => axios.get("api/interact/available");
	joinMatch = (matchId) => {
		return axios.post(`/api/match/${matchId}/join`);
	};
}

export default new meetTelHaiService();
