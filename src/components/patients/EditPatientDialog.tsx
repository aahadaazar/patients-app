import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import EditPatientForm from "./EditPatientForm";
import type { Patient } from "../../types/user";

interface EditPatientDialogProps {
  isOpen: boolean;
  patient: Patient | null;
  onClose: () => void;
  onPatientUpdated: () => void;
}

const EditPatientDialog: React.FC<EditPatientDialogProps> = ({
  isOpen,
  patient,
  onClose,
  onPatientUpdated,
}) => {
  if (!patient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[600px] [&>button]:hidden"
        aria-describedby="Edit Patient Dialog"
      >
        <DialogHeader>
          <DialogTitle>Edit Patient</DialogTitle>
        </DialogHeader>
        {patient && (
          <EditPatientForm
            patient={patient}
            onPatientUpdated={onPatientUpdated}
            onCancel={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditPatientDialog;
