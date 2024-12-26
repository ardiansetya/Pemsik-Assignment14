import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "./Button";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {
  addMahasiswa,
  deleteMahasiswa,
  editMahasiswa,
  fetchMahasiswa,
} from "../store/mhsSlice";

const RenderData = () => {
  const dispatch = useDispatch();
  const { data:mahasiswa, loading, error } = useSelector((state) => state.mhs);


  const MySwal = withReactContent(Swal);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLogin(!!token);
    dispatch(fetchMahasiswa());
  }, [dispatch]);


  const handleModal = async () => {
    const { value: formValues } = await MySwal.fire({
      title: "Tambah Mahasiswa",
      html: `
        <input id="swal-input-nim" class="swal2-input" placeholder="NIM">
        <input id="swal-input-nama" class="swal2-input" placeholder="Nama">
        <input id="swal-input-alamat" class="swal2-input" placeholder="Alamat">
        <input id="swal-input-umur" type="number" class="swal2-input" placeholder="Umur">
        <input id="swal-input-progdi_id" class="swal2-input" placeholder="Progdi ID">
      `,
      preConfirm: () => {
        const nim = document.getElementById("swal-input-nim").value;
        const nama = document.getElementById("swal-input-nama").value;
        const alamat = document.getElementById("swal-input-alamat").value;
        const umur = parseInt(
          document.getElementById("swal-input-umur").value,
          10
        );
        const progdi_id = document.getElementById("swal-input-progdi_id").value;

        if (!nim || !nama || !alamat || !umur || !progdi_id) {
          MySwal.showValidationMessage("Semua field harus diisi!");
          return null;
        }

        if (isNaN(umur) || umur <= 0) {
          MySwal.showValidationMessage("Umur harus berupa angka positif!");
          return null;
        }

        return { nim, nama, alamat, umur, progdi_id };
      },
    });

    if (formValues) {
      try {
        await dispatch(addMahasiswa(formValues)).unwrap();
        Swal.fire("Berhasil!", "Mahasiswa berhasil ditambahkan.", "success");
      } catch (error) {
        Swal.fire(
          "Error!",
          "Terjadi kesalahan saat menambahkan data.",
          "error"
        );
      }
    }
  };

  const handleModalEdit = async (id, mhs) => {
    const { value: formValues } = await MySwal.fire({
      title: "Edit Mahasiswa",
      html: `
        <input id="swal-input-nim" class="swal2-input" placeholder="NIM" value="${
          mhs.nim || ""
        }">
        <input id="swal-input-nama" class="swal2-input" placeholder="Nama" value="${
          mhs.nama || ""
        }">
        <input id="swal-input-alamat" class="swal2-input" placeholder="Alamat" value="${
          mhs.alamat || ""
        }">
        <input id="swal-input-umur" type="number" class="swal2-input" placeholder="Umur" value="${
          mhs.umur || ""
        }">
        <input id="swal-input-progdi_id" class="swal2-input" placeholder="Progdi ID" value="${
          mhs.progdi_id || ""
        }">
      `,
      preConfirm: () => {
        const nim = document.getElementById("swal-input-nim").value;
        const nama = document.getElementById("swal-input-nama").value;
        const alamat = document.getElementById("swal-input-alamat").value;
        const umur = parseInt(
          document.getElementById("swal-input-umur").value,
          10
        );
        const progdi_id = document.getElementById("swal-input-progdi_id").value;

        if (!nim || !nama || !alamat || !umur || !progdi_id) {
          MySwal.showValidationMessage("Semua field harus diisi!");
          return null;
        }

        if (isNaN(umur) || umur <= 0) {
          MySwal.showValidationMessage("Umur harus berupa angka positif!");
          return null;
        }

        return { nim, nama, alamat, umur, progdi_id };
      },
    });

    if (formValues) {
      try {
        await dispatch(editMahasiswa({ id, updatedData: formValues })).unwrap();
        Swal.fire(
          "Berhasil!",
          "Data mahasiswa berhasil diperbarui.",
          "success"
        );
      } catch (error) {
        Swal.fire("Error!", "Terjadi kesalahan saat mengupdate data.", "error");
      }
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });


    if (result.isConfirmed) {
      try {
        const response = await dispatch(deleteMahasiswa(id)).unwrap();
        console.log(response)
        Swal.fire("Deleted!", "Data berhasil dihapus.", "success");
      } catch (error) {
        Swal.fire("Error!", "Terjadi kesalahan saat menghapus data.", "error");
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-5 overflow-hidden">
      <div className="flex items-center justify-between gap-5">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Daftar Mahasiswa
        </h1>
        {isLogin ? (
          <Button onClick={handleModal} disabled={loading}>
            {loading ? "Loading..." : "Tambah Mahasiswa"}
          </Button>
        ) : (
          <p>Anda belum login</p>
        )}
      </div>

      <div className="mt-5">
        <table className="table-auto min-w-full border-collapse border border-gray-300 text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-600">
                ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-600">
                NIM
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-600">
                Nama
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-600">
                Alamat
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-600">
                Umur
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-600">
                Prodi
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {mahasiswa.data?.length > 0 ? (
              mahasiswa.data?.map((mhs) => (
                <tr
                  key={mhs.id}
                  className="border-b hover:bg-gray-50 transition">
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">
                    {mhs.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">
                    {mhs.nim}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">
                    {mhs.nama}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">
                    {mhs.alamat}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">
                    {mhs.umur}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">
                    {mhs.progdi?.nama || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800 flex gap-3">
                    <Button
                      variant="secondary"
                      onClick={() => handleModalEdit(mhs.id, mhs)}>
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(mhs.id)}>
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-4 py-3 text-center text-gray-600 italic">
                  Data tidak ditemukan atau Anda belum login.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RenderData;
