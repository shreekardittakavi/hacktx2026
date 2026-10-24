import { useState } from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radii } from '@/constants/theme';
import { images } from '@/data/mock';

const modes = ['Personal', 'Group Drop', 'Open Stack'];

export default function CreateScreen() {
  const [mode, setMode] = useState('Group Drop');
  const [caption, setCaption] = useState('The night told from all five sides.');
  const [ready, setReady] = useState(false);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          <View style={styles.header}>
            <View>
              <Text style={styles.eyebrow}>MAKE SOMETHING TOGETHER</Text>
              <Text style={styles.title}>Create</Text>
            </View>
            <Pressable onPress={() => setReady(true)} style={styles.nextButton}>
              <Text style={styles.nextButtonText}>Preview</Text>
            </Pressable>
          </View>

          <View style={styles.modeRow}>
            {modes.map((item) => (
              <Pressable
                key={item}
                onPress={() => setMode(item)}
                style={[styles.mode, mode === item && styles.modeActive]}>
                <Text style={[styles.modeText, mode === item && styles.modeTextActive]}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          <ImageBackground imageStyle={styles.previewImage} source={{ uri: images.apartment }} style={styles.preview}>
            <View style={styles.previewScrim} />
            <View style={styles.previewBadge}>
              <Text style={styles.previewBadgeText}>{mode.toUpperCase()}</Text>
            </View>
            <View style={styles.previewCopy}>
              <Text style={styles.previewKicker}>APT 304 · 5 CONTRIBUTORS</Text>
              <Text style={styles.previewTitle}>
                {ready ? 'Ready for the group to approve.' : 'Your shared draft lives here.'}
              </Text>
            </View>
          </ImageBackground>

          <View style={styles.section}>
            <Text style={styles.label}>PUBLISH AS</Text>
            <View style={styles.groupSelector}>
              <View style={styles.groupAvatar}>
                <Text style={styles.groupAvatarText}>304</Text>
              </View>
              <View style={styles.groupCopy}>
                <Text style={styles.groupName}>APT 304</Text>
                <Text style={styles.groupMeta}>Everyone can edit · 3 approvals needed</Text>
              </View>
              <Text style={styles.chevron}>⌄</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>CAPTION</Text>
            <TextInput
              multiline
              onChangeText={setCaption}
              placeholder="Say what happened…"
              placeholderTextColor={colors.subtle}
              style={styles.captionInput}
              value={caption}
            />
          </View>

          <View style={styles.museCard}>
            <View style={styles.museIcon}>
              <Text style={styles.museIconText}>✦</Text>
            </View>
            <View style={styles.museCopy}>
              <Text style={styles.museTitle}>Muse found three more perspectives</Text>
              <Text style={styles.museBody}>
                Add Jonah’s voice note and Maya’s two photos to turn this into a Moment Stack.
              </Text>
            </View>
            <Pressable style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </Pressable>
          </View>

          <Pressable onPress={() => setReady(true)} style={styles.approvalButton}>
            <Text style={styles.approvalButtonText}>
              {ready ? 'Sent to APT 304 ✓' : 'Send to group for approval'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  addButtonText: {
    color: colors.black,
    fontSize: 11,
    fontWeight: '900',
  },
  approvalButton: {
    alignItems: 'center',
    backgroundColor: colors.text,
    borderRadius: radii.pill,
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 16,
  },
  approvalButtonText: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '900',
  },
  captionInput: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.medium,
    borderWidth: 1,
    color: colors.text,
    fontSize: 15,
    minHeight: 92,
    padding: 14,
    textAlignVertical: 'top',
  },
  chevron: {
    color: colors.muted,
    fontSize: 22,
  },
  content: {
    paddingBottom: 100,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1.7,
  },
  groupAvatar: {
    alignItems: 'center',
    backgroundColor: colors.pink,
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  groupAvatarText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '900',
  },
  groupCopy: {
    flex: 1,
  },
  groupMeta: {
    color: colors.muted,
    fontSize: 10,
    marginTop: 3,
  },
  groupName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  groupSelector: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.medium,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 11,
    padding: 12,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  label: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.4,
    marginBottom: 9,
  },
  mode: {
    borderRadius: radii.pill,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  modeActive: {
    backgroundColor: colors.text,
  },
  modeRow: {
    flexDirection: 'row',
    gap: 3,
    paddingBottom: 13,
    paddingHorizontal: 16,
  },
  modeText: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '800',
  },
  modeTextActive: {
    color: colors.black,
  },
  museBody: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },
  museCard: {
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.accent,
    borderRadius: radii.medium,
    borderWidth: 1,
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 18,
    padding: 13,
  },
  museCopy: {
    flex: 1,
    marginHorizontal: 10,
  },
  museIcon: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  museIconText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '900',
  },
  museTitle: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '800',
  },
  nextButton: {
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  nextButtonText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '800',
  },
  page: {
    alignSelf: 'center',
    maxWidth: 560,
    width: '100%',
  },
  preview: {
    height: 390,
    justifyContent: 'flex-end',
    marginHorizontal: 16,
    overflow: 'hidden',
    padding: 18,
  },
  previewBadge: {
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    left: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    position: 'absolute',
    top: 14,
  },
  previewBadgeText: {
    color: colors.black,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1,
  },
  previewCopy: {
    gap: 7,
  },
  previewImage: {
    borderRadius: radii.large,
  },
  previewKicker: {
    color: colors.accent,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  previewScrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  previewTitle: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.8,
    lineHeight: 31,
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -1,
    marginTop: 2,
  },
});
