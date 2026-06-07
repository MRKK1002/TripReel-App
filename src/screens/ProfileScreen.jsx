import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useNavigation,
  useFocusEffect,
  CommonActions,
} from '@react-navigation/native';
import {
  Info,
  FileText,
  LogOut,
  ChevronRight,
  Camera,
  X,
  Check,
  Settings,
  Mail,
  Phone,
  User,
  Edit3,
  MapPin,
  ChevronDown,
  Lock,
  Bell,
} from 'lucide-react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAuth } from '../context/AuthContext';
import { SERVER_URL } from '../services/api';
import AppModal from '../components/AppModal';
import { StatePicker } from './RegisterScreen';
import { COUNTRIES } from './RegisterScreen';
import './../../android/app/src/utils/globalFont.js';

const resolveAvatar = url => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${SERVER_URL}${url}`;
};
const EditProfileSheet = ({ visible, user, onClose, onSaved }) => {
  const { updateProfile, uploadAvatar } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('');
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [statePickerVisible, setStatePickerVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [modal, setModal] = useState({ visible: false });

  const showModal = cfg => setModal({ visible: true, ...cfg });
  const closeModal = () => setModal(m => ({ ...m, visible: false }));

  React.useEffect(() => {
    if (visible) {
      setName(user?.name || '');
      setEmail(user?.email || '');
      setCountry(user?.country || 'India');
      setState(user?.state || '');
    }
  }, [visible, user]);

  const handlePickAvatar = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.75,
      maxWidth: 512,
      maxHeight: 512,
    });
    if (result.didCancel || !result.assets?.length) return;

    const asset = result.assets[0];
    const formData = new FormData();
    formData.append('avatar', {
      uri: asset.uri,
      type: asset.type || 'image/jpeg',
      name: asset.fileName || 'avatar.jpg',
    });

    setUploading(true);
    try {
      await uploadAvatar(formData);
      onSaved();
    } catch (err) {
      showModal({
        variant: 'error',
        title: 'Upload failed',
        message: err?.response?.data?.message || 'Could not upload image.',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      showModal({
        variant: 'error',
        title: 'Required',
        message: 'Name cannot be empty.',
      });
      return;
    }
    setSaving(true);
    try {
      await updateProfile({
        name: name.trim(),
        email: email.trim(),
        state,
        country,
      });
      onSaved();
      onClose();
    } catch (err) {
      showModal({
        variant: 'error',
        title: 'Save failed',
        message: err?.response?.data?.message || 'Could not save changes.',
      });
    } finally {
      setSaving(false);
    }
  };

  const avatarUri = resolveAvatar(user?.avatar);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable style={sheet.backdrop} onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ width: '100%' }}
        >
          <Pressable style={sheet.card} onPress={() => {}}>
            <View style={sheet.handle} />
            <View style={sheet.sheetHeader}>
              <Text style={sheet.sheetTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={onClose} hitSlop={12}>
                <X size={22} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Avatar */}
            <View style={sheet.avatarRow}>
              <View style={sheet.avatarWrap}>
                {avatarUri ? (
                  <Image
                    source={{ uri: avatarUri }}
                    style={sheet.avatarImg}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={[sheet.avatarImg, sheet.avatarPlaceholder]}>
                    <User size={36} color="#9CA3AF" />
                  </View>
                )}
                <TouchableOpacity
                  style={sheet.cameraBadge}
                  onPress={handlePickAvatar}
                  disabled={uploading}
                  activeOpacity={0.8}
                >
                  {uploading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Camera size={14} color="#fff" />
                  )}
                </TouchableOpacity>
              </View>
              <Text style={sheet.changePhotoText}>
                {uploading ? 'Uploading...' : 'Tap camera to change photo'}
              </Text>
            </View>

            {/* Full Name */}
            <Text style={sheet.label}>Full Name</Text>
            <View style={sheet.inputRow}>
              <User size={16} color="#9CA3AF" />
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                placeholderTextColor="#9CA3AF"
                style={sheet.input}
              />
            </View>

            {/* Email */}
            <Text style={sheet.label}>Email</Text>
            <View style={sheet.inputRow}>
              <Mail size={16} color="#9CA3AF" />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="your@email.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                style={sheet.input}
              />
            </View>

            {/* Phone — read only */}
            <Text style={sheet.label}>
              Phone{' '}
              <Text style={{ color: '#9CA3AF', fontSize: 11 }}>
                (cannot be changed)
              </Text>
            </Text>
            <View
              style={[
                sheet.inputRow,
                { backgroundColor: '#F8FAFC', borderColor: '#F1F5F9' },
              ]}
            >
              <Phone size={16} color="#CBD5E1" />
              <Text style={[sheet.input, { color: '#94A3B8' }]}>
                {user?.phone ? `+91 ${user.phone}` : 'Not set'}
              </Text>
              <Lock size={14} color="#CBD5E1" />
            </View>

            {/* Country */}
            <Text style={sheet.label}>Country</Text>
            <TouchableOpacity
              onPress={() => setCountryPickerVisible(true)}
              style={[sheet.inputRow, { justifyContent: 'space-between' }]}
              activeOpacity={0.8}
            >
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
              >
                <MapPin size={16} color="#9CA3AF" />
                <Text
                  style={[
                    sheet.input,
                    { color: country ? '#111827' : '#9CA3AF' },
                  ]}
                >
                  {country || 'Select country'}
                </Text>
              </View>
              <ChevronDown size={16} color="#9CA3AF" />
            </TouchableOpacity>

            {/* State — only for India */}
            {country === 'India' && (
              <>
                <Text style={sheet.label}>Home State</Text>
                <TouchableOpacity
                  onPress={() => setStatePickerVisible(true)}
                  style={[sheet.inputRow, { justifyContent: 'space-between' }]}
                  activeOpacity={0.8}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <MapPin size={16} color="#9CA3AF" />
                    <Text
                      style={[
                        sheet.input,
                        { color: state ? '#111827' : '#9CA3AF' },
                      ]}
                    >
                      {state || 'Select state'}
                    </Text>
                  </View>
                  <ChevronDown size={16} color="#9CA3AF" />
                </TouchableOpacity>
              </>
            )}

            {/* Save */}
            <TouchableOpacity
              onPress={handleSave}
              disabled={saving}
              style={[sheet.saveBtn, saving && { opacity: 0.7 }]}
              activeOpacity={0.85}
            >
              {saving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Check size={18} color="#fff" strokeWidth={2.5} />
                  <Text style={sheet.saveBtnText}>Save Changes</Text>
                </>
              )}
            </TouchableOpacity>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>

      <StatePicker
        visible={statePickerVisible}
        selected={state}
        onSelect={setState}
        onClose={() => setStatePickerVisible(false)}
      />
      <StatePicker
        visible={countryPickerVisible}
        selected={country}
        onSelect={val => {
          setCountry(val);
          if (val !== 'India') setState('');
        }}
        onClose={() => setCountryPickerVisible(false)}
        items={COUNTRIES}
        title="Select Your Country"
      />
      <AppModal {...modal} onClose={closeModal} />
    </Modal>
  );
};
const AccountSettingsSheet = ({ visible, user, onClose }) => {
  const rows = [
    { label: 'Full Name', value: user?.name || '—', icon: User },
    { label: 'Email', value: user?.email || '—', icon: Mail },
    {
      label: 'Phone',
      value: user?.phone ? `+91 ${user.phone}` : '—',
      icon: Phone,
    },
    { label: 'Home State', value: user?.state || '—', icon: MapPin },
    { label: 'Country', value: user?.country || 'India', icon: MapPin },
    {
      label: 'Account Status',
      value: user?.status || 'Active',
      icon: Settings,
    },
    {
      label: 'Member Since',
      value: user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : '—',
      icon: Info,
    },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable style={sheet.backdrop} onPress={onClose}>
        <Pressable style={sheet.card} onPress={() => {}}>
          <View style={sheet.handle} />
          <View style={sheet.sheetHeader}>
            <Text style={sheet.sheetTitle}>Account Settings</Text>
            <TouchableOpacity onPress={onClose} hitSlop={12}>
              <X size={22} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 18 }}>
            Your account information
          </Text>
          {rows.map(({ label, value, icon: Icon }) => (
            <View key={label} style={acct.row}>
              <View style={acct.iconBox}>
                <Icon size={16} color="#1F8A70" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={acct.label}>{label}</Text>
                <Text style={acct.value} numberOfLines={1}>
                  {value}
                </Text>
              </View>
            </View>
          ))}
          <TouchableOpacity
            onPress={onClose}
            style={[
              sheet.saveBtn,
              { backgroundColor: '#F1F5F9', marginTop: 8 },
            ]}
            activeOpacity={0.85}
          >
            <Text style={[sheet.saveBtnText, { color: '#374151' }]}>Close</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

// ─── Main Profile Screen ───────────────────────────────────────────────────
const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, logout, refreshUser } = useAuth();

  const [editVisible, setEditVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [modal, setModal] = useState({ visible: false });
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setRefreshing(true);
      refreshUser().finally(() => setRefreshing(false));
    }, []),
  );

  const showModal = cfg => setModal({ visible: true, ...cfg });
  const closeModal = () => setModal(m => ({ ...m, visible: false }));

  const handleLogout = () => {
    showModal({
      variant: 'error',
      title: 'Log out?',
      message: 'You will need to sign in again to access your account.',
      primaryLabel: 'Log out',
      onPrimaryPress: () => {
        // Close modal and navigate first (synchronous)
        closeModal();
        // Clear session in background — storage clear is fire-and-forget here
        // because navigation already moves away from authenticated screens
        logout();
        // Reset entire stack so back button can't return to home
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
          }),
        );
      },
      secondaryLabel: 'Cancel',
      onSecondaryPress: closeModal,
    });
  };

  const menuItems = [
    {
      id: 'settings',
      title: 'Account Settings',
      description: 'Update account details',
      icon: Settings,
      onPress: () => setSettingsVisible(true),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Your alerts & updates',
      icon: Bell,
      onPress: () => navigation.navigate('Notification'),
    },
    {
      id: 'help',
      title: 'Get Help',
      description: 'Support & FAQs',
      icon: Info,
      onPress: () => navigation.navigate('GetHelp'),
    },
    {
      id: 'privacy',
      title: 'Privacy',
      description: 'Privacy policy & data',
      icon: FileText,
      onPress: () => navigation.navigate('Privacy'),
    },
    {
      id: 'payment',
      title: 'Payment Help',
      description: 'Payment related issues',
      icon: FileText,
      onPress: () => navigation.navigate('PaymentHelp'),
    },
  ];

  const avatarUri = resolveAvatar(user?.avatar);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            {refreshing && !user?.avatar ? (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <ActivityIndicator color="#1F8A70" />
              </View>
            ) : avatarUri ? (
              <Image
                source={{ uri: avatarUri }}
                style={styles.avatar}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <User size={40} color="#9CA3AF" />
              </View>
            )}
          </View>

          <Text style={styles.name}>{user?.name || 'Your Name'}</Text>
          <Text style={styles.sub}>
            {user?.state && user?.country
              ? `${user.state}, ${user.country}`
              : user?.state
              ? user.state
              : user?.country
              ? user.country
              : ''}
          </Text>

          <TouchableOpacity
            onPress={() => setEditVisible(true)}
            style={styles.editButton}
            activeOpacity={0.7}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.menuRow}
                onPress={item.onPress}
                activeOpacity={0.7}
              >
                <View style={styles.iconBox}>
                  <Icon size={20} color="#374151" />
                </View>
                <View style={styles.menuText}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuDesc}>{item.description}</Text>
                </View>
                <ChevronRight size={18} color="#9CA3AF" />
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            style={[styles.menuRow, { marginTop: 6 }]}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <View style={styles.iconBox}>
              <LogOut size={20} color="#111827" />
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>Logout</Text>
            </View>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <EditProfileSheet
        visible={editVisible}
        user={user}
        onClose={() => setEditVisible(false)}
        onSaved={() => {
          refreshUser();
          setEditVisible(false);
        }}
      />
      <AccountSettingsSheet
        visible={settingsVisible}
        user={user}
        onClose={() => setSettingsVisible(false)}
      />
      <AppModal {...modal} onClose={closeModal} />
    </SafeAreaView>
  );
};

// ─── Styles ────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingBottom: 40 },
  header: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#111827' },
  profileSection: {
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
  },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 96, height: 96, borderRadius: 48 },
  avatarPlaceholder: {
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { marginTop: 14, fontSize: 22, fontWeight: '700', color: '#111827' },
  sub: { marginTop: 4, fontSize: 14, color: '#9CA3AF', textAlign: 'center' },
  editButton: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  editButtonText: { fontSize: 14, fontWeight: '600', color: '#111827' },
  menuSection: { marginTop: 28, paddingHorizontal: 16, gap: 10 },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: { flex: 1, marginLeft: 12 },
  menuTitle: { fontSize: 15, fontWeight: '600', color: '#111827' },
  menuDesc: { fontSize: 12, color: '#6B7280', marginTop: 2 },
});

const sheet = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.45)',
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E2E8F0',
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sheetTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  avatarRow: { alignItems: 'center', marginBottom: 22 },
  avatarWrap: { position: 'relative', width: 80, height: 80 },
  avatarImg: { width: 80, height: 80, borderRadius: 40 },
  avatarPlaceholder: {
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#1F8A70',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  changePhotoText: { marginTop: 8, fontSize: 12, color: '#9CA3AF' },
  label: { fontSize: 12, fontWeight: '600', color: '#374151', marginBottom: 5 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 14,
    backgroundColor: '#F9FAFB',
    gap: 8,
  },
  input: { flex: 1, fontSize: 14, color: '#111827' },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F8A70',
    borderRadius: 14,
    paddingVertical: 15,
    marginTop: 6,
    gap: 8,
  },
  saveBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});

const acct = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 12,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#E6F4EF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontSize: 11, color: '#9CA3AF', fontWeight: '500' },
  value: { fontSize: 14, color: '#111827', fontWeight: '600', marginTop: 2 },
});

export default ProfileScreen;
