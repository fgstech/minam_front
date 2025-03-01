import React, { useState, useEffect, useRef } from 'react';
import generateTimeOptions from './utils'; 
import './DayScheduleSelector.css'; 
import Select from '../InputSelect';
import Input from '../input';

const DayScheduleSelector = ({
  label,
  initialEnable = false,
  initialStart = null,
  initialEnd = null,
  interval = 60,
  openingHour = '08:00',
  closingHour = '18:00',
  onChange,
}) => {
  const [enabled, setEnabled] = useState(initialEnable);
  const [start, setStart] = useState(initialStart);
  const [end, setEnd] = useState(initialEnd);
  const [startOptions, setStartOptions] = useState([]);
  const [endOptions, setEndOptions] = useState([]);
  const hasMounted = useRef(false);

  useEffect(() => {
    setStartOptions(generateTimeOptions(openingHour, closingHour, interval));
  }, [openingHour, closingHour, interval]);


  useEffect(() => {
    if (start) {
      setEndOptions(generateTimeOptions(start.value, closingHour, interval));
    }
  }, [start, closingHour, interval]);


  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const initialValues = {
      enabled: initialEnable,
      start: initialStart ? initialStart.value : "00:00",
      end: initialEnd ? initialEnd.value : "00:00",
    };

    const currentValues = {
      enabled,
      start: start ? start.value : "00:00",
      end: end ? end.value : "00:00",
    };

    onChange(currentValues);
  }, [enabled, start, end, interval, initialEnable, initialStart, initialEnd, onChange]);

  return (
    <div className="day-schedule-selector">
      <div className="grid-container">
        <div className="grid-item">
          <Input type="checkbox"
            checkLabel="Activar / Desactivar" 
            label="Habilitar día"
            value={enabled}
            onChange={(e) => setEnabled(e)}
          />
        </div>
        <div className="grid-item">
          <Select
            label="Desde"
            options={startOptions}
            value={start}
            onChange={setStart}
            disabled={!enabled}
          />
        </div>
        <div className="grid-item">
          <Select
            label="Hasta"
            options={endOptions}
            value={end}
            onChange={setEnd}
            disabled={!enabled || !start}
          />
        </div>
      </div>
    </div>
  );
};

export default DayScheduleSelector;
