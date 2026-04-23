import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import { useAppointmentStore } from '../store/appointmentStore';

const SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

export default function BookingScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { doctors, bookAppointment } = useAppointmentStore();
  const doctor = doctors.find((d) => d.id === id);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  if (!doctor) return null;

  const handleBook = () => {
    if (!selectedDate || !selectedSlot) {
      Alert.alert('Missing info', 'Please select a date and time slot.');
      return;
    }
    bookAppointment(doctor.id, doctor.name, selectedDate, selectedSlot);
    Alert.alert('Success', 'Appointment confirmed!', [{ text: 'OK', onPress: () => router.push('/history') }]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <Text style={styles.title}>Book with {doctor.name}</Text>
      <Text style={styles.subtitle}>{doctor.specialty}</Text>

      <Text style={styles.sectionLabel}>Select Date</Text>
      <Calendar
        minDate={new Date().toISOString().split('T')[0]}
        onDayPress={(day: { dateString: string }) => setSelectedDate(day.dateString)}
        markedDates={{ [selectedDate]: { selected: true, selectedColor: '#2563EB' } }}
        style={styles.calendar}
      />

      <Text style={styles.sectionLabel}>Select Time Slot</Text>
      <View style={styles.slotsGrid}>
        {SLOTS.map((slot) => (
          <TouchableOpacity
            key={slot}
            style={[styles.slot, selectedSlot === slot && styles.slotSelected]}
            onPress={() => setSelectedSlot(slot)}
          >
            <Text style={[styles.slotText, selectedSlot === slot && styles.slotTextSelected]}>{slot}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, (!selectedDate || !selectedSlot) && styles.buttonDisabled]}
        onPress={handleBook}
        disabled={!selectedDate || !selectedSlot}
      >
        <Text style={styles.buttonText}>Confirm Booking - ${doctor.fee}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  title: { fontSize: 22, fontWeight: '700', color: '#0F172A' },
  subtitle: { color: '#64748B', marginBottom: 20 },
  sectionLabel: { fontSize: 16, fontWeight: '600', color: '#0F172A', marginBottom: 10, marginTop: 20 },
  calendar: { borderRadius: 16, overflow: 'hidden' },
  slotsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 4 },
  slot: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10, borderWidth: 1.5, borderColor: '#CBD5E1', backgroundColor: '#FFF' },
  slotSelected: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  slotText: { color: '#475569', fontWeight: '500' },
  slotTextSelected: { color: '#FFF' },
  button: { backgroundColor: '#2563EB', padding: 18, borderRadius: 14, alignItems: 'center', marginTop: 30 },
  buttonDisabled: { backgroundColor: '#94A3B8' },
  buttonText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
});
