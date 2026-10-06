import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface HeroCardProps {
  nome: string;
  classe: string;
}

export default function HeroCard({ nome, classe }: HeroCardProps) {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  return (
    <View style={styles.card}>
        <Image
        source={require("../app/assets/avatar.jpg")}
        style={styles.avatar}
      />
      <View>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.classe}>Tribo: {classe}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2e2133",
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#4a3550",
    borderLeftWidth: 5,
    borderLeftColor: "#f99fa9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5
  },

  nome: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: "#ffe9e6"
  },

  classe: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginTop: 5,
    color: "#f99fa9"
  },

   avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#f5c97a",
    marginRight: 14
  }
});
