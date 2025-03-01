export const getLabelValue = (arr, label = 'name', value = '_id') => {
    return arr.map(e => ({ label: e[label].toCapitalize(), value: e[value] }));
}

export const getLabelValueFullName = (arr, label = 'name', lastname = 'lastname', value = '_id') => {
    return arr.map(e => ({ label: e[label].toCapitalize() + ' ' + e[lastname].toCapitalize(), value: e[value] }));
}

export const formatMoney = (price) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(price)
}