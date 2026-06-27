import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Clock } from 'lucide-react-native';

/**
 * Simple JS-only time picker (no native dependency).
 * Stores/returns time as 24h "HH:mm" string.
 *
 * @param {string} value - "HH:mm" or ""
 * @param {function} onChange - called with "HH:mm"
 */
const HOURS = Array.from({ length: 12 }, (_, i) => i + 1); // 1..12
const MINUTES = ['00', '15', '30', '45'];

const to12h = hhmm => {
  if (!hhmm) return null;
  const [h, m] = hhmm.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return { hour12, minute: String(m).padStart(2, '0'), period };
};

const to24h = (hour12, minute, period) => {
  let h = hour12 % 12;
  if (period === 'PM') h += 12;
  return `${String(h).padStart(2, '0')}:${minute}`;
};

const TimePicker = ({ value, onChange, label }) => {
  const [open, setOpen] = useState(false);
  const current = to12h(value);
  const [hour, setHour] = useState(current?.hour12 || 9);
  const [minute, setMinute] = useState(current?.minute || '00');
  const [period, setPeriod] = useState(current?.period || 'AM');

  const display = value
    ? `${current.hour12}:${current.minute} ${current.period}`
    : 'Select time';

  const confirm = () => {
    onChange(to24h(hour, minute, period));
    setOpen(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.field} onPress={() => setOpen(true)}>
        <Clock size={15} color={value ? '#1F8A70' : '#9CA3AF'} />
        <Text style={[styles.fieldText, value && styles.fieldTextActive]}>
          {display}
        </Text>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={styles.sheet}>
            <Text style={styles.title}>{label || 'Select Time'}</Text>
            <View style={styles.cols}>
              {/* Hours */}
              <ScrollView
                style={styles.col}
                showsVerticalScrollIndicator={false}
              >
                {HOURS.map(h => (
                  <TouchableOpacity
                    key={h}
                    onPress={() => setHour(h)}
                    style={[styles.cell, hour === h && styles.cellActive]}
                  >
                    <Text
                      style={[
                        styles.cellText,
                        hour === h && styles.cellTextActive,
                      ]}
                    >
                      {h}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              {/* Minutes */}
              <ScrollView
                style={styles.col}
                showsVerticalScrollIndicator={false}
              >
                {MINUTES.map(m => (
                  <TouchableOpacity
                    key={m}
                    onPress={() => setMinute(m)}
                    style={[styles.cell, minute === m && styles.cellActive]}
                  >
                    <Text
                      style={[
                        styles.cellText,
                        minute === m && styles.cellTextActive,
                      ]}
                    >
                      {m}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              {/* AM/PM */}
              <View style={styles.col}>
                {['AM', 'PM'].map(p => (
                  <TouchableOpacity
                    key={p}
                    onPress={() => setPeriod(p)}
                    style={[styles.cell, period === p && styles.cellActive]}
                  >
                    <Text
                      style={[
                        styles.cellText,
                        period === p && styles.cellTextActive,
                      ]}
                    >
                      {p}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <TouchableOpacity style={styles.confirmBtn} onPress={confirm}>
              <Text style={styles.confirmText}>Set Time</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 9,
    backgroundColor: '#F9FAFB',
  },
  fieldText: { fontSize: 13, color: '#9CA3AF' },
  fieldTextActive: { color: '#065F46', fontWeight: '600' },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  sheet: { backgroundColor: '#fff', borderRadius: 16, padding: 20 },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 16,
  },
  cols: { flexDirection: 'row', height: 160, gap: 8 },
  col: { flex: 1 },
  cell: {
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 4,
  },
  cellActive: { backgroundColor: '#1F8A70' },
  cellText: { fontSize: 15, color: '#374151' },
  cellTextActive: { color: '#fff', fontWeight: '700' },
  confirmBtn: {
    backgroundColor: '#1F8A70',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 16,
  },
  confirmText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});

export default TimePicker;
