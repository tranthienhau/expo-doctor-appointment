import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppointmentStore, Doctor } from '../store/appointmentStore';

export default function DoctorListScreen() {
  const router = useRouter();
  const doctors = useAppointmentStore((s) => s.doctors);
  const [query, setQuery] = useState('');

  const filtered = doctors.filter(
    (d) => d.name.toLowerCase().includes(query.toLowerCase()) || d.specialty.toLowerCase().includes(query.toLowerCase())
  );

  const renderDoctor = ({ item: doc }: { item: Doctor }) => (
    <TouchableOpacity style={styles.card} onPress={() => router.push(`/doctor/${doc.id}`)}>
      <Image source={{ uri: doc.image }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{doc.name}</Text>
        <Text style={styles.specialty}>{doc.specialty}</Text>
        <View style={styles.row}>
          <Ionicons name="star" size={14} color="#F59E0B" />
          <Text style={styles.rating}> {doc.rating} ({doc.reviews})</Text>
          <View style={styles.spacer} />
          <Text style={styles.fee}>${doc.fee}/visit</Text>
        </View>
      </View>
      {!doc.available && <View style={styles.badge}><Text style={styles.badgeText}>Busy</Text></View>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find a Doctor</Text>
        <TouchableOpacity onPress={() => router.push('/history')}>
          <Ionicons name="calendar-outline" size={24} color="#2563EB" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.search}
        placeholder="Search doctors..."
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filtered}
        keyExtractor={(d) => d.id}
        renderItem={renderDoctor}
        contentContainerStyle={{ padding: 16, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: '700', color: '#0F172A' },
  search: { margin: 16, marginTop: 0, padding: 12, backgroundColor: '#F1F5F9', borderRadius: 12, fontSize: 15 },
  card: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  avatar: { width: 64, height: 64, borderRadius: 32, marginRight: 14 },
  info: { flex: 1 },
  name: { fontWeight: '700', fontSize: 16, color: '#0F172A' },
  specialty: { color: '#64748B', marginTop: 2 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  rating: { fontSize: 12, color: '#475569' },
  spacer: { flex: 1 },
  fee: { color: '#2563EB', fontWeight: '700' },
  badge: { backgroundColor: '#FEE2E2', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  badgeText: { color: '#EF4444', fontSize: 12, fontWeight: '600' },
});
