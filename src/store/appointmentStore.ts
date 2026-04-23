import { create } from 'zustand';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  fee: number;
  available: boolean;
  image: string;
  bio: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  date: string;
  slot: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface AppointmentStore {
  doctors: Doctor[];
  appointments: Appointment[];
  bookAppointment: (doctorId: string, doctorName: string, date: string, slot: string) => void;
  cancelAppointment: (id: string) => void;
}

const mockDoctors: Doctor[] = [
  { id: '1', name: 'Dr. Sarah Chen', specialty: 'Cardiology', rating: 4.9, reviews: 248, fee: 120, available: true, image: 'https://i.pravatar.cc/150?img=47', bio: 'Board-certified cardiologist with 12 years of experience in heart disease prevention and treatment.' },
  { id: '2', name: 'Dr. James Miller', specialty: 'Dermatology', rating: 4.7, reviews: 185, fee: 95, available: true, image: 'https://i.pravatar.cc/150?img=12', bio: 'Specialist in medical and cosmetic dermatology, skin cancer screening, and chronic skin conditions.' },
  { id: '3', name: 'Dr. Priya Patel', specialty: 'Pediatrics', rating: 4.8, reviews: 312, fee: 85, available: false, image: 'https://i.pravatar.cc/150?img=45', bio: 'Compassionate pediatrician dedicated to preventive care and child development across all ages.' },
  { id: '4', name: 'Dr. Robert Kim', specialty: 'Orthopedics', rating: 4.6, reviews: 156, fee: 140, available: true, image: 'https://i.pravatar.cc/150?img=33', bio: 'Sports medicine and orthopedic surgeon specializing in joint replacement and injury rehabilitation.' },
];

export const useAppointmentStore = create<AppointmentStore>((set) => ({
  doctors: mockDoctors,
  appointments: [],
  bookAppointment: (doctorId, doctorName, date, slot) =>
    set((state) => ({
      appointments: [
        ...state.appointments,
        { id: Date.now().toString(), doctorId, doctorName, date, slot, status: 'confirmed' },
      ],
    })),
  cancelAppointment: (id) =>
    set((state) => ({
      appointments: state.appointments.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a)),
    })),
}));
