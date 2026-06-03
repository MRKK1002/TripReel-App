import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  KeyRound,
  Info,
} from 'lucide-react-native';

/**
 * Themed modal used across the app for confirmations, errors, and OTP delivery.
 *
 * Props:
 *  - visible           : boolean
 *  - onClose           : () => void
 *  - variant           : 'info' | 'success' | 'error' | 'otp'
 *  - title             : string
 *  - message           : string                    (ignored in 'otp' variant)
 *  - otpCode           : string                    (only for 'otp' variant)
 *  - primaryLabel      : string  (default: OK)
 *  - onPrimaryPress    : () => void   (defaults to onClose)
 *  - secondaryLabel    : string?
 *  - onSecondaryPress  : () => void?
 */
const AppModal = ({
  visible,
  onClose,
  variant = 'info',
  title,
  message,
  otpCode = '',
  primaryLabel = 'OK',
  onPrimaryPress,
  secondaryLabel,
  onSecondaryPress,
}) => {
  const palette = palettes[variant] || palettes.info;
  const Icon = palette.icon;

  const handlePrimary = onPrimaryPress || onClose;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.card} onPress={() => {}}>
          {/* Icon circle */}
          <View style={[styles.iconWrap, { backgroundColor: palette.iconBg }]}>
            <Icon size={28} color={palette.iconColor} strokeWidth={2.2} />
          </View>

          {/* Title */}
          {title ? <Text style={styles.title}>{title}</Text> : null}

          {/* OTP variant: show the code prominently */}
          {variant === 'otp' && otpCode ? (
            <>
              <Text style={styles.subText}>Your one-time code (dev mode):</Text>
              <View style={styles.otpBox}>
                {otpCode.split('').map((d, i) => (
                  <View key={i} style={styles.otpDigit}>
                    <Text style={styles.otpDigitText}>{d}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.helperText}>
                Tap below to fill it automatically
              </Text>
            </>
          ) : message ? (
            <Text style={styles.message}>{message}</Text>
          ) : null}

          {/* Buttons */}
          <View style={styles.btnRow}>
            {secondaryLabel ? (
              <TouchableOpacity
                onPress={onSecondaryPress || onClose}
                style={[styles.btn, styles.btnSecondary]}
                activeOpacity={0.85}
              >
                <Text style={styles.btnSecondaryText}>{secondaryLabel}</Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              onPress={handlePrimary}
              style={[
                styles.btn,
                { backgroundColor: palette.primary },
                secondaryLabel ? { flex: 1 } : { width: '100%' },
              ]}
              activeOpacity={0.85}
            >
              <Text style={styles.btnPrimaryText}>{primaryLabel}</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const palettes = {
  info: {
    icon: Info,
    iconBg: '#E0F2FE',
    iconColor: '#0284C7',
    primary: '#1F8A70',
  },
  success: {
    icon: CheckCircle2,
    iconBg: '#DCFCE7',
    iconColor: '#16A34A',
    primary: '#1F8A70',
  },
  error: {
    icon: XCircle,
    iconBg: '#FEE2E2',
    iconColor: '#DC2626',
    primary: '#1F8A70',
  },
  otp: {
    icon: KeyRound,
    iconBg: '#E6F4EF',
    iconColor: '#1F8A70',
    primary: '#1F8A70',
  },
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 22,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 10,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 22,
    paddingHorizontal: 4,
  },
  subText: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 12,
  },
  helperText: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 18,
  },
  otpBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 6,
  },
  otpDigit: {
    width: 38,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
  },
  otpDigitText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  btn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSecondary: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  btnSecondaryText: {
    color: '#475569',
    fontSize: 15,
    fontWeight: '700',
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default AppModal;
