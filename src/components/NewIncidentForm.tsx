
import { useState } from "react";
import { Incident, Severity } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface NewIncidentFormProps {
  onAddIncident: (incident: Omit<Incident, "id" | "reported_at">) => void;
}

const NewIncidentForm = ({ onAddIncident }: NewIncidentFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<Severity>("Medium");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title.trim() || !description.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields."
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Add delay to simulate processing
    setTimeout(() => {
      onAddIncident({
        title,
        description,
        severity,
      });
      
      // Reset form
      setTitle("");
      setDescription("");
      setSeverity("Medium");
      setIsSubmitting(false);
      
      toast({
        title: "Success!",
        description: "New incident has been reported."
      });
    }, 500);
  };

  return (
    <Card className="border shadow-sm mb-8">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-brand">Report New Incident</CardTitle>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter incident title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide detailed information about the incident"
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-3">
            <Label>Severity <span className="text-red-500">*</span></Label>
            <RadioGroup 
              value={severity} 
              onValueChange={(value) => setSeverity(value as Severity)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Low" id="low" />
                <Label htmlFor="low" className="text-green-700">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Medium" id="medium" />
                <Label htmlFor="medium" className="text-yellow-700">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="High" id="high" />
                <Label htmlFor="high" className="text-red-600">High</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-brand hover:bg-brand/90 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default NewIncidentForm;
