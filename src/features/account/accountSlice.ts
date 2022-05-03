import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import agent from "../../api/agent";
import { User } from "../../interfaces/User";

interface AccountState {
  user: null | User;
  token: string;
  loggedIn: boolean;
  error: Error | any;
}

const initialState: AccountState = {
  token: "",
  error: null,
  user: null,
  loggedIn: false,
};

export const loginUser = createAsyncThunk<string, User>(
  "account/loginUser",
  async (data, thunkAPI) => {
    try {
      const response = await agent.post("/signin", data);
      localStorage.setItem("jwt", response.data.token);
      toast.success("Successfuly Logged In");
      return response.data.token;
    } catch (error: any) {
        console.log("TESTING", error.response.data.error.message);
        
      toast.error(error.response.data.error.message);
      return thunkAPI.rejectWithValue(error.response.data.error.message);
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload;
      state.loggedIn = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
    })
  },
});

export default accountSlice.reducer;
// export const { setAccount } = accountSlice.actions;
