import React from "react";
import type { Patient } from "../../types/user";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface PatientTableProps {
  patients: Patient[];
  isAdmin: boolean;
  onEdit: (patientId: number) => void;
  onDelete: (patientId: number) => void;
}

const PatientTable: React.FC<PatientTableProps> = ({
  patients,
  isAdmin,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md mb-6">
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">First Name</th>
            <th className="py-3 px-6 text-left">Last Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Phone</th>
            <th className="py-3 px-6 text-left">DOB</th>
            {isAdmin && <th className="py-3 px-6 text-center">Actions</th>}
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {patients.map((patient) => (
            <tr
              key={patient.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {patient.id}
              </td>
              <td className="py-3 px-6 text-left">{patient.firstName}</td>
              <td className="py-3 px-6 text-left">{patient.lastName}</td>
              <td className="py-3 px-6 text-left">{patient.email}</td>
              <td className="py-3 px-6 text-left">{patient.phoneNumber}</td>
              <td className="py-3 px-6 text-left">{patient.dob}</td>
              {isAdmin && (
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center space-x-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1.5 rounded text-xs"
                      title="Edit"
                      onClick={() => onEdit(patient.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      title="Delete"
                      className="bg-red-500 hover:bg-red-700 text-white font-bold p-1.5 rounded text-xs"
                      onClick={() => onDelete(patient.id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;
