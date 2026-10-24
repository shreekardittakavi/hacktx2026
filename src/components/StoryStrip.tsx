import { useState } from 'react';
import {
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { colors } from '@/constants/theme';
import { stories, type Story } from '@/data/mock';

export function StoryStrip() {
  const [selected, setSelected] = useState<Story | null>(null);

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.list}
        horizontal
        showsHorizontalScrollIndicator={false}>
        <Pressable style={styles.story}>
          <View style={styles.addStory}>
            <Text style={styles.plus}>＋</Text>
          </View>
          <Text style={styles.storyName}>Your story</Text>
        </Pressable>
        {stories.map((story) => (
          <Pressable
            key={story.id}
            onPress={() => setSelected(story)}
            style={({ pressed }) => [styles.story, pressed && styles.pressed]}>
            <View>
              <Avatar
                group={story.isGroup}
                image={story.image}
                label={story.name}
                ring
                size={62}
              />
              {story.label ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{story.label}</Text>
                </View>
              ) : null}
            </View>
            <Text numberOfLines={1} style={styles.storyName}>
              {story.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <Modal
        animationType="fade"
        onRequestClose={() => setSelected(null)}
        transparent
        visible={Boolean(selected)}>
        {selected ? (
          <ImageBackground source={{ uri: selected.cover }} style={styles.modalImage}>
            <View style={styles.scrim} />
            <SafeAreaView style={styles.modalContent}>
              <View style={styles.progress}>
                <View style={styles.progressFill} />
              </View>
              <View style={styles.modalHeader}>
                <View style={styles.modalIdentity}>
                  <Avatar image={selected.image} label={selected.name} size={36} />
                  <View>
                    <Text style={styles.modalName}>{selected.name}</Text>
                    <Text style={styles.modalMeta}>
                      {selected.isGroup ? 'Shared by the whole circle' : '12 minutes ago'}
                    </Text>
                  </View>
                </View>
                <Pressable onPress={() => setSelected(null)} style={styles.close}>
                  <Text style={styles.closeText}>×</Text>
                </Pressable>
              </View>
              <View style={styles.storyCopy}>
                <Text style={styles.storyKicker}>
                  {selected.isGroup ? 'GROUP STORY' : 'FROM TODAY'}
                </Text>
                <Text style={styles.storyHeadline}>
                  {selected.isGroup
                    ? 'One night, told by everyone who was there.'
                    : 'A small moment worth keeping.'}
                </Text>
              </View>
              <View style={styles.replyBar}>
                <Text style={styles.replyText}>Send a reaction…</Text>
                <Text style={styles.replyIcon}>↗</Text>
              </View>
            </SafeAreaView>
          </ImageBackground>
        ) : null}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  addStory: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 31,
    borderStyle: 'dashed',
    borderWidth: 1,
    height: 62,
    justifyContent: 'center',
    width: 62,
  },
  badge: {
    backgroundColor: colors.accent,
    borderColor: colors.background,
    borderRadius: 8,
    borderWidth: 2,
    bottom: -2,
    paddingHorizontal: 5,
    paddingVertical: 2,
    position: 'absolute',
    right: -4,
  },
  badgeText: {
    color: colors.black,
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  close: {
    alignItems: 'center',
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  closeText: {
    color: colors.white,
    fontSize: 34,
    fontWeight: '300',
  },
  list: {
    gap: 14,
    paddingBottom: 14,
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  modalHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalIdentity: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  modalImage: {
    flex: 1,
  },
  modalMeta: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 11,
    marginTop: 1,
  },
  modalName: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
  plus: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '300',
  },
  pressed: {
    opacity: 0.72,
    transform: [{ scale: 0.97 }],
  },
  progress: {
    backgroundColor: 'rgba(255,255,255,0.28)',
    borderRadius: 3,
    height: 3,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: colors.white,
    height: '100%',
    width: '58%',
  },
  replyBar: {
    alignItems: 'center',
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 28,
    borderWidth: 1,
    bottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    position: 'absolute',
    right: 16,
  },
  replyIcon: {
    color: colors.white,
    fontSize: 20,
  },
  replyText: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 14,
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  story: {
    alignItems: 'center',
    gap: 7,
    width: 66,
  },
  storyCopy: {
    bottom: 96,
    left: 16,
    position: 'absolute',
    right: 18,
  },
  storyHeadline: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.8,
    lineHeight: 32,
  },
  storyKicker: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.8,
    marginBottom: 8,
  },
  storyName: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '600',
    maxWidth: 66,
  },
});
