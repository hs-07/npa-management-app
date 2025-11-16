import type { RowData } from "./types";

export const LS_KEY = "npa_rows";

export const saveRowsToLocalStorage = (rows: RowData[]) => {
  localStorage.setItem(LS_KEY, JSON.stringify(rows));
};

export const loadRowsFromLocalStorage = () => {
  const data = localStorage.getItem(LS_KEY);
  return data ? JSON.parse(data) : null;
};
