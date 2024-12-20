import { atom } from "jotai";

// Atom for storing the data (either JSON or CSV)
export const dataAtom = atom([]);

// Atom for tracking the source type (CSV or JSON)
export const dataSourceAtom = atom(null);

// // Atom for holding the parsed CSV or JSON data when switching formats
// export const pendingDataAtom = atom(null);

// // Atom for managing the modal visibility
// export const showModalAtom = atom(false);
