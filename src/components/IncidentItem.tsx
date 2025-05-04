
import { useState } from "react";
import { Incident } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";

interface IncidentItemProps {
  incident: Incident;
}

const IncidentItem = ({ incident }: IncidentItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low":
        return "bg-severity-low border-green-300 text-green-800";
      case "Medium":
        return "bg-severity-medium border-yellow-300 text-yellow-800";
      case "High":
        return "bg-severity-high text-white";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <Card className="mb-4 border shadow-sm hover:shadow transition-shadow animate-fade-in">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">{incident.title}</h3>
          <p className="text-sm text-gray-500">{formatDate(incident.reported_at)}</p>
        </div>
        <Badge className={`${getSeverityColor(incident.severity)} ml-2`}>
          {incident.severity}
        </Badge>
      </CardHeader>
      <CardFooter className="pt-2 flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-brand hover:text-brand/80 hover:bg-brand/10"
        >
          {isExpanded ? (
            <>
              <span>Hide Details</span>
              <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              <span>View Details</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
      
      {isExpanded && (
        <CardContent className="pb-4 pt-0 border-t mt-2">
          <p className="text-gray-700 mt-2">{incident.description}</p>
        </CardContent>
      )}
    </Card>
  );
};

export default IncidentItem;
