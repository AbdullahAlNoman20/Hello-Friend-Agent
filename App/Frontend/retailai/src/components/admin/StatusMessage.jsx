import { CheckCircle, AlertCircle } from "lucide-react";

export function StatusMessage({ status }) {
  if (status === "success") {
    return (
      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <span className="text-green-800 font-medium">
          Product added successfully!
        </span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
        <AlertCircle className="h-5 w-5 text-red-600" />
        <span className="text-red-800 font-medium">
          Failed to add product. Please try again.
        </span>
      </div>
    );
  }

  return null;
}
