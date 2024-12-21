import React from "react";
import { useAtomValue } from "jotai";
import { useGroupedData } from "../../hooks/use-grouped-data"; // Import the new hook
import { headerKeysAtom, groupingKeyAtom } from "../../state";

export default function GroupBy() {
  const { handleGroupingChange } = useGroupedData();
  const groupingKey = useAtomValue(groupingKeyAtom);
  const headers = useAtomValue(headerKeysAtom);

  return (
    <>
      {headers.length > 0 && (
        <div>
          <h3>Select a Key to Group By</h3>
          <div>
            <label>
              <input
                type="radio"
                name="groupKey"
                value="none"
                checked={groupingKey === "none"}
                onChange={handleGroupingChange}
              />
              None (Show Original Data)
            </label>
          </div>
          {headers.map((header) => (
            <div key={header}>
              <label>
                <input
                  type="radio"
                  name="groupingKey"
                  value={header}
                  checked={groupingKey === header}
                  onChange={handleGroupingChange}
                />
                {header}
              </label>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
