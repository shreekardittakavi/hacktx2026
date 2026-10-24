import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { colors, radii } from '@/constants/theme';
import { chats, images } from '@/data/mock';

type Message = {
  id: string;
  author: string;
  body: string;
  mine?: boolean;
  muse?: boolean;
};

const initialMessages: Message[] = [
  { id: '1', author: 'Noah', body: 'Did anyone get a photo before the cake collapsed?' },
  { id: '2', author: 'Maya', body: '“collapsed” is generous', mine: true },
  { id: '3', author: 'Jonah', body: 'I have a video but it is deeply incriminating' },
  {
    id: '4',
    author: 'Muse',
    body: 'I found six photos, Jonah’s voice note, and exactly one usable cake frame. Want me to make a group drop?',
    muse: true,
  },
];

export function generateStaticParams(): { id: string }[] {
  return chats.map((chat) => ({ id: chat.id }));
}

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const chat = useMemo(() => chats.find((item) => item.id === id) ?? chats[0], [id]);
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState('');
  const [preview, setPreview] = useState(false);

  const sendMessage = () => {
    const body = draft.trim();
    if (!body) return;
    setMessages((current) => [
      ...current,
      { id: `${Date.now()}`, author: 'You', body, mine: true },
    ]);
    setDraft('');
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardView}>
        <View style={styles.page}>
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <Text style={styles.backText}>‹</Text>
            </Pressable>
            <Avatar group image={chat.image} label={chat.name} size={40} />
            <View style={styles.headerCopy}>
              <Text style={styles.chatName}>{chat.name}</Text>
              <Text style={styles.chatMeta}>{chat.members}</Text>
            </View>
            <Pressable style={styles.callButton}>
              <Text style={styles.callText}>⌁</Text>
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.messages} showsVerticalScrollIndicator={false}>
            <View style={styles.datePill}>
              <Text style={styles.dateText}>TODAY</Text>
            </View>
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageRow,
                  message.mine && styles.messageRowMine,
                  message.muse && styles.messageRowMuse,
                ]}>
                {!message.mine ? (
                  <View style={[styles.miniAvatar, message.muse && styles.museAvatar]}>
                    <Text style={[styles.miniAvatarText, message.muse && styles.museAvatarText]}>
                      {message.muse ? '✦' : message.author.slice(0, 1)}
                    </Text>
                  </View>
                ) : null}
                <View style={styles.messageColumn}>
                  {!message.mine ? (
                    <Text style={[styles.author, message.muse && styles.museAuthor]}>{message.author}</Text>
                  ) : null}
                  <View
                    style={[
                      styles.bubble,
                      message.mine && styles.bubbleMine,
                      message.muse && styles.bubbleMuse,
                    ]}>
                    <Text style={[styles.body, message.mine && styles.bodyMine]}>{message.body}</Text>
                  </View>
                  {message.muse ? (
                    <View style={styles.suggestionActions}>
                      <Pressable onPress={() => setPreview(true)} style={styles.makeButton}>
                        <Text style={styles.makeButtonText}>Make the draft</Text>
                      </Pressable>
                      <Pressable style={styles.dismissButton}>
                        <Text style={styles.dismissText}>Not now</Text>
                      </Pressable>
                    </View>
                  ) : null}
                </View>
              </View>
            ))}

            {preview ? (
              <View style={styles.draftCard}>
                <ImageBackground imageStyle={styles.draftImage} source={{ uri: images.apartment }} style={styles.draftHero}>
                  <View style={styles.draftScrim} />
                  <View style={styles.draftBadge}>
                    <Text style={styles.draftBadgeText}>AI DRAFT · 6 MOMENTS</Text>
                  </View>
                  <Text style={styles.draftTitle}>The cake survived in spirit.</Text>
                </ImageBackground>
                <View style={styles.draftFooter}>
                  <View>
                    <Text style={styles.draftFooterTitle}>APT 304 birthday drop</Text>
                    <Text style={styles.draftFooterMeta}>0 of 3 approvals</Text>
                  </View>
                  <Pressable style={styles.approveButton}>
                    <Text style={styles.approveText}>Approve</Text>
                  </Pressable>
                </View>
              </View>
            ) : null}
          </ScrollView>

          <View style={styles.composer}>
            <Pressable style={styles.plusButton}>
              <Text style={styles.plusText}>＋</Text>
            </Pressable>
            <TextInput
              onChangeText={setDraft}
              onSubmitEditing={sendMessage}
              placeholder={`Message ${chat.name}`}
              placeholderTextColor={colors.subtle}
              returnKeyType="send"
              style={styles.input}
              value={draft}
            />
            <Pressable onPress={sendMessage} style={styles.sendButton}>
              <Text style={styles.sendText}>↑</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  approveButton: {
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  approveText: {
    color: colors.black,
    fontSize: 10,
    fontWeight: '900',
  },
  author: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: '700',
    marginBottom: 4,
    marginLeft: 3,
  },
  backButton: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    width: 30,
  },
  backText: {
    color: colors.text,
    fontSize: 38,
    fontWeight: '200',
    lineHeight: 38,
  },
  body: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  bodyMine: {
    color: colors.black,
  },
  bubble: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 18,
    borderTopLeftRadius: 5,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  bubbleMine: {
    backgroundColor: colors.text,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 5,
  },
  bubbleMuse: {
    borderColor: colors.accent,
    borderWidth: 1,
  },
  callButton: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: 19,
    borderWidth: 1,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  callText: {
    color: colors.text,
    fontSize: 20,
  },
  chatMeta: {
    color: colors.muted,
    fontSize: 9,
    marginTop: 2,
  },
  chatName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  composer: {
    alignItems: 'center',
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 8,
    padding: 10,
  },
  datePill: {
    alignSelf: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    marginBottom: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dateText: {
    color: colors.subtle,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1,
  },
  dismissButton: {
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  dismissText: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '800',
  },
  draftBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  draftBadgeText: {
    color: colors.black,
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 0.7,
  },
  draftCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.medium,
    borderWidth: 1,
    marginLeft: 36,
    marginTop: 2,
    overflow: 'hidden',
  },
  draftFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  draftFooterMeta: {
    color: colors.muted,
    fontSize: 9,
    marginTop: 2,
  },
  draftFooterTitle: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '800',
  },
  draftHero: {
    height: 210,
    justifyContent: 'space-between',
    padding: 12,
  },
  draftImage: {
    borderTopLeftRadius: radii.medium,
    borderTopRightRadius: radii.medium,
  },
  draftScrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.22)',
  },
  draftTitle: {
    color: colors.white,
    fontSize: 23,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  header: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 9,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  headerCopy: {
    flex: 1,
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 1,
    color: colors.text,
    flex: 1,
    fontSize: 13,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  keyboardView: {
    flex: 1,
  },
  makeButton: {
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  makeButtonText: {
    color: colors.black,
    fontSize: 10,
    fontWeight: '900',
  },
  messageColumn: {
    maxWidth: '82%',
  },
  messageRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 7,
  },
  messageRowMine: {
    justifyContent: 'flex-end',
  },
  messageRowMuse: {
    marginTop: 8,
  },
  messages: {
    gap: 12,
    padding: 14,
  },
  miniAvatar: {
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderRadius: 14,
    height: 28,
    justifyContent: 'center',
    marginTop: 12,
    width: 28,
  },
  miniAvatarText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '900',
  },
  museAuthor: {
    color: colors.accent,
  },
  museAvatar: {
    backgroundColor: colors.accent,
  },
  museAvatarText: {
    color: colors.black,
  },
  page: {
    alignSelf: 'center',
    flex: 1,
    maxWidth: 560,
    width: '100%',
  },
  plusButton: {
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderRadius: 19,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  plusText: {
    color: colors.text,
    fontSize: 21,
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  sendButton: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 19,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  sendText: {
    color: colors.black,
    fontSize: 20,
    fontWeight: '900',
  },
  suggestionActions: {
    flexDirection: 'row',
    gap: 3,
    marginTop: 8,
  },
});
