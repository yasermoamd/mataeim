import { createSlice } from "@reduxjs/toolkit";

export interface IPosts {
    title: string;
    content: boolean;
    likes: number;
}

const initialState = {
    posts: [],
    isLoading: false,
    error: null,
};

const postSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default postSlice.reducer;