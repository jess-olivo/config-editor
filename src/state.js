import { atom } from "jotai";

export const dataAtom = atom([]);
export const groupedDataAtom = atom([]);

// Atom for tracking the source type (CSV or JSON)
export const dataSourceAtom = atom(null);

export const groupingKeyAtom = atom("none");

export const headerKeysAtom = atom([]);

// // Atom for holding the parsed CSV or JSON data when switching formats
// export const pendingDataAtom = atom(null);

// // Atom for managing the modal visibility
// export const showModalAtom = atom(false);
