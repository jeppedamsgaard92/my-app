import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import Form from "../files/Form";
import BrewNotesForm from "../files/BrewNotesForm";
import { useAsyncStorage } from "../files/useAsyncStorage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import ButtonForModal from "../files/ButtonForModal";
import ModalForAddNew from '../files/ModalForAddNew';
import MyBrews from '../files/MyBrews';
import { useStateContext } from "../files/StateContext"; 




export default function App() {

  const { savedCoffees, setSavedCoffees, savedEquipment, setSavedEquipment, brewNotes, setBrewNotes } = useStateContext();

  // State managed via `useAsyncStorage`
  // const [savedCoffees, setSavedCoffees] = useAsyncStorage<Record<string, string>[]>("coffees", []);
  // const [savedEquipment, setSavedEquipment] = useAsyncStorage<Record<string, string>[]>("equipment", []);
  // const [brewNotes, setBrewNotes] = useAsyncStorage<Record<string, any>[]>("brewNotes", []);



  // Modal states
  const [coffeeModalVisible, setCoffeeModalVisible] = useState(false);
  const [equipmentModalVisible, setEquipmentModalVisible] = useState(false);
  const [brewNotesModalVisible, setBrewNotesModalVisible] = useState(false);
  
  // Handlers for saving data
  const handleSaveCoffee = (details: Record<string, string>) => {
    const newCoffee = { ...details, id: uuidv4() }; // Add UUID
    setSavedCoffees((prev) => [...prev, newCoffee]);
    Alert.alert("Success", "Your coffee has been saved!");
    setCoffeeModalVisible(false); // Close modal after saving
  };
  
  const handleSaveEquipment = (details: Record<string, string>) => {
    const newEquipment = { ...details, id: uuidv4() }; // Add UUID
    setSavedEquipment((prev) => [...prev, newEquipment]);
    Alert.alert("Success", "Your equipment has been saved!");
    setEquipmentModalVisible(false); // Close modal after saving
  };

  const handleSaveBrewNote = (details: Record<string, any>) => {
    const newBrewNote = { ...details, id: uuidv4() }; // Add UUID
    setBrewNotes((prev) => [...prev, newBrewNote]);
    Alert.alert("Success", "Your brew notes have been saved!");
    setBrewNotesModalVisible(false); // Close modal after saving
  };

  //Data objects
  const coffeeLabels = ['Name', 'Variety', 'Blend or Single-Origin', 'Country of Origin', 'Region/Territory', 'Farm/Cooperative', 'Altitude', 'Roast Date', 'Processing Method'];
  const equipmentLabels = ['Name', 'Grinder', 'Brew Method', 'Brewer'];

  const names = {
    coffee: {
      header: 'Add new coffee',
      alert: 'coffee', 
      saveButton: 'Save Coffee', 
    },
    equipment: {
      header: 'Add new equipment',
      alert: 'equipment', 
      saveButton: 'Save Equipment', 
    }, 
    brewNotes: {
      header: 'Add new brew notes',
    }
  }
  
  const colors = {
    coffee: {backgroundColor: '#D32E96', shadowColor: '#F384F3', modalBackground: '#791740'},
    equipment: {backgroundColor: '#2E95D3', shadowColor: '#84C9F3', modalBackground: '#0E3A55'},
    brewNotes: {backgroundColor: '#05A57E', shadowColor: '#9DF1DD', modalBackground: '#024E3C'},
  }

  return (
    <View style={styles.container}> 
      {/* Main Buttons */}
      <View style={styles.buttonContainer}>
        {/* Coffee button */}
        <ButtonForModal setModalVisible={setCoffeeModalVisible} buttonStyles={colors.coffee} title={names.coffee.header}/>
        {/* Equipment button */}
        <ButtonForModal setModalVisible={setEquipmentModalVisible} buttonStyles={colors.equipment} title={names.equipment.header}/> 
        {/* Brew Notes Button */}
        <ButtonForModal setModalVisible={setBrewNotesModalVisible} buttonStyles={colors.brewNotes} title={names.brewNotes.header}/> 
      </View>

      {/* Coffee Modal */}
      <ModalForAddNew modalVisible={coffeeModalVisible} setModalVisible={setCoffeeModalVisible} modalBackgroundColor={colors.coffee.modalBackground}>
        <Form
          onSave={handleSaveCoffee}
          labels={coffeeLabels}
          names={names.coffee}
          buttonStyles={colors.coffee}
        />
      </ModalForAddNew>

      {/* Equipment Modal */}
      <ModalForAddNew modalVisible={equipmentModalVisible} setModalVisible={setEquipmentModalVisible} modalBackgroundColor={colors.equipment.modalBackground}>
        <Form
          onSave={handleSaveEquipment}
          labels={equipmentLabels}
          names={names.equipment}
          buttonStyles={colors.equipment}
        />
      </ModalForAddNew>

      {/* Brew Notes Modal */}
      <ModalForAddNew modalVisible={brewNotesModalVisible} setModalVisible={setBrewNotesModalVisible} modalBackgroundColor={colors.brewNotes.modalBackground}>
        <BrewNotesForm
          onSave={handleSaveBrewNote} 
          coffees={savedCoffees.map(coffee => coffee.Name)} 
          equipment={savedEquipment.map(equip => equip.Name)}
        />
      </ModalForAddNew>

      {/* My Brews */}
      <MyBrews brewNotes={brewNotes}/>

  </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    paddingTop:'20%',
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#212121",
  },
  buttonContainer: {
    width: "100%",
    padding: 20,
    gap: 20,
  },

});
