import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { dataAtom, groupedDataAtom, groupingKeyAtom } from "../state";

export function useGroupedData() {
  const data = useAtomValue(dataAtom);
  const [groupingKey, setGroupingKey] = useAtom(groupingKeyAtom);
  const [groupedData, setGroupedData] = useAtom(groupedDataAtom);

  const groupDataByKey = (data, key) => {
    return data.reduce((grouped, item) => {
      const groupKey = item[key]; // Get the value of the selected key
      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(item);

      return grouped;
    }, {});
  };

  useEffect(() => {
    const newGroupedData =
      groupingKey && groupingKey !== "none"
        ? groupDataByKey(data, groupingKey)
        : [];

    setGroupedData(newGroupedData);
  }, [groupingKey, data, setGroupedData]);

  const handleGroupingChange = (e) => {
    const key = e.target.value;
    setGroupingKey(key);
  };

  /**
   * If key being deleted is the grouping key, reset to "none"
   */
  const resetToDefaultGroup = () => {
    setGroupingKey("none");
  };

  return {
    groupingKey,
    setGroupingKey,
    groupedData,
    handleGroupingChange,
    resetToDefaultGroup,
  };
}
