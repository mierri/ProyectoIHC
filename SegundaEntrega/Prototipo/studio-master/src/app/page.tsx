
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import type { Medication } from '@/types/medication';
import AlertScreen from '@/components/medialerta/AlertScreen';
import ConfirmationScreen from '@/components/medialerta/ConfirmationScreen';
import ProgressScreen from '@/components/medialerta/ProgressScreen';
import CallHelpScreen from '@/components/medialerta/CallHelpScreen';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Step = 'alert' | 'confirmation' | 'progress' | 'callHelp';

const mockMedications: Medication[] = [
  { id: '1', name: 'Lisinopril', presentation: 'Tableta 5 mg', dose: '1 tableta cada 24 horas', instructions: 'Tomar con agua, preferentemente a la misma hora todos los días.', imageSrc: '/images/lisinopril.png', time: '08:00 AM' },
  { id: '2', name: 'Metformina', presentation: 'Tableta 500 mg', dose: '1 tableta con el desayuno', instructions: 'Tomar con alimentos para reducir malestar estomacal.', imageSrc: '/images/metformin.png', time: '08:30 AM' },
  { id: '3', name: 'Amoxicilina Jarabe', presentation: 'Suspensión 5ml', dose: 'Tomar 5ml cada 8 horas', instructions: 'Agitar bien antes de usar. Conservar en refrigeración.', imageSrc: '/images/amoxicillin_syrup.png', time: '10:00 AM' },
  { id: '4', name: 'Atorvastatina', presentation: 'Tableta 20mg', dose: '1 tableta por la noche', instructions: 'Tomar antes de dormir. Evitar jugo de toronja.', imageSrc: '/images/atorvastatin.png', time: '09:00 PM' },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>('alert');
  const [currentMedicationIndex, setCurrentMedicationIndex] = useState(0);
  const [medicationToTake, setMedicationToTake] = useState<Medication | null>(null);
  const [progressData, setProgressData] = useState({ taken: 0, totalScheduled: mockMedications.length });
  const [lastAction, setLastAction] = useState<'confirmed' | 'skipped' | 'help_requested'>('confirmed');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getNextMedication = useCallback(() => {
    if (mockMedications.length === 0) return null;
    const nextIndex = currentMedicationIndex % mockMedications.length;
    return mockMedications[nextIndex];
  }, [currentMedicationIndex]);

  useEffect(() => {
    if (currentStep === 'alert' && isClient) {
      const nextMed = getNextMedication();
      setMedicationToTake(nextMed);
    }
  }, [currentStep, getNextMedication, isClient]);

  const handleProceedToConfirmation = () => {
    if (medicationToTake) {
      setCurrentStep('confirmation');
    } else {
      setCurrentMedicationIndex(0);
      setProgressData({ taken: 0, totalScheduled: mockMedications.length });
      setCurrentStep('alert'); 
    }
  };

  const handleConfirmMedication = () => {
    setProgressData(prev => ({ ...prev, taken: prev.taken + 1 }));
    setLastAction('confirmed');
    setCurrentStep('progress');
  };
  
  const handleSkipMedication = () => {
    // This function is called from ConfirmationScreen when "No, no es este / Pedir Ayuda" is clicked.
    // It should lead to the help screen.
    setCurrentStep('callHelp');
  };

  const handleContactAttempted = () => {
    setLastAction('help_requested'); 
    setCurrentStep('progress');
  };

  const handleBackFromCallHelp = () => {
    // Navigates back to the confirmation screen for the current medication
    setCurrentStep('confirmation'); 
  };


  const handleDoneProgress = () => {
    setCurrentMedicationIndex(prev => (prev + 1));
    if (currentMedicationIndex + 1 >= mockMedications.length && mockMedications.length > 0) {
       setCurrentMedicationIndex(0); 
       setProgressData({ taken: 0, totalScheduled: mockMedications.length });
    }
    setCurrentStep('alert');
  };

  if (!isClient) {
    return null; 
  }

  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <header className="w-full bg-sky-300 p-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <Button variant="ghost" size="icon" className="text-slate-700">
          <Menu className="h-7 w-7" />
          <span className="sr-only">Menu</span>
        </Button>
        <div className="flex items-center space-x-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-teal-700">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 12H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xl font-semibold text-slate-700">MediAlerta</span>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4 pt-6 pb-16 sm:pt-8">
        <div className="w-full max-w-md mx-auto">
          {currentStep === 'alert' && medicationToTake && (
            <AlertScreen medication={medicationToTake} onProceed={handleProceedToConfirmation} />
          )}
          {currentStep === 'alert' && !medicationToTake && (
             <AlertScreen medication={null} onProceed={() => { 
                setCurrentMedicationIndex(0);
                setProgressData({ taken: 0, totalScheduled: mockMedications.length });
                setCurrentStep('alert');
              }} />
          )}
          {currentStep === 'confirmation' && medicationToTake && (
            <ConfirmationScreen
              medication={medicationToTake}
              onConfirm={handleConfirmMedication}
              onSkip={handleSkipMedication} 
            />
          )}
          {currentStep === 'progress' && (
            <ProgressScreen
              takenCount={progressData.taken}
              totalCount={progressData.totalScheduled}
              onDone={handleDoneProgress}
              lastAction={lastAction}
            />
          )}
          {currentStep === 'callHelp' && (
            <CallHelpScreen
              onCallFamily={handleContactAttempted}
              onCallDoctor={handleContactAttempted}
              onBack={handleBackFromCallHelp}
            />
          )}
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 h-10 bg-sky-300 z-50 shadow-up">
        {/* Footer content can be added here if needed */}
      </footer>
    </div>
  );
}
