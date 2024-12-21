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
  }, [groupingKey]);

  const handleGroupingChange = (e) => {
    const key = e.target.value;
    setGroupingKey(key);
  };

  return { groupedData, handleGroupingChange };
}
