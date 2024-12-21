import { useSetAtom } from "jotai";
import { dataAtom, dataSourceAtom } from "../state";

export function useHandleJsonParse() {
  const setData = useSetAtom(dataAtom);
  const setDataSource = useSetAtom(dataSourceAtom);

  const handleJsonParse = ({ parsedData, dataSource }) => {
    setData(parsedData);
    setDataSource(dataSource);
  };

  return handleJsonParse;
}
