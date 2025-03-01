import React from 'react';

const PermissionWrapper = ({ 
    children, 
    allowedRoles = [], 
    allowedPermissions = [], 
    userRoles = [], 
    userPermissions = [] 
  }) => {
    // Verificar si hay que hacer chequeo de roles
    const hasRequiredRole = allowedRoles.length === 0 
      ? true 
      : userRoles.some(role => allowedRoles.includes(role));
  
    // Verificar si hay que hacer chequeo de permisos
    const hasRequiredPermission = allowedPermissions.length === 0 
      ? true 
      : allowedPermissions.every(permission => userPermissions.includes(permission));
  
    // Si cumple con al menos uno de los requisitos, se muestra el contenido
    if (hasRequiredRole || hasRequiredPermission) {
      return <>{children}</>;
    }
  
    // Retornar null si no cumple con los requisitos, o se puede personalizar el mensaje
    return null; // O por ejemplo, <p>Acceso denegado</p>
  };


export default PermissionWrapper;