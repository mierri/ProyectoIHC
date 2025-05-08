
import type { Medication } from "@/types/medication";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlarmClock, Bell } from "lucide-react"; 

interface AlertScreenProps {
  medication: Medication | null;
  onProceed: () => void;
}

export default function AlertScreen({ medication, onProceed }: AlertScreenProps) {
  if (!medication) {
    return (
      <Card className="w-full shadow-xl rounded-lg">
        <CardHeader className="p-6">
          <CardTitle className="text-subheader text-center">
            <AlarmClock className="mx-auto h-16 w-16 text-primary mb-4" />
            No hay recordatorios pendientes
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <p className="text-body-md text-center text-muted-foreground">
            ¡Estás al día con tus medicamentos!
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full shadow-xl rounded-lg overflow-hidden">
      <CardHeader className="items-center bg-destructive text-destructive-foreground p-6 rounded-t-lg">
        <Bell className="h-20 w-20 text-yellow-400 mb-3" />
        <CardTitle className="text-display font-bold text-center text-destructive-foreground">
          Hora de la medicación
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4 text-center">
        <p className="text-header font-bold text-foreground">{medication.time}</p>
        
        {/* Display current medication */}
        <div className="mb-4">
          <p className="text-subheader font-semibold text-primary">{medication.name}</p>
          <p className="text-body-lg text-foreground">{medication.dose}</p>
        </div>

        {/* Placeholder for next medication - this logic might need adjustment based on how you want to display multiple meds */}
        {/* For now, this part is commented out as the image shows only one primary medication being alerted at a time. 
            If multiple medications are due at the exact same time and need to be listed in the alert, 
            the component props and rendering logic would need to be adjusted.
        */}
        {/* 
        <div className="opacity-70">
          <p className="text-body-md font-semibold text-primary">Lisinopril 5mg</p>
          <p className="text-body-sm text-foreground">Tomar una tableta</p>
        </div> 
        */}

      </CardContent>
      <CardFooter className="flex justify-center p-6 pt-4">
        <Button
          size="lg"
          className="text-xl font-semibold px-12 py-6 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-lg w-full max-w-xs sm:max-w-sm"
          onClick={onProceed}
        >
          ¡Listo!
        </Button>
      </CardFooter>
    </Card>
  );
}
