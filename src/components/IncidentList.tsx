
import { useState, useMemo } from "react";
import { Incident, FilterType, SortOrder } from "@/lib/types";
import IncidentItem from "./IncidentItem";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, ChevronUp, ChevronDown } from "lucide-react";

interface IncidentListProps {
  incidents: Incident[];
}

const IncidentList = ({ incidents }: IncidentListProps) => {
  const [filter, setFilter] = useState<FilterType>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const filteredAndSortedIncidents = useMemo(() => {
    // First filter
    const filtered = filter === "All"
      ? incidents
      : incidents.filter(incident => incident.severity === filter);

    // Then sort
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.reported_at).getTime();
      const dateB = new Date(b.reported_at).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [incidents, filter, sortOrder]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-gray-500 mr-2" />
          <Select value={filter} onValueChange={(value) => setFilter(value as FilterType)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Severities</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex space-x-2">
          <Button 
            variant={sortOrder === "newest" ? "default" : "outline"}
            size="sm" 
            onClick={() => setSortOrder("newest")}
            className={sortOrder === "newest" ? "bg-brand hover:bg-brand/90" : ""}
          >
            Newest First
            <ChevronUp className="ml-1 h-4 w-4" />
          </Button>
          <Button 
            variant={sortOrder === "oldest" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSortOrder("oldest")}
            className={sortOrder === "oldest" ? "bg-brand hover:bg-brand/90" : ""}
          >
            Oldest First
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAndSortedIncidents.length > 0 ? (
          filteredAndSortedIncidents.map((incident) => (
            <IncidentItem key={incident.id} incident={incident} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No incidents found matching the current filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentList;
