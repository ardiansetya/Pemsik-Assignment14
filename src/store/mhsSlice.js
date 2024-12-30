import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axiosInstance";

// Async Thunk untuk Fetch Mahasiswa
export const fetchMahasiswa = createAsyncThunk(
    "mhs/fetchMahasiswa",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/mahasiswa");
            // Mengakses array dari response.data.data
            return response.data || []; // Pastikan yang dikembalikan adalah array
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Gagal memuat data mahasiswa"
            );
        }
    }
);

// Async Thunk untuk Menambah Mahasiswa
export const addMahasiswa = createAsyncThunk(
    "mhs/addMahasiswa",
    async (newData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/api/mahasiswa", newData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Gagal menambah data mahasiswa"
            );
        }
    }
);

// Async Thunk untuk Mengedit Mahasiswa
export const editMahasiswa = createAsyncThunk(
    "mhs/editMahasiswa",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/api/mahasiswa/${id}`, updatedData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Gagal mengedit data mahasiswa"
            );
        }
    }
);

// Async Thunk untuk Menghapus Mahasiswa
export const deleteMahasiswa = createAsyncThunk(
    "mhs/deleteMahasiswa",
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/api/mahasiswa/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Gagal menghapus data mahasiswa"
            );
        }
    }
);

// Slice Mahasiswa
const initialState = {
    user: '',
    token:'',
    data: [],
    loading: false,
    error: null,
};

export const mhsSlice = createSlice({
    name: "mhs",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMahasiswa.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMahasiswa.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchMahasiswa.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addMahasiswa.pending, (state) => {
                state.loading = true;
            })
            .addCase(addMahasiswa.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload);
            })
            .addCase(addMahasiswa.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editMahasiswa.pending, (state) => {
                state.loading = true;
            })
            .addCase(editMahasiswa.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex((mhs) => mhs.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(editMahasiswa.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteMahasiswa.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteMahasiswa.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.filter((mhs) => mhs.id !== action.payload);
            })
            .addCase(deleteMahasiswa.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { login, logout } = mhsSlice.actions;

export default mhsSlice.reducer;
