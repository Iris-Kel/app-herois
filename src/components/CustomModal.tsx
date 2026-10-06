import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { SplashScreen } from "expo-router";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (nome: string, classe: string) => void;
}

export default function CustomModal({
  visible,
  onClose,
  onSave,
}: CustomModalProps) {
  const [nome, setNome] = useState("");
  const [classe, setClasse] = useState("");

  const [loaded, error] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold
    });

    useEffect(() => {
        if( error ) throw error;
    }, [error])

    useEffect(() => {
        if(loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded])

  function salvar() {
    if (nome.trim() === "" || classe.trim() === "") {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha o nome e a classe do herói."
      );
      return;
    }

    onSave(nome, classe);

    setNome("");
    setClasse("");
  }

  function fechar() {
    setNome("");
    setClasse("");
    onClose();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={fechar}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          
          <Text style={styles.titulo}>Criar Dragão</Text>

          <Image
            source={require("../app/assets/avatar.jpg")}
            style={styles.avatar}
          />

          <Text style={styles.label}>Nome do Dragão</Text>

          <TextInput
          placeholderTextColor="#ffe9e69b"
            style={styles.input}
            placeholder="Digite o nome"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Tribo</Text>

          <TextInput
           placeholderTextColor="#ffe9e69b"
            style={styles.input}
            placeholder="Ex: RainWing"
            value={classe}
            onChangeText={setClasse}
          />

          <TouchableOpacity
            style={styles.botaoSalvar}
            onPress={salvar}
          >
            <Text style={styles.textoBotao}>Salvar Dragão</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoCancelar}
            onPress={fechar}
          >
            <Text style={styles.textoCancelar}>Cancelar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },

  modal: {
    width: "85%",
     backgroundColor: "#2e2133",
    borderRadius: 24,
    padding: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4a3550",
    shadowColor: "#f99fa9",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 12
  },

  titulo: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    marginBottom: 15,
    color: "#ffe9e6",
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: "#f5c97a",
    marginBottom: 20,
  },

  label: {
    width: "100%",
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    marginBottom: 5,
    color: "#f99fa9"
  },

  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#4a3550",
    backgroundColor: "#1f1620",
    color: "#ffe9e6",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontFamily: "Poppins_400Regular",
    marginBottom: 15
  },
  

  botaoSalvar: {
    width: "100%",
    backgroundColor: "#f99fa9",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },

  textoBotao: {
    color: "#2a1424",
    fontFamily: "Poppins_700Bold",
    fontSize: 15,
  },

  botaoCancelar: {
    marginTop: 15,
  },

  textoCancelar: {
    fontFamily: "Poppins_400Regular",
    color: "#c9a3b0",
  },
});
