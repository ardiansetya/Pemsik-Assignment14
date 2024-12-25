import { useEffect, useState } from "react";
import  axiosInstance  from "../axios/axiosInstance";

export const useFetchData = () => {
  const [datas, setDatas] = useState([]);

  const fetchDataMahasiswa = async () => {
    try {
      const response = await axiosInstance.get('/api/mahasiswa');
      setDatas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataMahasiswa();
  }, []); 

  return { mahasiswa: datas, setMahasiswa: setDatas };
};

export const UsePostMhs = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (body) => {
    setLoading(true);
    setError(null); 
    try {
      const response = await axiosInstance.post("/api/mahasiswa", body);
      setDatas(response.data);
      return response.data; 
    } catch (error) {
      setError(error.response?.data?.message || "Terjadi kesalahan saat menambahkan data");
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  return { newMhs: datas, postData, loading, error };
};

export const useUpdateMahasiswa = () => {
  const [datas, setDatas] = useState([]);

  const editDataMahasiswa = async (id, body) => {
    try {
      const response = await axiosInstance.put(`/api/mahasiswa/${id}`, body);
      setDatas(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { newMhs:datas, editDataMahasiswa };

}

export const useDeleteMahasiswa = () => {
  const [datas, setDatas] = useState([]);

  const deleteDataMahasiswa = async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/mahasiswa/${id}`);
      setDatas(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteMhs: datas, deleteDataMahasiswa };
}