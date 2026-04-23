import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppointmentStore, Appointment } from '../store/appointmentStore';

const statusColor: Record<string, string> = {
  confirmed: '#16A34A',
  pending: '#D97706',
  cancelled: '#DC2626',
};

export default function AppointmentHistoryScreen() {
  const { appointments, cancelAppointment } = useAppointmentStore();

  if (appointments.length === 0) {
    return (
      <View style={styles.empty}>
        <Ionicons name="calendar-outline" size={64} color="#CBD5E1" />
        <Text style={styles.emptyText}>No appointments yet</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Appointment }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconWrap}>
          <Ionicons name="medical" size={20} color="#2563EB" />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.doctorName}>{item.doctorName}</Text>
          <Text style={styles.dateSlot}>{item.date} at {item.slot}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${statusColor[item.status]}20` }]}>
          <Text style={[styles.statusText, { color: statusColor[item.status] }]}>{item.status}</Text>
        </View>
      </View>
      {item.status === 'confirmed' && (
        <TouchableOpacity style={styles.cancelBtn} onPress={() => cancelAppointment(item.id)}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Appointments</Text>
      <FlatList
        data={appointments}
        keyExtractor={(a) => a.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  title: { fontSize: 22, fontWeight: '700', color: '#0F172A', padding: 20, paddingTop: 60 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  emptyText: { color: '#94A3B8', fontSize: 16 },
  card: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  iconWrap: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  cardInfo: { flex: 1 },
  doctorName: { fontWeight: '700', color: '#0F172A' },
  dateSlot: { color: '#64748B', fontSize: 13, marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 12, fontWeight: '600', textTransform: 'capitalize' },
  cancelBtn: { marginTop: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#FCA5A5', alignItems: 'center' },
  cancelText: { color: '#EF4444', fontWeight: '600' },
});
