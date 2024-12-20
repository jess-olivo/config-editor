import { useAtom } from "jotai";
import { dataAtom, groupKeyAtom } from "../state";
import { groupDataByKey } from "../utils";

export function useGroupedData() {
  const [data, setData] = useAtom(dataAtom);
  const [groupKey] = useAtom(groupKeyAtom);

  // Group data if groupKey is set, or return the original data if not
  const groupedData =
    groupKey && groupKey !== "none" ? groupDataByKey(data, groupKey) : data;

  return groupedData;
}
