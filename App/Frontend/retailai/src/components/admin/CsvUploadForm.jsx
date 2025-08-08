import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Loader2 } from "lucide-react";

export function CsvUploadForm({ onSubmit, loading }) {
  const [csvFile, setCsvFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/csv") {
      setCsvFile(file);
    } else {
      alert("Please select a valid CSV file");
    }
  };

  const handleSubmit = async () => {
    if (csvFile) {
      await onSubmit(csvFile);
      setCsvFile(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Upload CSV File
        </h3>
        <p className="text-muted-foreground mb-4">
          Upload a CSV file with your product data. Make sure it includes all
          required fields.
        </p>
        <Input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="max-w-xs mx-auto"
          disabled={loading}
        />
        {csvFile && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{csvFile.name}</span>
            </div>
          </div>
        )}
      </div>
      <Button
        onClick={handleSubmit}
        disabled={!csvFile || loading}
        className="w-full md:w-auto"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processing CSV...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4 mr-2" />
            Process CSV
          </>
        )}
      </Button>
    </div>
  );
}
