import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Animated, Easing, Platform, Text } from 'react-native';
import { Tabs, useRouter, Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "@/constants/Style"

LogBox.ignoreAllLogs(true);

type TabName = '/' | '/business' | '/students' | '/archived' | '/managed' | '/trash' | '/web-view/about';

interface TabButtonProps {
  name: TabName;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
}

interface CustomLinkProps {
  href: string;
  [key: string]: any;
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, ...props }) => {
  if (Platform.OS === 'web' && !href.startsWith('/web-view') && href !== '/') {
    href = '/+not-found';
  }
  return <Link href={href} {...props} />;
};

const TabButton: React.FC<TabButtonProps> = ({ name, icon, color, onPress }) => (
  <TouchableOpacity style={styles.smenu.tabButton} onPress={onPress}>
    <CustomLink href={name}>
      <Ionicons name={icon} color={color} size={24} />
    </CustomLink>
  </TouchableOpacity>
);

const WebHeader: React.FC = () => (
  <View style={styles.webHeader.container}>
    <CustomLink href="/" style={styles.webHeader.link}>
      <Text style={styles.webHeader.linkText}>Home</Text>
    </CustomLink>
    <CustomLink href="/web-view/about" style={styles.webHeader.link}>
      <Text style={styles.webHeader.linkText}>About</Text>
    </CustomLink>
  </View>
);

export default function TabLayout() {
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

  const navigateToTab = (tabName: TabName) => {
    setActiveTab(tabName);
    if (Platform.OS === 'web' && !tabName.startsWith('/web-view') && tabName !== '/') {
      router.push('/+not-found');
    } else {
      router.push(tabName);
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
          <Tabs.Screen
            name="index"
            options={{
              href: '/',
              headerTitle: "Inicio",
              headerLeft: () => null,
            }}
          />
          <Tabs.Screen
            name="business"
            options={{
              href: '/business',
              headerTitle: "Empresas",
            }}
          />
          <Tabs.Screen
            name="students"
            options={{
              href: '/students',
              headerTitle: "Estudiantes",
            }}
          />
          <Tabs.Screen
            name="archived"
            options={{
              href: '/archived',
              headerTitle: "Reportes Archivados",
            }}
          />
          <Tabs.Screen
            name="managed"
            options={{
              href: '/managed',
              headerTitle: "Reportes Gestionados",
            }}
          />
          <Tabs.Screen
            name="trash"
            options={{
              href: '/trash',
              headerTitle: "Reportes En Pepelera",
            }}
          />
          <Tabs.Screen
            name="about"
            options={{
              href: '/web-view/about',
              headerTitle: "Acerca",
            }}
          />
        </Tabs>

        {Platform.OS !== 'web' && (
          <>
            <StatusBar style='light' />
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