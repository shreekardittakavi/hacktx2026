import { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/AppHeader';
import { FeedPostCard } from '@/components/FeedPostCard';
import { StoryStrip } from '@/components/StoryStrip';
import { colors, radii } from '@/constants/theme';
import { feedPosts } from '@/data/mock';

const filters = ['Pulse', 'Following', 'Nearby'];

export default function HomeScreen() {
  const [filter, setFilter] = useState('Pulse');
  const [museOpen, setMuseOpen] = useState(false);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          <AppHeader onAction={() => setMuseOpen(true)} />
          <StoryStrip />

          <View style={styles.feedHeader}>
            <View style={styles.filters}>
              {filters.map((item) => (
                <Pressable
                  key={item}
                  onPress={() => setFilter(item)}
                  style={[styles.filter, filter === item && styles.filterActive]}>
                  <Text
                    style={[
                      styles.filterText,
                      filter === item && styles.filterTextActive,
                    ]}>
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Text style={styles.feedHint}>One feed. More ways in.</Text>
          </View>

          <View style={styles.nowCard}>
            <View style={styles.nowDot} />
            <View style={styles.nowCopy}>
              <Text style={styles.nowKicker}>HAPPENING NOW</Text>
              <Text style={styles.nowTitle}>18 groups are trading twenty-minute skills</Text>
            </View>
            <Text style={styles.nowArrow}>→</Text>
          </View>

          <View style={styles.feed}>
            {feedPosts.map((post) => (
              <FeedPostCard key={post.id} post={post} />
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        onRequestClose={() => setMuseOpen(false)}
        transparent
        visible={museOpen}>
        <Pressable onPress={() => setMuseOpen(false)} style={styles.modalScrim}>
          <Pressable onPress={() => undefined} style={styles.museSheet}>
            <View style={styles.sheetHandle} />
            <View style={styles.museHeader}>
              <View style={styles.museOrb}>
                <Text style={styles.museOrbText}>✦</Text>
              </View>
              <View>
                <Text style={styles.museTitle}>Muse noticed a moment</Text>
                <Text style={styles.museMeta}>From APT 304 · 6 minutes ago</Text>
              </View>
            </View>
            <Text style={styles.museBody}>
              Everyone sent a different version of last night. I can turn the
              best six into a Moment Stack for your group to approve.
            </Text>
            <View style={styles.museActions}>
              <Pressable style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Not now</Text>
              </Pressable>
              <Pressable style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Make the draft</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 24,
  },
  feed: {
    gap: 4,
    paddingHorizontal: 16,
  },
  feedHeader: {
    gap: 9,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  feedHint: {
    color: colors.subtle,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  filter: {
    borderRadius: radii.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  filterActive: {
    backgroundColor: colors.text,
  },
  filterText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '800',
  },
  filterTextActive: {
    color: colors.black,
  },
  filters: {
    flexDirection: 'row',
    gap: 4,
  },
  modalScrim: {
    backgroundColor: 'rgba(0,0,0,0.72)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  museActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 22,
  },
  museBody: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 18,
  },
  museHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  museMeta: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 3,
  },
  museOrb: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 23,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
  museOrbText: {
    color: colors.black,
    fontSize: 21,
    fontWeight: '900',
  },
  museSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingBottom: 34,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  museTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  nowArrow: {
    color: colors.black,
    fontSize: 22,
    fontWeight: '700',
  },
  nowCard: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: radii.medium,
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 14,
  },
  nowCopy: {
    flex: 1,
    marginHorizontal: 10,
  },
  nowDot: {
    backgroundColor: colors.black,
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  nowKicker: {
    color: colors.black,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  nowTitle: {
    color: colors.black,
    fontSize: 13,
    fontWeight: '800',
    marginTop: 2,
  },
  page: {
    alignSelf: 'center',
    maxWidth: 560,
    width: '100%',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    flex: 1,
    paddingVertical: 13,
  },
  primaryButtonText: {
    color: colors.black,
    fontSize: 13,
    fontWeight: '900',
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  secondaryButton: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 13,
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  sheetHandle: {
    alignSelf: 'center',
    backgroundColor: colors.border,
    borderRadius: 2,
    height: 4,
    marginBottom: 22,
    width: 42,
  },
});
