import React, {useState} from "react";
import { View, Text, StatusBar, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import Api from '../../src/services/api'

export default function App() {

  const [cep, setCep] = useState("")
  const [logradouro, setLogradouro] = useState("")
  const [bairro, setBairro] = useState("")
  const [localidade, setLocalidade] = useState("")
  const [uf, setUf] = useState("")

  async function buscarCep()
  {
    if(cep == "")
    {
      Alert.alert("Cep inválido")
      setCep("")
    } 

    try{
      const response = await Api.get(`/${cep}/json`)
      setLogradouro(response.data.logradouro)
      setBairro(response.data.bairro)
      setLocalidade(response.data.localidade)
      setUf(response.data.uf)
    }
    catch(error) {
      console.log("ERROR" + error)
    }
  }
  
  return (
    <View style={styles.containerPrincipal}>

      <View style={styles.topBar}>
        <Text style={styles.title}>Buscador de Cep</Text>
      </View>

      <View style={styles.containerCep}>
        <TextInput
        value={cep}
        onChangeText={(texto) => setCep(texto)}
        placeholder="Cep"
        style={{
            borderColor: "#000000",
            borderWidth: 2,
            borderRadius: 5,
            width: 200,
            height: 50,
            fontSize: 18,
            marginTop: 30,
            marginEnd: 20,
            padding: 10,
          }}
        />
      <TouchableOpacity style={styles.botaoBuscar} onPress={buscarCep}>
        <Text style={styles.textoBotao}>Buscar</Text>
      </TouchableOpacity>

      </View>

      <TextInput
        style={styles.caixaTexto}
        value={logradouro}
        onChangeText={(texto) => setLogradouro(texto)}
        placeholder="Logradouro"/>
        
      <TextInput
        style={styles.caixaTexto}
        value={bairro}
        onChangeText={(texto) => setBairro(texto)}
        placeholder="Bairro"/>

      <TextInput
        style={styles.caixaTexto}
        value={localidade}
        onChangeText={(texto) => setLocalidade(texto)}
        placeholder="Cidade"/>

      <TextInput
        value={uf}
        onChangeText={(texto) => setUf(texto)}
        placeholder="Estado"
        style={{
            borderColor: "#000000",
            borderWidth: 2,
            borderRadius: 5,
            width: 80,
            height: 50,
            fontSize: 18,
            marginTop: 10,
            marginEnd: 20,
            marginHorizontal: 20,
            padding: 10,
          }}
        />

    </View>
  );
}

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    flexDirection: "column",
    paddingTop: StatusBar.currentHeight 
  },
  topBar: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#018786"
  },
  title: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    margin: 20
  },
  containerCep: {
    flexDirection: "row",
    marginHorizontal: 20,
  },
  botaoBuscar: {
    backgroundColor: "#018786",
    width: 120,
    height: 50,
    marginTop: 30,
    marginEnd: 20,
    borderRadius: 5,
    padding: 12
  },
  textoBotao: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  caixaTexto: {
    borderColor: "#000000",
    borderWidth: 2,
    padding: 10,
    fontSize: 18,
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 20,
    height: 50
  }
});
