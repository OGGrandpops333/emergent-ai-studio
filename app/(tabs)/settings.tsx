import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

type SettingRowProps = {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  iconColor: string;
  label: string;
  value?: string;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (value: boolean) => void;
  onPress?: () => void;
  isDark: boolean;
};

function SettingRow({
  icon,
  iconColor,
  label,
  value,
  toggle,
  toggleValue,
  onToggle,
  onPress,
  isDark,
}: SettingRowProps) {
  return (
    <TouchableOpacity
      style={[styles.settingRow, { backgroundColor: isDark ? '#1a1d27' : '#f8f9fa' }]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress && !toggle}
    >
      <View style={[styles.settingIcon, { backgroundColor: iconColor + '20' }]}>
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>
      <Text style={[styles.settingLabel, { color: isDark ? '#ffffff' : '#0f1117' }]}>{label}</Text>
      {value ? (
        <Text style={[styles.settingValue, { color: isDark ? '#9ca3af' : '#6b7280' }]}>{value}</Text>
      ) : null}
      {toggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ false: '#374151', true: '#6366f1' }}
          thumbColor={'#ffffff'}
        />
      ) : onPress ? (
        <Ionicons name="chevron-forward" size={18} color={isDark ? '#9ca3af' : '#9ca3af'} />
      ) : null}
    </TouchableOpacity>
  );
}

type SettingsSectionProps = {
  title: string;
  children: React.ReactNode;
  isDark: boolean;
};

function SettingsSection({ title, children, isDark }: SettingsSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
}

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [streamingEnabled, setStreamingEnabled] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [saveHistory, setSaveHistory] = useState(true);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isDark ? '#0f1117' : '#ffffff' }]}
      contentContainerStyle={styles.content}
    >
      <SettingsSection title="AI CONFIGURATION" isDark={isDark}>
        <SettingRow
          icon="key-outline"
          iconColor="#6366f1"
          label="API Keys"
          onPress={() => {}}
          isDark={isDark}
        />
        <View style={styles.separator} />
        <SettingRow
          icon="server-outline"
          iconColor="#10b981"
          label="Default Model"
          value="GPT-4o"
          onPress={() => {}}
          isDark={isDark}
        />
        <View style={styles.separator} />
        <SettingRow
          icon="thermometer-outline"
          iconColor="#f59e0b"
          label="Temperature"
          value="0.7"
          onPress={() => {}}
          isDark={isDark}
        />
        <View style={styles.separator} />
        <SettingRow
          icon="radio-outline"
          iconColor="#8b5cf6"
          label="Streaming Responses"
          toggle
          toggleValue={streamingEnabled}
          onToggle={setStreamingEnabled}
          isDark={isDark}
        />
      </SettingsSection>

      <SettingsSection title="APPEARANCE" isDark={isDark}>
        <SettingRow
          icon="contrast-outline"
          iconColor="#6366f1"
          label="Theme"
          value={isDark ? 'Dark' : 'Light'}
          onPress={() => {}}
          isDark={isDark}
        />
        <View style={styles.separator} />
        <SettingRow
          icon="text-outline"
          iconColor="#10b981"
          label="Font Size"
          value="Medium"
          onPress={() => {}}
          isDark={isDark}
        />
      </SettingsSection>

      <SettingsSection title="PRIVACY & DATA" isDark={isDark}>
        <SettingRow
          icon="save-outline"
          iconColor="#f59e0b"
          label="Save Chat History"
          toggle
          toggleValue={saveHistory}
          onToggle={setSaveHistory}
          isDark={isDark}
        />
        <View style={styles.separator} />
        <SettingRow
          icon="analytics-outline"
          iconColor="#ec4899"
          label="Usage Analytics"
          toggle
          toggleValue={analyticsEnabled}
          onToggle={setAnalyticsEnabled}
          isDark={isDark}
        />
        <View style={styles.separator} />
        <SettingRow
          icon="trash-outline"
          iconColor="#ef4444"
          label="Clear All Data"
          onPress={() => {}}
          isDark={isDark}
        />
      </SettingsSection>

      <SettingsSection title="NOTIFICATIONS" isDark={isDark}>
        <SettingRow
          icon="notifications-outline"
          iconColor="#6366f1"
          label="Push Notifications"
          toggle
          toggleValue={notificationsEnabled}
          onToggle={setNotificationsEnabled}
          isDark={isDark}
        />
      </SettingsSection>

      <SettingsSection title="ABOUT" isDark={isDark}>
        <SettingRow
          icon="information-circle-outline"
          iconColor="#6b7280"
          label="Version"
          value="1.0.0"
          isDark={isDark}
        />
        <View style={styles.separator} />
        <SettingRow
          icon="document-text-outline"
          iconColor="#6b7280"
          label="Privacy Policy"
          onPress={() => {}}
          isDark={isDark}
        />
        <View style={styles.separator} />
        <SettingRow
          icon="shield-checkmark-outline"
          iconColor="#6b7280"
          label="Terms of Service"
          onPress={() => {}}
          isDark={isDark}
        />
      </SettingsSection>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionContent: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 14,
    marginRight: 4,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(156, 163, 175, 0.1)',
    marginLeft: 64,
  },
});
