import WalletAPI from "../../api/wallet";
import Applications from "../Applications";

class WalletController {

    columns = [
        { key: 'date', label: 'Fecha' },
        { key: 'code', label: 'Concepto' },
        { key: 'provider', label: 'Plataforma' },
        { key: 'amount', label: 'Monto' },
    ];

    async getWallet(userId) {
        return await WalletAPI.getWallet(userId);
    }

    async load(userId) {
        try {
            const { data } = await this.getWallet(userId);
            const history = await this.parseDataTransactions(data.history);
            const wallet = { history, wallet: data.wallet };
            Applications.updateState(() => ({ wallet }));
            return wallet;
        } catch (err) {
            return new Error(err)
        }
    }

    async parseDataTransactions(data) {
        return data.map(e => {
            e["date"] = this.parseDateTrasaction(e.date);
            e["code"] = this.parseCodeTransaction(e.code);
            e["provider"] = this.parseProvider(e.provider);
            return e;
        })
    }

    parseDateTrasaction(data) {
        return data.split("T")[0];
    }

    parseCodeTransaction(code) {
        switch (code) {
            case "ADD":
            case "MANUAL-ASSIGNMENT": return "PUNTOS GANADOS";
            case "REDEMPTION_POINTS": return "PUNTOS DE CANJE";
            default: return code;
        }
    }

    parseProvider(provider) {
        switch (provider) {
            case "MOODLE":
            case "LEARNWORLDS": return "ACADEMIA ÑAM";
            case "MARKETPLACE": return "MERCADO ÑAM";
            default: return provider;
        }
    }
}


export default new WalletController();