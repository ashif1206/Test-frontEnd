import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const createContact = createAsyncThunk("Create/contact",async({name,email,phoneNumber},{rejectWithValue})=>{
    try{

        const {data} = await axios.post(`https://contact-manager-bakcend.onrender.com/api/v1/contacts`,{name,email,phoneNumber});
        return data;

    }catch(e){
        return rejectWithValue(e.response?.data || "An Error occured")
    }
});

export const getContact = createAsyncThunk("get/contact",async ({keyword="",searchBy=""}={}, { rejectWithValue }) => {
    try {
      let link = `https://contact-manager-bakcend.onrender.com/api/v1/contacts`
      if(keyword && keyword !== ""){
        link += `?keyword=${keyword}`
      }
      if(searchBy === "name" && searchBy !== ""){
        link += `&searchBy=${searchBy}`
      }
      if(searchBy === "email" && searchBy !== ""){
        link += `&searchBy=${searchBy}`
      }
      if(searchBy === "phoneNumber" && searchBy !== ""){
        link += `&searchBy=${searchBy}`
      }
      const { data } = await axios.get(link);
      return data;
    } catch (e) {
      return rejectWithValue(e.response?.data || "An Error occurred");
    }
  }
);

export const getSingleContact = createAsyncThunk("get/single", async(id,{rejectWithValue})=>{
  try{
    const { data } = await axios.get(`https://contact-manager-bakcend.onrender.com/api/v1/contact?id=${id}`);
    return data;
  }catch(e){
    return rejectWithValue(e.response?.data || "Error occour to get single contact")
  }
});

export const deleteContact = createAsyncThunk("delete/single", async(id,{rejectWithValue})=>{
  try{
    const { data } = await axios.delete(`https://contact-manager-bakcend.onrender.com/api/v1/contact?id=${id}`);
    return data;
  }catch(e){
    return rejectWithValue(e.response?.data || "Error occour to delete contact")
  }
});

const contactSlice = createSlice({
  name: "Contact",
  initialState: {
    contact: [],
    singleContact:{},
    success: false,
    error: null,
    loading: false,
    message:""
  },

  reducers: {
    removeSuccess:(state,action)=>{
      state.success= false
    },
    removeLoading:(state,action)=>{
      state.loading= false
    },
    removeError:(state,action)=>{
      state.error= null
    },
    removeMessage:(state,action)=>{
      state.message = ""
    },
    removeSingleContact:(state,action)=>{
      state.singleContact = {}
    }
  },

  extraReducers: (b) => {

    // ! Get All Contact

    b.addCase(getContact.pending, (state) => {
      state.success = false
      state.loading = true;
      state.error = null;
    });
    b.addCase(getContact.fulfilled, (state, action) => {
      state.contact = action.payload.AllData;
      state.success = true;
      state.loading = false;
    });
    b.addCase(getContact.rejected, (state, action) => {
      state.loading = false;
      state.success = false
      state.error = action.payload?.message;
    });

    // ! Create Contact

       b.addCase(createContact.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      b.addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.contact.push(action.payload.Data)  
        state.message = action.payload.message
       
      })
      b.addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload;
        state.success = false;
      });

      // ! Single Contact
      b.addCase(getSingleContact.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    b.addCase(getSingleContact.fulfilled, (state, action) => {
      state.singleContact = action.payload.contact;
      state.message = action.payload.message
      state.loading = false;
      state.success = true;
    });
    b.addCase(getSingleContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
      state.success = false;
    });

      // ! delete Contact
    b.addCase(deleteContact.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    b.addCase(deleteContact.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.contact = state.contact.filter((item)=> item._id !== action.payload.contact._id);
      state.loading = false;
      state.success = true;
    });
    b.addCase(deleteContact.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload?.message;
    });

  },
});
export const {removeSuccess,removeError,removeMessage,removeSingleContact,removeLoading} = contactSlice.actions;
export default contactSlice.reducer;
