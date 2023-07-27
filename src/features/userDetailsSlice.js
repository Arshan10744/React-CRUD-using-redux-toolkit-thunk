import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'; // Import Axios

export const createUser = createAsyncThunk(
  "createUser",
  async (data) => {
    try {
      const response = await axios.post(
        "https://64bea8c25ee688b6250cc1ef.mockapi.io/crud",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw Error('Failed to Create new User');
    }
  }
);

export const readUser = createAsyncThunk(
    "readUsers",
    async() => {
        try{
            const response = await axios.get("https://64bea8c25ee688b6250cc1ef.mockapi.io/crud");
            return response.data;
        }
        catch(error){
            throw Error("Failed to Retrieve the Data");
        }
    }
);

export const deleteUser = createAsyncThunk(
    "deleteUsers",
    async(id) => {
        try{
         const response = await axios.delete(`https://64bea8c25ee688b6250cc1ef.mockapi.io/crud/${id}`);
         return response.data;    
        }
        catch(error){
            throw Error("Failed to Delete the Data");
        }
    }
)

export const updateUser = createAsyncThunk(
    "updateUser",
    async (data) => {
      try {
        const response = await axios.put(
          `https://64bea8c25ee688b6250cc1ef.mockapi.io/crud/${data.id}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error) {
        throw Error('Failed to Create new User');
      }
    }
  );



export const userDetails = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
    search: [],
  },

  reducers:{
    searchUser:(state, action) => {
        state.search = action.payload
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(readUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(readUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = (action.payload);
      })
      .addCase(readUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;

        const {id} = action.payload;
        state.users = state.users.filter((elem)=> elem.id != id);
        console.log("delete action", action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        //state.users = state.users.map((elem)=>
          //  elem.id === action.payload.id ? action.payload : elem        
        //)
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userDetails.reducer;

export const {searchUser} = userDetails.actions;
