
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, TrendingUp, AlertTriangle } from "lucide-react"; // Added AlertTriangle for help_requested
import React from "react";

interface ProgressScreenProps {
  takenCount: number;
  totalCount: number;
  onDone: () => void;
  lastAction: 'confirmed' | 'skipped' | 'help_requested'; // Added 'help_requested'
}

export default function ProgressScreen({ takenCount, totalCount, onDone, lastAction }: ProgressScreenProps) {
  const progressPercentage = totalCount > 0 ? (takenCount / totalCount) * 100 : 0;

  const feedbackMessages = {
    confirmed: {
      title: "¡Medicamento Registrado!",
      description: "¡Excelente! Has tomado tu medicamento.",
      icon: <CheckCircle2 className="h-20 w-20 text-green-500 mb-4" />,
    },
    skipped: {
      title: "Medicamento Omitido",
      description: "Recuerda la importancia de seguir tu tratamiento. Si tienes dudas, consulta a tu médico.",
      icon: <TrendingUp className="h-20 w-20 text-orange-500 mb-4" />,
    },
    help_requested: { // Message for when help was requested
      title: "Ayuda Solicitada",
      description: "Se ha notificado la solicitud de ayuda. Recuerda que tu salud es importante.",
      icon: <AlertTriangle className="h-20 w-20 text-yellow-500 mb-4" />,
    },
  };
  
  // If lastAction is 'help_requested' but we don't have a specific message for it yet,
  // we can fall back to 'skipped' or provide a generic one.
  // For now, page.tsx maps help_requested scenarios to 'skipped' for UI simplicity.
  // If 'help_requested' is passed directly, this component can handle it.
  const currentFeedback = feedbackMessages[lastAction] || feedbackMessages.skipped;


  return (
    <Card className="w-full shadow-xl">
      <CardHeader className="items-center">
        {currentFeedback.icon}
        <CardTitle className="text-header text-center">{currentFeedback.title}</CardTitle>
        <CardDescription className="text-body-md text-center pt-2">
          {currentFeedback.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-body-md mb-2">Tu progreso de hoy:</p>
          <Progress value={progressPercentage} className="w-full h-4" />
          <p className="text-body-sm text-muted-foreground mt-2">
            Has tomado {takenCount} de {totalCount} medicamentos programados.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pt-6">
        <Button size="lg" className="text-lg px-8 py-6" onClick={onDone}>
          Entendido
        </Button>
      </CardFooter>
    </Card>
  );
}

