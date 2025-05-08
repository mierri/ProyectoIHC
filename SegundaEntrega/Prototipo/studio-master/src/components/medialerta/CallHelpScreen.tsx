
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, User, Stethoscope, ArrowLeft } from 'lucide-react';

interface CallHelpScreenProps {
  onCallFamily: () => void;
  onCallDoctor: () => void;
  onBack: () => void;
}

export default function CallHelpScreen({ onCallFamily, onCallDoctor, onBack }: CallHelpScreenProps) {
  return (
    <Card className="w-full max-w-md mx-auto shadow-xl rounded-lg">
      <CardHeader className="p-6 border-b bg-destructive text-destructive-foreground rounded-t-lg">
        <CardTitle className="text-header text-center flex items-center justify-center">
          <Phone className="mr-3 h-10 w-10" />
          Pedir Ayuda
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        <p className="text-body-md text-center text-muted-foreground mb-6">
          Selecciona una opción para contactar a alguien o pide ayuda directamente.
        </p>
        <Button
          size="lg"
          className="w-full text-xl font-semibold py-6 sm:py-8 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg flex items-center justify-center"
          onClick={onCallFamily}
          aria-label="Llamar a un familiar"
        >
          <User className="mr-3 h-7 w-7" />
          Llamar a Familiar
        </Button>
        <Button
          size="lg"
          className="w-full text-xl font-semibold py-6 sm:py-8 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg flex items-center justify-center"
          onClick={onCallDoctor}
          aria-label="Llamar al médico"
        >
          <Stethoscope className="mr-3 h-7 w-7" />
          Llamar al Médico
        </Button>
      </CardContent>
      <CardFooter className="p-6 border-t mt-2">
        <Button
          variant="outline"
          size="lg"
          className="w-full text-lg font-semibold py-4 rounded-lg shadow-md flex items-center justify-center border-gray-400 hover:bg-gray-100"
          onClick={onBack}
          aria-label="Volver a la pantalla anterior"
        >
          <ArrowLeft className="mr-2 h-6 w-6" />
          Volver
        </Button>
      </CardFooter>
    </Card>
  );
}
