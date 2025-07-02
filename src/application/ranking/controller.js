import WalletAPI from "../../api/wallet";
import Applications from "../Applications";

class RankingController {
    async getHistorial(userId) {
        return WalletAPI.getHistorial(userId);
    }

    async load(userId) {
        try {
            const { data } = await this.getHistorial(userId);
            const ranking = data;
            Applications.updateState(() => ({ ranking }));
            return ranking;
        } catch (err) {
            return new Error(err)
        }
    }
}


export default new RankingController();