import React, { useState, useEffect } from 'react';
import "./DynamicTable.css";

const CustomSelect = ({ options, value, onChange, label, placeholder = 'Selecciona...' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(value);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange(option);
    };

    return (
        <div className="custom-select-container">
            {label && <label className="custom-select-label">{label}</label>}
            <div className={`custom-select-display ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                {selectedOption ? selectedOption.label : placeholder}
                <span className="custom-select-arrow">▼</span>
            </div>
            {isOpen && (
                <ul className="custom-select-options">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={`custom-select-option ${selectedOption && selectedOption.value === option.value ? 'selected' : ''}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const DynamicTable = ({
    headers,
    data,
    customElements = {},
    itemsPerPage = 10,
    itemsPerPageOptions = [
        { value: 5, label: '5 por página' },
        { value: 10, label: '10 por página' },
        { value: 20, label: '20 por página' },
        { value: 50, label: '50 por página' },
        { value: 100, label: '100 por página' },
    ],
    tableLabel = '',
    fullPage = false,
    toolbar = true,
    showPagination = true,
    showPerpage = true,
    showLabel = false,
    isLoading = false,
    emptyText = "No hay datos disponibles",
    loaderComponent = null
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortedData, setSortedData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [perPage, setPerPage] = useState(itemsPerPage);

    useEffect(() => {
        let filteredData = data.filter((item) => {
            return headers.some((header) => {
                const fieldValue = item[header.key] ? item[header.key].toString().toLowerCase() : '';
                return fieldValue.includes(searchTerm.toLowerCase());
            });
        });

        if (sortConfig.key) {
            filteredData.sort((a, b) => {
                const aValue = a[sortConfig.key] || '';
                const bValue = b[sortConfig.key] || '';

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        setSortedData(filteredData);
    }, [data, searchTerm, sortConfig]);

    const indexOfLastItem = currentPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedData.length / perPage);

    return (
        <div className={`dynamic-table ${fullPage ? 'full-page' : ''}`}>

            {toolbar && (
                <div className="table-controls" style={{ padding: !showPerpage && !showLabel ? "20px 0" : "20px 0px" }}>
                    {showLabel && tableLabel && <h2 className="table-label">{tableLabel}</h2>}
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    {showPerpage && (
                        <CustomSelect
                            options={itemsPerPageOptions}
                            value={itemsPerPageOptions.find(opt => opt.value === perPage)}
                            onChange={(option) => {
                                setPerPage(option.value);
                                setCurrentPage(1);
                            }}
                        />
                    )}
                </div>
            )}

            {isLoading ? (
                <div className="loading-container">
                    {loaderComponent ? loaderComponent : <p>Cargando datos...</p>}
                </div>
            ) : (
                <div className="table-container">
                    {sortedData.length === 0 ? (
                        <p className="empty-text">{emptyText}</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    {headers.map((header) => {
                                        const styles = header?.style || {};
                                        return (
                                            <th key={header.key} style={styles} onClick={() => setSortConfig({
                                                key: header.key,
                                                direction: sortConfig.key === header.key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
                                            })}>
                                                {header.label}
                                            </th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((item, index) => (
                                    <tr key={index}>
                                        {headers.map((header) => (
                                            <td key={header.key}>
                                                {customElements[header.key] ? customElements[header.key](item) : item[header.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {showPagination && sortedData.length > 0 && (
                <div className="pagination">
                    <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>«</button>
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>‹</button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>›</button>
                    <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>»</button>
                </div>
            )}
        </div>
    );
};

export default DynamicTable;