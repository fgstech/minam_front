export const generateMeet = (name, email) => {
    return `https://meet.jit.si/tr-meet-${Math.random().toString(36).slice(-8)}#userInfo.displayName="${name}"&userInfo.email="${email}"&config.prejoinPageEnabled=false&config.requireDisplayName=false`;
}