import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ShortcutState {
  name: string;
  windows: string[];
  mac: string[];
}

const initialState: ShortcutState[] = [
  {
    name: "copy",
    windows: ["Control", "c"],
    mac: ["Meta", "c"]
  },
  {
    name: "paste",
    windows: ["Control", "v"],
    mac: ["Meta", "v"]
  },
  {
    name: "save",
    windows: ["Control", "s"],
    mac: ["Meta", "s"]
  }
];

export const shortcut = createSlice({
  name: 'shortcut',
  initialState,
  reducers: {
    setShortcut: (state, action: PayloadAction<ShortcutState[]>) => {      
      state = action.payload;
      return state
    },
  },
});

export const { setShortcut } = shortcut.actions;
export default shortcut.reducer;
