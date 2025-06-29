// frontend/src/components/common/ConfirmationDialog.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void; // Called when dialog is closed (cancel or after confirm)
  onConfirm: () => void; // Called when user confirms action
  title: string;
  description: string;
  confirmText?: string; // Optional text for the confirm button, defaults to 'Confirm'
  cancelText?: string; // Optional text for the cancel button, defaults to 'Cancel'
  isConfirming?: boolean; // To show loading state on confirm button
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isConfirming = false,
}) => {
  // You might need to add the Button component from shadcn/ui if you haven't already:
  // npx shadcn-ui@latest add button

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] [&>button]:hidden">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isConfirming}>
            {cancelText}
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isConfirming}
          >
            {isConfirming ? "..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
