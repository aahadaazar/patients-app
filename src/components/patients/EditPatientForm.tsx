import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { patientsApi } from "../../services/api.service";
import { patientSchema } from "../../validation/patientValidation";
import type { Patient } from "../../types/user";

interface EditPatientFormProps {
  patient: Patient;
  onPatientUpdated: () => void;
  onCancel: () => void;
}

type PatientFormData = Omit<Patient, "id">;

const EditPatientForm: React.FC<EditPatientFormProps> = ({
  patient,
  onPatientUpdated,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PatientFormData>({
    resolver: yupResolver(patientSchema),
    defaultValues: {
      firstName: patient.firstName,
      lastName: patient.lastName,
      email: patient.email,
      phoneNumber: patient.phoneNumber,
      dob: patient.dob,
    },
  });

  useEffect(() => {
    reset({
      firstName: patient.firstName,
      lastName: patient.lastName,
      email: patient.email,
      phoneNumber: patient.phoneNumber,
      dob: patient.dob,
    });
  }, [patient, reset]);

  const onSubmit = async (data: PatientFormData) => {
    try {
      await patientsApi.updatePatient(patient.id, data);
      onPatientUpdated();
    } catch (error) {
      console.error("Failed to update patient:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        {patient.firstName} {patient.lastName}
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="editFirstName"
              className="block text-white text-sm font-bold mb-2"
            >
              First Name:
            </label>
            <input
              type="text"
              id="editFirstName"
              {...register("firstName")}
              placeholder="e.g., John"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline ${
                errors.firstName ? "border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs italic">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="editLastName"
              className="block text-white text-sm font-bold mb-2"
            >
              Last Name:
            </label>
            <input
              type="text"
              id="editLastName"
              {...register("lastName")}
              placeholder="e.g., Doe"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline ${
                errors.lastName ? "border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs italic">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="editEmail"
              className="block text-white text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="editEmail"
              {...register("email")}
              placeholder="e.g., john.doe@example.com"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="editPhoneNumber"
              className="block text-white text-sm font-bold mb-2"
            >
              Phone Number (000-000-0000):
            </label>
            <input
              type="tel"
              id="editPhoneNumber"
              {...register("phoneNumber")}
              placeholder="e.g., 123-456-7890"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline ${
                errors.phoneNumber ? "border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs italic">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="editDob"
              className="block text-white text-sm font-bold mb-2"
            >
              Date of Birth (YYYY-MM-DD):
            </label>
            <input
              type="date"
              id="editDob"
              {...register("dob")}
              placeholder="YYYY-MM-DD"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline ${
                errors.dob ? "border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.dob && (
              <p className="text-red-500 text-xs italic">
                {errors.dob.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPatientForm;
