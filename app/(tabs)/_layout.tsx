import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Animated, Easing, Platform, Text } from 'react-native';
import { Tabs, useRouter, Link, Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "@/constants/Style"
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

LogBox.ignoreAllLogs(true);

type TabName = '/' | '/business' | '/students' | '/archived' | '/managed' | '/trash' | '/users' | '/web-view/reports';

interface TabButtonProps {
  name: FlexibleHref;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
}

type FlexibleHref = Href<string | object> | TabName;

interface CustomLinkProps {
  href: FlexibleHref;
  children: React.ReactNode;
  style?: object;
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, children, style }) => {
  const adjustedHref = (Platform.OS === 'web' && typeof href === 'string' && !href.startsWith('/web-view') && href !== '/')
    ? ('../+not-found' as Href<string | object>)
    : (href as Href<string | object>);
  return <Link href={adjustedHref} style={style}>{children}</Link>;
};

const TabButton: React.FC<TabButtonProps> = ({ name, icon, color, onPress }) => (
  <TouchableOpacity style={styles.smenu.tabButton} onPress={onPress}>
    {Platform.OS === 'web' ? (
      <CustomLink href={name}>
        <Ionicons name={icon} color={color} size={24} />
      </CustomLink>
    ) : (
      <Ionicons name={icon} color={color} size={24} />
    )}
  </TouchableOpacity>
);

const WebHeader: React.FC = () => (
  <View style={styles.webHeader.container}>
    <CustomLink href="/" style={styles.webHeader.link}>
      <Text style={styles.webHeader.linkText}>Inicio</Text>
    </CustomLink>
    <CustomLink href="/web-view/reports" style={styles.webHeader.link}>
      <Text style={styles.webHeader.linkText}>Reportes</Text>
    </CustomLink>
  </View>
);

export default function Layout() {
  const [activeTab, setActiveTab] = useState<TabName>('/');
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const toggleDropdown = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 300,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };

  const navigateToTab = (tabName: FlexibleHref) => {
    setActiveTab(tabName as TabName);
    if (Platform.OS === 'web' && typeof tabName === 'string' && !tabName.startsWith('/web-view') && tabName !== '/') {
      router.push('../+not-found');
    } else {
      router.push(tabName as Href<string | object>);
    }
    toggleDropdown();
  };

  const dropdownTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  const dropdownOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <>
      <StatusBar style="light" />
      {Platform.OS === 'web' && <WebHeader />}
      <View style={styles.smenu.container}>
        <Tabs
          screenOptions={{
            headerShown: false,
            headerTintColor: "#000",
            tabBarStyle: {
              display: 'none',
            },
          }}
        >
        </Tabs>

        {Platform.OS !== 'web' && (
          <>
            <ExpoStatusBar style='light' />
            <TouchableOpacity
              style={styles.smenu.fab}
              onPress={toggleDropdown}
              activeOpacity={0.8}
            >
              <Ionicons
                name={isOpen ? 'close' : 'menu'}
                color="#fff"
                size={24}
              />
            </TouchableOpacity>

            <Animated.View
              style={[
                styles.smenu.dropdown,
                {
                  transform: [{ translateY: dropdownTranslateY }],
                  opacity: dropdownOpacity,
                  zIndex: isOpen ? 1 : -1,
                }
              ]}
              pointerEvents={isOpen ? 'auto' : 'none'}
            >
              <TabButton
                name="/users"
                icon={activeTab === '/users' ? 'person-circle-outline' : 'person-circle'}
                color="#9F2CBF"
                onPress={() => navigateToTab('/users')}
              />
              <TabButton
                name="/trash"
                icon={activeTab === '/trash' ? 'trash-outline' : 'trash'}
                color="#9F2CBF"
                onPress={() => navigateToTab('/trash')}
              />
              <TabButton
                name="/managed"
                icon={activeTab === '/managed' ? 'flag-outline' : 'flag'}
                color="#9F2CBF"
                onPress={() => navigateToTab('/managed')}
              />
              <TabButton
                name="/archived"
                icon={activeTab === '/archived' ? 'archive-outline' : 'archive'}
                color="#9F2CBF"
                onPress={() => navigateToTab('/archived')}
              />
              <TabButton
                name="/students"
                icon={activeTab === '/students' ? 'people-outline' : 'people'}
                color="#9F2CBF"
                onPress={() => navigateToTab('/students')}
              />
              <TabButton
                name="/business"
                icon={activeTab === '/business' ? 'business-outline' : 'business'}
                color="#9F2CBF"
                onPress={() => navigateToTab('/business')}
              />
              <TabButton
                name="/"
                icon={activeTab === '/' ? 'home-outline' : 'home'}
                color="#9F2CBF"
                onPress={() => navigateToTab('/')}
              />
            </Animated.View>
          </>
        )}
      </View>
    </>
  );
}