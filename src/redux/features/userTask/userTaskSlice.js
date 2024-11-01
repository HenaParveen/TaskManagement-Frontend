import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userTaskService from "./userTaskService";
import toast from "react-hot-toast";
import { act } from "react";

const initialState = {
  isLoggedIn: false,
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  analytics: {},
  task: [],
  card: {},
};

export const register = createAsyncThunk(
  "userTaskService/register",
  async (userData, thunkAPI) => {
    try {
      return await userTaskService.register(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        "Failed at User Registration";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "userTaskService/login",
  async (userData, thunkAPI) => {
    try {
      return await userTaskService.login(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        "Failed at User Login";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk(
  "userTaskService/logout",
  async (_, thunkAPI) => {
    try {
      return await userTaskService.logout();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        "Failed at User Logout";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addCard = createAsyncThunk(
  "userTaskService/addCard",
  async (cardData, thunkAPI) => {
    try {
      return await userTaskService.addCard(cardData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        "Failed at adding Card Details";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCard = createAsyncThunk(
  "userTaskService/getCard",
  async (cardId, thunkAPI) => {
    try {
      return await userTaskService.getCard(cardId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        "Failed at getting Card Details";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCards = createAsyncThunk(
  "userTaskService/getCards",
  async ({ datePreference, status }, thunkAPI) => {
    try {
      return await userTaskService.getCards(datePreference, status);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        "Failed at getting all Cards Details";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCard = createAsyncThunk(
  "userTaskService/updateCard",
  async ({ cardId, cardData }, thunkAPI) => {
    try {
      return await userTaskService.updateCard(cardId, cardData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        "Failed at updating Card Details Card Details";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateAssignee = createAsyncThunk(
  "userTaskService/updateAssignee",
  async (email, thunkAPI) => {
    try {
      return await userTaskService.updateAssignee(email);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        "Failed at updating Assignee to the Board:";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteCard = createAsyncThunk(
  "userTaskService/deleteCard",
  async (cardId, thunkAPI) => {
    try {
      return await userTaskService.deleteCard(cardId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        "Failed at deleting Card Details Card Details";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCardTaskStatus = createAsyncThunk(
  "userTaskService/updateCardTaskStatus",
  async ({ cardId, cardData }, thunkAPI) => {
    try {
      return await userTaskService.updateCardTaskStatus(cardId, cardData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        "Failed at updating Task Status";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const analyticsData = createAsyncThunk(
  "userTaskService/analyticsData",
  async (_, thunkAPI) => {
    try {
      return await userTaskService.analyticsData();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        "Failed at Analytics Data page";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "userTaskService/updateUser",
  async (userData, thunkAPI) => {
    try {
      return await userTaskService.updateUser(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        "Failed at Update User Page";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userTaskSlice = createSlice({
  name: "userTask",
  initialState,
  reducers: {
    USER_TASK_RESET(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      state.user = null;
      state.analytics = {};
      state.task = [];
      state.cardAdded = false;
      state.updateCard = false;
    },
    RESET_CARD_ADD_UPDATE_STATUS(state) {
      state.cardAdded = false;
      state.updateCard = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* Register Function */
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.message = action.payload.message;
        state.user = action.payload.data;
        toast.success(action.payload.message);
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.isLoggedIn = false;
        state.message = action.payload.message;
        state.user = null;
        toast.error(action.payload.message);
      })

      /* Login Function case handling */
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.message = action.payload.message;
        state.user = action.payload.data;
        toast.success(action.payload.message);
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.isLoggedIn = false;
        state.message = action.payload.message;
        state.user = null;
        toast.error(action.payload);
      })

      /* Logout Function case handling */
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.isLoggedIn = false;
        state.message = action.payload.message;
        state.user = null;
        toast.success(action.payload.message);
      })
      .addCase(logout.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.isLoggedIn = false;
        state.message = action.payload.message;
        state.user = null;
        toast.error(action.payload);
      })

      /* get Analytics Data */
      .addCase(analyticsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(analyticsData.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload.message;
        state.analytics = action.payload.data;
      })
      .addCase(analyticsData.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload.message;
        state.analytics = null;
        toast.error(action.payload);
      })

      /* update User*/
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload.message;
        state.user = action.payload.data;
        toast.success(action.payload.message);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload.message;
        toast.error(action.payload);
      })

      /* Get Card Details*/
      .addCase(getCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCard.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload.message;
        state.card = action.payload.data;
      })
      .addCase(getCard.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload.message;
        state.card = null;
        toast.error(action.payload);
      })

      /* Get Cards Details*/
      .addCase(getCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCards.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload.message;
        state.task = action.payload.data;
      })
      .addCase(getCards.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload.message;
        state.task = null;
        toast.error(action.payload);
      })

      /* Update Card Details*/
      .addCase(updateCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload.message;
        state.card = action.payload.data;
        toast.success(action.payload.message);
      })
      .addCase(updateCard.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload.message;
        state.card = null;
        toast.error(action.payload);
      })

      /* Update assignee to the Board */
      .addCase(updateAssignee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAssignee.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(updateAssignee.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload.message;
        toast.error(action.payload);
      })

      /* Update Card status Details*/
      .addCase(updateCardTaskStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCardTaskStatus.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload.message;
        state.card = action.payload.data;
        state.cardUpdated = true;
        toast.success(action.payload.message);
      })
      .addCase(updateCardTaskStatus.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload.message;
        state.card = null;
        toast.error(action.payload);
      })

      /* Add Card  Details*/
      .addCase(addCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload.message;
        state.card = action.payload.data;
        toast.success(action.payload.message);
      })
      .addCase(addCard.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload.message;
        state.card = null;
        toast.error(action.payload);
      })

      /* Delete Card*/
      .addCase(deleteCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload.message;
        toast.error(action.payload);
      });
  },
});

export default userTaskSlice.reducer;
export const { USER_TASK_RESET, RESET_CARD_ADD_UPDATE_STATUS } =
  userTaskSlice.actions;
