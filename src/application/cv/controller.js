import UserAPI from "../../api/user";
import Applications from "../Applications";

class CVController {
    async getProfile(userId) {
        return UserAPI.getStudentProfile(userId);
    }

    async load(userId) {
        try {
            const { data } = await this.getProfile(userId);
            const profile = data;
            console.log(data);
            Applications.updateState(() => ({ profile }));
            return profile;
        } catch (err) {
            return new Error(err)
        }
    }
}


export default new CVController();