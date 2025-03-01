class Ngex {
    constructor(initialState = {}) {
        this.state = initialState; 
        this.listeners = {};
    }

    getState() {
        return this.state;
    }

    updateState(updater) {
        if (typeof updater === 'function') {
        
            const prevState = { ...this.state };
            const updatedState = updater(this.state);

            if (typeof updatedState !== 'object' || updatedState === null) {
                console.error('El updater debe retornar un objeto de estado válido.');
                return;
            }
            this.state = { ...this.state, ...updatedState };
            Object.keys(this.state).forEach((key) => {
                if (prevState[key] !== this.state[key] && this.listeners[key]) {
                    this.listeners[key].forEach(callback => callback(this.state[key]));
                }
            });
        } else {
            console.error('Updater debe ser una función que retorna el nuevo estado');
        }
    }

    on(propertyName, callback) {
        if (!this.listeners[propertyName]) {
            this.listeners[propertyName] = [];
        }
        this.listeners[propertyName].push(callback);

        return () => {
            this.listeners[propertyName] = this.listeners[propertyName].filter(cb => cb !== callback);
        };
    }
}

export default Ngex;