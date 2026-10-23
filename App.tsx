import React, { useState } from 'react';
import {
  Alert, SafeAreaView, StatusBar, StyleSheet, Text, TextInput,
  TouchableOpacity, View, FlatList, KeyboardAvoidingView, Platform
} from 'react-native';

type Post = { id: string; text: string; likes: number; liked: boolean };

export default function App() {
  const [draft, setDraft] = useState('');
  const [posts, setPosts] = useState<Post[]>([
    { id: 'welcome', text: 'به XParsi خوش اومدی! 🚀 اینجا شروع یک دنیای تازه‌ست.', likes: 0, liked: false },
  ]);

  const publish = () => {
    const text = draft.trim();
    if (!text) {
      Alert.alert('پست خالیه', 'اول یه چیزی بنویس.');
      return;
    }
    setPosts(prev => [{ id: Date.now().toString(), text, likes: 0, liked: false }, ...prev]);
    setDraft('');
  };

  const toggleLike = (id: string) => setPosts(prev => prev.map(p =>
    p.id === id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p
  ));

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#101116" />
      <KeyboardAvoidingView style={s.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={s.header}>
          <Text style={s.logo}>𝕏 پارسی</Text>
          <Text style={s.tagline}>صدای تو، دنیای تو</Text>
        </View>
        <View style={s.tabs}>
          <Text style={s.tabActive}>برای تو</Text>
          <Text style={s.tab}>دنبال‌شده‌ها</Text>
        </View>
        <View style={s.composer}>
          <View style={s.avatar}><Text style={s.avatarLetter}>ا</Text></View>
          <View style={s.composeBody}>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="چی توی ذهنته؟"
              placeholderTextColor="#85899a"
              multiline
              textAlign="right"
              style={s.input}
            />
            <View style={s.composeFooter}>
              <Text style={s.hint}>با احترام پست کن ✨</Text>
              <TouchableOpacity onPress={publish} style={s.publish}>
                <Text style={s.publishText}>انتشار</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <FlatList
          data={posts}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 18 }}
          renderItem={({ item }) => (
            <View style={s.post}>
              <View style={s.postHeader}>
                <View style={s.avatar}><Text style={s.avatarLetter}>ا</Text></View>
                <View style={s.identity}>
                  <Text style={s.name}>امیرعباس</Text>
                  <Text style={s.handle}>@amir · همین الان</Text>
                </View>
                <Text style={s.more}>•••</Text>
              </View>
              <Text style={s.postText}>{item.text}</Text>
              <View style={s.actions}>
                <TouchableOpacity onPress={() => toggleLike(item.id)}>
                  <Text style={[s.action, item.liked && s.liked]}>{item.liked ? '♥' : '♡'}  {item.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert('پاسخ', 'قابلیت پاسخ در نسخه بعدی اضافه می‌شود.')}>
                  <Text style={s.action}>▢  پاسخ</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert('بازنشر', 'قابلیت بازنشر در نسخه بعدی اضافه می‌شود.')}>
                  <Text style={s.action}>⟳  بازنشر</Text>
                </TouchableOpacity>
                <Text style={s.action}>♧</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={s.empty}>هنوز پستی نیست. اولین نفر باش!</Text>}
        />
        <View style={s.bottomNav}>
          {[
            ['⌂', 'خانه', true], ['⌕', 'جستجو', false], ['＋', 'پست', false],
            ['♡', 'اعلان', false], ['◉', 'پروفایل', false]
          ].map(([icon, label, active]) => (
            <TouchableOpacity key={String(label)} style={s.navItem}
              onPress={() => label === 'پست' ? Alert.alert('پست جدید', 'بالای صفحه بنویس و انتشار را بزن.') : label === 'خانه' ? null : Alert.alert(String(label), 'این بخش در نسخه بعدی ساخته می‌شود.')}>
              <Text style={[s.navIcon, active ? s.navActive : null]}>{icon}</Text>
              <Text style={[s.navLabel, active ? s.navActive : null]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101116' },
  root: { flex: 1, backgroundColor: '#101116' },
  header: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 14, borderBottomWidth: 1, borderColor: '#292b35' },
  logo: { color: '#fff', fontSize: 28, fontWeight: '900', textAlign: 'right' },
  tagline: { color: '#85899a', fontSize: 12, textAlign: 'right', marginTop: 3 },
  tabs: { flexDirection: 'row-reverse', justifyContent: 'space-around', borderBottomWidth: 1, borderColor: '#292b35' },
  tabActive: { color: '#fff', fontWeight: '700', padding: 15, borderBottomWidth: 3, borderColor: '#8b7cff' },
  tab: { color: '#9da2b4', padding: 15 },
  composer: { flexDirection: 'row-reverse', gap: 12, padding: 16, borderBottomWidth: 7, borderColor: '#191a22' },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#6558e8', alignItems: 'center', justifyContent: 'center' },
  avatarLetter: { color: '#fff', fontSize: 22, fontWeight: '800' },
  composeBody: { flex: 1 },
  input: { minHeight: 66, maxHeight: 130, color: '#fff', fontSize: 16, textAlignVertical: 'top', paddingTop: 8 },
  composeFooter: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  hint: { color: '#777d90', fontSize: 12 },
  publish: { backgroundColor: '#7567f4', paddingHorizontal: 20, paddingVertical: 9, borderRadius: 22 },
  publishText: { color: '#fff', fontWeight: '800' },
  post: { padding: 16, borderBottomWidth: 1, borderColor: '#292b35' },
  postHeader: { flexDirection: 'row-reverse', alignItems: 'center', gap: 10 },
  identity: { alignItems: 'flex-end', flex: 1 },
  name: { color: '#fff', fontWeight: '800', fontSize: 14 },
  handle: { color: '#85899a', fontSize: 12, marginTop: 3 },
  more: { color: '#85899a', fontSize: 18 },
  postText: { color: '#ececf2', fontSize: 15, lineHeight: 27, textAlign: 'right', marginTop: 14, marginBottom: 18 },
  actions: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' },
  action: { color: '#969bad', fontSize: 13, paddingVertical: 4 },
  liked: { color: '#ff5c91' },
  empty: { color: '#969bad', textAlign: 'center', padding: 30 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingTop: 10, paddingBottom: 8, borderTopWidth: 1, borderColor: '#292b35', backgroundColor: '#15161d' },
  navItem: { alignItems: 'center', minWidth: 48 },
  navIcon: { color: '#a4a7b5', fontSize: 22 },
  navLabel: { color: '#a4a7b5', fontSize: 10, marginTop: 3 },
  navActive: { color: '#9b91ff' },
});
