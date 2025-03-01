// NavigationService.js
class NavigationService {
    static history = null;
    static params = {};

    static setHistory(history) {
        NavigationService.history = history;
    }

    static navigateTo(path) {
        if (NavigationService.history) {
            NavigationService.history.push(path);
        } else {
            console.error('History no está inicializado.');
        }
    }

    static navigateBack() {
        if (NavigationService.history) {
            NavigationService.history.goBack();
        } else {
            console.error('History no está inicializado.');
        }
    }

    static navigateForward() {
        if (NavigationService.history) {
            NavigationService.history.goForward();
        } else {
            console.error('History no está inicializado.');
        }
    }

    static replace(path) {
        if (NavigationService.history) {
            NavigationService.history.replace(path);
        } else {
            console.error('History no está inicializado.');
        }
    }

    // Método para setear los parámetros de la ruta desde el componente
    static setParams(params) {
        NavigationService.params = params;
    }

    // Método para obtener parámetros de la ruta previamente configurados
    static getRouteParams() {
        return NavigationService.params;
    }

    // Método para obtener query params de la URL actual
    static getQueryParams() {
        if (NavigationService.history) {
            const search = NavigationService.history.location.search;
            return new URLSearchParams(search); // Devuelve un objeto URLSearchParams para manipular query params
        } else {
            console.error('History no está inicializado.');
            return new URLSearchParams(); // Devuelve un objeto vacío si history no está disponible
        }
    }
}

export default NavigationService;