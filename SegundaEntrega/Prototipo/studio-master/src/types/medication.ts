export interface Medication {
  id: string;
  name: string;
  presentation: string; // e.g., "Tableta 5 mg"
  dose: string;        // e.g., "1 tableta cada 24 horas"
  instructions: string;
  imageSrc: string; // Path to the local image, e.g., /images/medication.jpg
  time: string; // Reminder time, e.g., "08:00 AM"
}
