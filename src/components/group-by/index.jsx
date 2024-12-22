import React from "react";
import { useAtomValue } from "jotai";
import { useGroupedData } from "../../hooks/use-grouped-data"; // Import the new hook
import { headerKeysAtom, groupingKeyAtom } from "../../state";
import "./styles.css";

export default function GroupBy({ className }) {
  const { handleGroupingChange } = useGroupedData();

  const groupingKey = useAtomValue(groupingKeyAtom);

  const headerKeys = useAtomValue(headerKeysAtom);

  return (
    <div className={`${className} groupby-outer-container`}>
      {headerKeys.length > 0 ? (
        <div className="groupby-inner-container ">
          <h3 className="groupby-section-title">Select a Key to Group By</h3>
          <div className="groupby-item-container edit-keys-item-container">
            <label className="groupby-item-label">
              <input
                type="radio"
                name="groupKey"
                value="none"
                checked={groupingKey === "none"}
                onChange={handleGroupingChange}
                className="groupby-item-input groupby-default-input"
              />
              <span>None (Show Original Data)</span>
            </label>
          </div>
          {headerKeys.map((header) => (
            <div
              key={header}
              className="groupby-item-container edit-keys-item-container"
            >
              <label className="groupby-item-label">
                <input
                  type="radio"
                  name="groupingKey"
                  value={header}
                  checked={groupingKey === header}
                  onChange={handleGroupingChange}
                  className="groupby-item-input"
                />
                <span>{header}</span>
              </label>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
