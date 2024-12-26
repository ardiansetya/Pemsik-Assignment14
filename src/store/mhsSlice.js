import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axiosInstance";

// Async Thunk untuk Fetch Mahasiswa
export const fetchMahasiswa = createAsyncThunk(
    "mhs/fetchMahasiswa",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/mahasiswa");
            return response.data;
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
export const mhsSlice = createSlice({
    name: "mhs",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        const setPending = (state) => {
            state.loading = true;
            state.error = null;
        };

        const setRejected = (state, action) => {
            state.loading = false;
            state.error = action.payload;
        };

        builder
            .addCase(fetchMahasiswa.pending, setPending)
            .addCase(fetchMahasiswa.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchMahasiswa.rejected, setRejected)
            .addCase(addMahasiswa.pending, setPending)
            .addCase(addMahasiswa.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload);
            })
            .addCase(addMahasiswa.rejected, setRejected)
            .addCase(editMahasiswa.pending, setPending)
            .addCase(editMahasiswa.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex((mhs) => mhs.id === action.payload.id);
                if (index !== -1) state.data[index] = action.payload;
            })
            .addCase(editMahasiswa.rejected, setRejected)
            .addCase(deleteMahasiswa.pending, setPending)
            .addCase(deleteMahasiswa.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.filter((mhs) => mhs.id !== action.payload);
            })
            .addCase(deleteMahasiswa.rejected, setRejected);
    },
});

export default mhsSlice.reducer;
