export const groupDataByKey = (data, key) => {
  return data.reduce((grouped, item) => {
    const groupKey = item[key]; // Get the value of the selected key
    if (!grouped[groupKey]) {
      grouped[groupKey] = [];
    }
    grouped[groupKey].push(item);
    return grouped;
  }, {});
};
