import React, { useEffect, useState, useRef } from 'react';
import './CustomSelect.css';

const CustomSelect = ({ value, onChange, onFocus, placeholder, options, className, name, disabled }) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const ref = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
                setSearch("");
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);

    const selected = value ? options.find(o => o.value === value) : null;

    const filtered = search
        ? options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
        : options;

    const handleClose = () => {
        setOpen(false);
        setSearch("");
    };

    return (
        <div className={`custom-select ${className || ""} ${open ? "open" : ""} ${disabled ? "disabled" : ""}`} ref={ref}>
            <div
                className="custom-select-trigger"
                tabIndex={disabled ? -1 : 0}
                onKeyDown={(e) => { if (!disabled && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); setOpen(true); } }}
                onClick={() => {
                    if (disabled) return;
                    if (onFocus) onFocus();
                    setOpen(true);
                }}
            >
                {open ? (
                    <input
                        ref={inputRef}
                        className="custom-select-input"
                        type="text"
                        placeholder={selected ? selected.label : placeholder}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                    />
                ) : (
                    <span className={value ? "custom-select-value" : "custom-select-placeholder"}>
                        {selected ? selected.label : placeholder}
                    </span>
                )}
                <svg className={`custom-select-chevron ${open ? "open" : ""}`} width="14" height="8" viewBox="0 0 14 8" fill="none">
                    <path d="M1 1.5L7 6.5L13 1.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            {open && (
                <div className="custom-select-menu">
                    <div className="custom-select-options">
                        {filtered.map(opt => (
                            <div
                                key={opt.value}
                                className={`custom-select-item ${opt.value === value ? "selected" : ""}`}
                                onClick={() => {
                                    onChange({ target: { name, value: opt.value } });
                                    handleClose();
                                }}
                            >
                                {opt.label}
                            </div>
                        ))}
                        {filtered.length === 0 && (
                            <div className="custom-select-no-results">Sin resultados</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
