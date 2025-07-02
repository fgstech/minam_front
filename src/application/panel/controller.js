import WalletAPI from "../../api/wallet";
import Applications from "../Applications";

class PanelController {
    async load(userId) {
        try {
            const kpi = await WalletAPI.getKpis(userId);
            const { data } = kpi;
            const kpis = data;
            Applications.updateState(()=> ({kpis}));
            return kpis
        } catch (err) {
            return new Error(err)
        }
    }
}


export default new PanelController();