import React from 'react';
import './TabsNavbar.css'; // Importamos los estilos

export const TabsNavbar = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className="tabs-navbar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabClick(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export const TabsContent = ({ tabs, activeTab }) => {
    const activeContent = tabs.find(tab => tab.id === activeTab)?.content || null;
  
    return (
      <div className="tabs-content">
        {activeContent}
      </div>
    );
  };

  