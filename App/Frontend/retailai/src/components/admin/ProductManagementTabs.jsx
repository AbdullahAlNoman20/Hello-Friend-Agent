import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import { ManualProductForm } from "./ManualProductForm";
import { CsvUploadForm } from "./CsvUploadForm";

export function ProductManagementTabs({
  activeTab,
  setActiveTab,
  onManualSubmit,
  onCsvSubmit,
  loading,
}) {
  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        <Button
          variant={activeTab === "manual" ? "default" : "outline"}
          onClick={() => setActiveTab("manual")}
          className="flex items-center space-x-2"
          disabled={loading}
        >
          <Plus className="h-4 w-4" />
          <span>Manual Entry</span>
        </Button>
        <Button
          variant={activeTab === "csv" ? "default" : "outline"}
          onClick={() => setActiveTab("csv")}
          className="flex items-center space-x-2"
          disabled={loading}
        >
          <Upload className="h-4 w-4" />
          <span>CSV Upload</span>
        </Button>
      </div>

      {/* Tab Content */}
      {activeTab === "manual" && (
        <ManualProductForm onSubmit={onManualSubmit} loading={loading} />
      )}

      {activeTab === "csv" && (
        <CsvUploadForm onSubmit={onCsvSubmit} loading={loading} />
      )}
    </div>
  );
}
