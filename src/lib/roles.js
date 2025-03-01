const admin = 'admin';
const provider = 'employee';
const manager = 'manager';
const recepcinist = 'receptionist';

export const PROVIDERS_GROUPS = [provider];
export const PROVIDERS_ADMINS_GROUPS = [admin, provider, recepcinist, manager];
export const ADMIN_GROUPS = [admin, recepcinist];
export const RECEPCIONIST_GROUPS = [recepcinist];

export const listOfRoles = [
    { label: "Trabajador", value: provider },
    { label: "Administrador", value: admin },
    { label: "Recepcionista", value: recepcinist },
    { label: "Gerencia", value: manager },
]

export const getNameOfRole = (value) => {
    let result = listOfRoles.find(e => e.value === value)
    return result != null ? result.label : null
};