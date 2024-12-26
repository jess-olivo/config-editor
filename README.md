# Config Editor

## Table of Contents

- [Config Editor](#config-editor)
  - [Features](#features)
  - [How to Use](#how-to-use)
    - [Option 1: Paste TSV (tab separated values)](#option-1-paste-tsv-tab-separated-values)
    - [Option 2: Upload CSV (comma separated values)](#option-2-upload-csv-comma-separated-values)
    - [Grouping by Key (header)](#grouping-by-key-header)
    - [Edit Keys](#edit-keys)
    - [Edit Rows](#edit-rows)
    - [Resulting JSON](#resulting-json)
- [Local Setup](#local-setup)
  - [React + Vite](#react--vite)
  - [Setup Steps](#setup-steps)

## Features

- Convert TSV (tab separated values) or upload CSV (comma separated values) to JSON
- Group parsed data by key (header)
- Edit keys (headers)
- Edit row values
- Delete keys deletes key/values for all rows
- Live output updates
- Easily copy JSON output

## How to Use

> NOTE: Data must include a header row

### Option 1: Paste TSV (tab separated values)

Copy data from spreadsheet
![spreadsheet data](https://raw.githubusercontent.com/jess-olivo/config-editor/main/screenshots/tsv-copy.png)

Paste it in the text area and click "Parse Data"
![tsv data pasted into textarea](https://raw.githubusercontent.com/jess-olivo/config-editor/main/screenshots/tsv-paste.png)

### Option 2: Upload CSV (comma separated values)

Click "Choose File" and select your .csv. The data will be automatically parsed when you confirm.

### Grouping by Key (header)

Select the radio input next to your desired sort option. You can leave it as "None" (default) or select one of the keys. The Resulting JSON will update to show the newly sorted data
![form to select keys by radio input](https://raw.githubusercontent.com/jess-olivo/config-editor/main/screenshots/group-by.png)

### Edit Keys

You can rename your keys by typing the new name in the input box and clicking "Confirm".
Clicking the "X" will instantly delete the key/value pair from all rows.

You can add a new key to each row by entering the name and clicking "Add key". This will add the key with a value of `null` to each row. The values can be edited in "Edit Rows".

The resulting JSON will update to show the updated data
![form to edit keys](https://raw.githubusercontent.com/jess-olivo/config-editor/main/screenshots/edit-keys.png)

> 🐞 Bug: There is an issue where if you change the grouping from "none" and then edit a key, the resulting JSON does not update. A workaround is to then change the grouping to any other option and it will update. You can then change the grouping back.

> 🐞 Bug: If you group by a key and then delete that key it is not reverting the resulting JSON back to showing the original data without any grouping.

### Edit Rows

This is all of the data. Here you can click "Edit" and change a row's value. You have the option to update the single row or all rows at once.
You can also delete the key/value pairs. **This will delete the key/value for all rows**

![form to edit row data](https://raw.githubusercontent.com/jess-olivo/config-editor/main/screenshots/edit-rows.png)

### Resulting JSON

An output of the parsed data.
Click "copy" to copy to your clipboard

---

# Local Setup

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Setup Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jess-olivo/config-editor.git
   ```
2. **Install**
   Install necessary dependencies:
   ```bash
   cd config-editor
   npm install
   ```
3. **Run**
   Start the development server:
   ```bash
    npm run dev
   ```
4. **Build**
   To create a production build:
   ```bash
   npm run build
   ```
5. **Preview**
   To preview the production build locally (after running `npm run build`):
   ```bash
   npm run preview
   ```
