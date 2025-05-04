
import { useState } from "react";
import { mockIncidents } from "@/lib/mockData";
import { Incident } from "@/lib/types";
import IncidentList from "@/components/IncidentList";
import NewIncidentForm from "@/components/NewIncidentForm";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);

  const handleAddIncident = (newIncident: Omit<Incident, "id" | "reported_at">) => {
    const newId = Math.max(0, ...incidents.map(inc => inc.id)) + 1;
    const now = new Date().toISOString();
    
    const incidentToAdd: Incident = {
      ...newIncident,
      id: newId,
      reported_at: now
    };
    
    setIncidents(prevIncidents => [incidentToAdd, ...prevIncidents]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center mr-4">
              <span className="text-white font-bold">AI</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Safety Incident Dashboard</h1>
              <p className="text-gray-500 text-sm">Monitor, track, and report AI safety incidents</p>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8">
          <section>
            <NewIncidentForm onAddIncident={handleAddIncident} />
          </section>
          
          <Separator />
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Incident Log</h2>
            <IncidentList incidents={incidents} />
          </section>
        </div>
      </main>
      
      <footer className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} HumanChain • AI Safety Incident Dashboard</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
