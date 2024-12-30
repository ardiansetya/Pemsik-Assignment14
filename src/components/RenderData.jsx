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
  const { data: mahasiswa, loading, error } = useSelector((state) => state.mhs);

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
      } catch (error) {
        MySwal.fire("Berhasil!", "Mahasiswa berhasil ditambahkan.", "success");
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
      } catch (error) {
        MySwal.fire(
          "Berhasil!",
          "Data mahasiswa berhasil diperbarui.",
          "success"
        );
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
        await dispatch(deleteMahasiswa(id)).unwrap();
      } catch (error) {
        MySwal.fire("Deleted!", "Data berhasil dihapus.", "success");
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h1 className="text-lg sm:text-xl font-bold text-gray-800">
          Daftar Mahasiswa
        </h1>
        <div className="flex-shrink-0">
          {isLogin ? (
            <Button
              onClick={handleModal}
              disabled={loading}
              className="text-sm px-3 py-1">
              {loading ? "Loading..." : "Tambah Mahasiswa"}
            </Button>
          ) : (
            <p className="text-sm text-gray-600">Anda belum login</p>
          )}
        </div>
      </div>

      <div className="max-w-full overflow-x-auto rounded-lg">
        <div className="min-w-max">
          <table className="w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-12">
                  ID
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-14">
                  NIM
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-14">
                  Nama
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-14">
                  Alamat
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-16">
                  Umur
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-32">
                  Prodi
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-32">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mahasiswa.data?.length > 0 ? (
                mahasiswa.data?.map((mhs) => (
                  <tr
                    key={mhs.id}
                    className="hover:bg-gray-50 transition-colors">
                    <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-900">
                      {mhs.id}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-900">
                      {mhs.nim}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-900">
                      {mhs.nama}
                    </td>
                    <td className="px-2 py-2 text-xs text-gray-900">
                      {mhs.alamat}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-900">
                      {mhs.umur}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-900">
                      {mhs.progdi?.nama || "-"}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-900">
                      <div className="flex items-center gap-1">
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
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-2 py-4 text-center text-xs text-gray-600 italic bg-gray-50">
                    Data tidak ditemukan atau Anda belum login.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RenderData;
