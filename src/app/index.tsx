import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SplashScreen } from "expo-router";
import CustomModal from "../components/CustomModal";
import HeroCard from "../components/HeroCard";

interface Hero {
  id: string;
  nome: string;
  classe: string;
}

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);

  const [herois, setHerois] = useState<Hero[]>([]);

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

  function adicionarHeroi(nome: string, classe: string) {
    const novoHeroi: Hero = {
      id: Date.now().toString(),
      nome: nome,
      classe: classe,
    };

    setHerois((listaAtual) => [...listaAtual, novoHeroi]);
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>WingsTribe</Text>

      <View style={styles.cardFixo}>
  <Image
    source={require("../app/assets/backgroundCard.jpg")}
    style={styles.imagemCard}
  />

  <Text style={styles.tituloCard}>
    Bem-vindo à WingsTribe!
  </Text>
  <Text style={styles.textoCard}>
    Recrute seus dragões e monte sua tribo.
  </Text>

</View>

      {herois.length === 0 ? (
        <Text style={styles.vazio}>Nenhum dragão cadastrado ainda.</Text>
      ) : (
        <FlatList
        style={styles.lista}
          data={herois}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HeroCard nome={item.nome} classe={item.classe} />
          )}
        />
      )}

      <TouchableOpacity
        style={styles.botao}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textoBotao}>Criar Dragão</Text>
      </TouchableOpacity>

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={adicionarHeroi}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#1f1620"
  },

  titulo: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 25,
    color: "#ffe9e6"
  },

  vazio: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginTop: 30,
    color: "#ffe9e6"
  },

  botao: {
    backgroundColor: "#f99fa9",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 14,
    shadowColor: "#f99fa9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8
  },

  textoBotao: {
    color: "#2a1424",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    letterSpacing: 0.5
  },

  lista: {
  flexGrow: 0,
  maxHeight: 250
},

cardFixo: {
  backgroundColor: "#2e2133",
  borderRadius: 18,
  overflow: "hidden",
  borderWidth: 1,
  borderColor: "#4a3550",
  borderBottomWidth: 3,
  borderBottomColor: "#f5c97a",
  shadowColor: "#f99fa9",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 12,
  elevation: 6,
},

imagemCard: {
  width: "100%",
  height: 130,
},

cardTexto: {
  padding: 16,
  alignItems: "center",
},

tituloCard: {
  fontFamily: "PoppinsBold",
  fontSize: 25,
  marginTop: 8,
  color: "#ffe9e6",
  textAlign: "center",
},

textoCard: {
  fontFamily: "Poppins",
  fontSize: 16,
  color: "#c9a3b0",
  textAlign: "center",
  marginTop: 2,
  paddingBottom: 20,
},

});
