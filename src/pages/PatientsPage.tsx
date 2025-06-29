import React, { useState, useEffect, useCallback } from "react";
import {
  patientsApi,
  type PaginatedPatientsResponse,
} from "../services/api.service";
import { useAuth } from "../context/AuthContext";
import type { Patient } from "../types/user";
import PatientTable from "../components/patients/PatientTable";
import PaginationControls from "../components/commons/PaginationControls";
import AddPatientForm from "../components/patients/AddPatientForm";
import EditPatientDialog from "../components/patients/EditPatientDialog";
import ConfirmationDialog from "../components/commons/ConfirmationDialog";

const PATIENTS_PER_PAGE = 10;

const PatientsPage: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalPatients, setTotalPatients] = useState<number>(0);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] =
    useState<boolean>(false);
  const [patientToDeleteId, setPatientToDeleteId] = useState<number | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const { authState } = useAuth();
  const isAdminOrEmployee = authState.isAdmin;
  const isAdmin = authState.isAdmin;

  const fetchPatients = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      const data: PaginatedPatientsResponse = await patientsApi.getPatients(
        page,
        PATIENTS_PER_PAGE
      );
      setPatients(data.data);
      setTotalPages(data.pages);
      setTotalPatients(data.total);
      setCurrentPage(page);
    } catch (err) {
      console.error("Failed to fetch patients:", err);
      setError("Failed to load patients. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPatients(currentPage);
  }, [currentPage, fetchPatients]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [currentPage, totalPages]);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [currentPage]);

  const handleEditPatient = useCallback(async (patientId: number) => {
    try {
      const patientData = await patientsApi.getPatientById(patientId);
      setEditingPatient(patientData);
      setShowEditModal(true);
    } catch (err) {
      console.error("Failed to fetch patient for edit:", err);
      setError("Failed to load patient for editing.");
    }
  }, []);

  const handleDeletePatient = (patientId: number) => {
    setPatientToDeleteId(patientId);
    setShowConfirmDeleteDialog(true);
  };

  const handleConfirmDelete = useCallback(async () => {
    if (patientToDeleteId === null) return;
    setIsDeleting(true);
    try {
      await patientsApi.deletePatient(patientToDeleteId);
      setShowConfirmDeleteDialog(false);
      setPatientToDeleteId(null);
      fetchPatients(currentPage);
    } catch (err) {
      console.error("Failed to delete patient:", err);
      setError("Failed to delete patient. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }, [patientToDeleteId, fetchPatients, currentPage]);

  const handlePatientUpdated = useCallback(() => {
    setShowEditModal(false);
    setEditingPatient(null);
    fetchPatients(currentPage);
  }, [fetchPatients, currentPage]);

  const handleCancelDelete = useCallback(() => {
    setShowConfirmDeleteDialog(false);
    setPatientToDeleteId(null);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setShowEditModal(false);
    setEditingPatient(null);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-160px)]">
        <p className="text-xl text-gray-700">Loading patients...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-160px)]">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Patient List
      </h2>

      {authState.user && (
        <p className="text-gray-600 mb-4 text-center">
          You are logged in as:{" "}
          <span className="font-semibold">{authState.user.id}</span> (
          {authState.user.role})
        </p>
      )}

      {isAdmin && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            {showAddForm ? "Cancel Add" : "Add New Patient"}
          </button>
        </div>
      )}

      {isAdmin && showAddForm && (
        <AddPatientForm
          onPatientAdded={() => {
            setShowAddForm(false);
            fetchPatients(1);
          }}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {patients.length === 0 && !loading && !error ? (
        <p className="text-center text-gray-600 text-lg">
          No patients found. Get started by adding some!
        </p>
      ) : (
        <>
          <PatientTable
            patients={patients}
            isAdmin={isAdminOrEmployee}
            onEdit={handleEditPatient}
            onDelete={handleDeletePatient}
          />

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalPatients}
            itemsPerPage={PATIENTS_PER_PAGE}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
            loading={loading}
          />
        </>
      )}
      <EditPatientDialog
        isOpen={showEditModal}
        patient={editingPatient}
        onClose={handleCloseEditModal}
        onPatientUpdated={handlePatientUpdated}
      />
      <ConfirmationDialog
        isOpen={showConfirmDeleteDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        description={`Are you sure you want to delete patient with ID: ${patientToDeleteId}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isConfirming={isDeleting}
      />
    </div>
  );
};

export default PatientsPage;
