
"use client";

import type { Medication } from "@/types/medication";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


interface ConfirmationScreenProps {
  medication: Medication;
  onConfirm: () => void;
  onSkip: () => void; 
}

export default function ConfirmationScreen({ medication, onConfirm, onSkip }: ConfirmationScreenProps) {
  return (
    <Card className="w-full max-w-lg mx-auto shadow-2xl rounded-xl overflow-hidden">
      <CardHeader className="p-0 relative aspect-[4/3] sm:aspect-video w-full">
        <Image
          src={medication.imageSrc} // Use local image path
          alt={`Imagen de ${medication.name}`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg" // Apply rounding to top if image is part of header
          priority 
        />
      </CardHeader>
      
      <CardContent className="p-4 sm:p-6 space-y-3 text-center bg-card">
        <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
          ¿Es este tu medicamento?
        </CardTitle>
        
        <div className="text-left space-y-1 text-sm sm:text-base text-foreground">
          <p><strong className="font-semibold text-primary">Nombre:</strong> {medication.name}</p>
          <p><strong className="font-semibold text-primary">Presentación:</strong> {medication.presentation}</p>
          <p><strong className="font-semibold text-primary">Dosis:</strong> {medication.dose}</p>
          <p><strong className="font-semibold text-primary">Prescripción:</strong> {medication.instructions}</p>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6 bg-card border-t">
        <Button
          size="lg"
          className="w-full text-base sm:text-lg font-semibold py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-md"
          onClick={onConfirm}
        >
          Sí, es este
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-full text-base sm:text-lg font-semibold py-3 border-destructive text-destructive hover:bg-destructive/10 rounded-lg shadow-md"
          onClick={onSkip} 
        >
          No / Pedir Ayuda
        </Button>
      </CardFooter>
    </Card>
  );
}
