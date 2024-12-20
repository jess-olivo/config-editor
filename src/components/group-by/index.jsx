import React from "react";
import { useAtom } from "jotai";
// import { dataAtom, groupKeyAtom, dataSourceAtom } from "../../state";
import { useGroupedData } from "../../hooks/use-grouped-data"; // Import the new hook
import { groupKeyAtom } from "../../state";

export default function GroupBy({ onGroupChange }) {
  const data = useGroupedData();
  const groupKey = useAtom(groupKeyAtom);
  return (
    <div>
      <h3>Group By:</h3>
      <select value={groupKey} onChange={onGroupChange}>
        {Object.keys(data[0] || {}).map((header) => (
          <option key={header} value={header}>
            {header}
          </option>
        ))}
      </select>
    </div>
  );
}
