// MatchColumn.jsx
import React, { useState, useEffect } from 'react';
import './FieldLinkers.css';

const MatchColumn = () => {
  const [columnA, setColumnA] = useState([
    { id: 1, text: 'name', matchedId: null, clicked: false },
    { id: 2, text: 'empid', matchedId: null, clicked: false },
    { id: 3, text: 'email', matchedId: null, clicked: false },
    { id: 4, text: 'address', matchedId: null, clicked: false },
    { id: 5, text: 'mobile', matchedId: null, clicked: false },
  ]);

  const [columnB, setColumnB] = useState([
    { id: 1, text: 'empid', matchedId: null, clicked: false },
    { id: 2, text: 'address', matchedId: null, clicked: false },
    { id: 3, text: 'mobile', matchedId: null, clicked: false },
    { id: 4, text: 'name', matchedId: null, clicked: false },
    { id: 5, text: 'email', matchedId: null, clicked: false },
  ]);

  const [lines, setLines] = useState([]);

  const handleItemClick = (column, itemId) => {
    const clickedItem = column.find((item) => item.id === itemId);

    if (clickedItem.matchedId !== null) {
      // Already matched, do nothing
      return;
    }

    const updatedColumn = column.map((item) =>
      item.id === itemId
        ? { ...item, matchedId: lines.length, clicked: true }
        : item
    );

    if (column === columnA) {
      setColumnA(updatedColumn);

      const matchingItemB = columnB.find((item) => item.id === itemId);

      if (matchingItemB.text === clickedItem.text) {
        const matchingLine = { idA: itemId, idB: matchingItemB.id, matchedId: lines.length, match: true };
        setLines([...lines, matchingLine]);
      } else {
        const matchingLine = { idA: itemId, idB: matchingItemB.id, matchedId: lines.length, match: false };
        setLines([...lines, matchingLine]);
      }
    } else {
      setColumnB(updatedColumn);

      const matchingItemA = columnA.find((item) => item.id === itemId);

      if (matchingItemA.text === clickedItem.text) {
        const matchingLine = { idA: matchingItemA.id, idB: itemId, matchedId: lines.length, match: true };
        setLines([...lines, matchingLine]);
      } else {
        const matchingLine = { idA: matchingItemA.id, idB: itemId, matchedId: lines.length, match: false };
        setLines([...lines, matchingLine]);
      }
    }
  };

  useEffect(() => {
    // Clear lines when all items are matched
    const allItemsMatched = columnA.every((item) => item.matchedId !== null);
    if (allItemsMatched) {
      setLines([]);
    }
  }, [columnA]);

  return (
    <div className="match-column-container">
      <div className="column" id="columnA">
        {columnA.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(columnA, item.id)}
            className={`draggable ${item.matchedId !== null ? 'matched' : 'not-matched'} ${
              item.clicked ? 'clicked' : ''
            }`}
          >
            {item.text}
          </div>
        ))}
      </div>
      <div className="column" id="columnB">
        {columnB.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(columnB, item.id)}
            className={`draggable ${item.matchedId !== null ? 'matched' : 'not-matched'} ${
              item.clicked ? 'clicked' : ''
            }`}
          >
            {item.text}
          </div>
        ))}
      </div>
      <svg className="lines">
        {lines.map((line, index) => (
          <line
            key={`${index}`}
            x1="0"
            y1="0"
            x2="0"
            y2="30"
            className={`line ${line.matchedId !== null ? (line.match ? 'matched' : 'mismatched') : ''}`}
            transform={`translate(${line.idA * 150 + 75},0)`}
          />
        ))}
      </svg>
    </div>
  );
};

export default MatchColumn;
