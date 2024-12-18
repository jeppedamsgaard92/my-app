import React, { useState, useEffect, useRef } from "react";
import { ScrollView, View, StyleSheet, FlatList, Alert, Text, KeyboardAvoidingView, Platform, Keyboard, Button, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Form from "../files/Form";
import BrewNotesForm from "../files/BrewNotesForm";
import { useAsyncStorage } from "../files/useAsyncStorage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import ButtonForModal from "../files/ButtonForModal";
import ModalForAddNew from '../files/ModalForAddNew';
import MyBrews from '../files/MyBrews';



export default function App() {

  // State managed via `useAsyncStorage`
  const [savedCoffees, setSavedCoffees] = useAsyncStorage<Record<string, string>[]>("coffees", []);
  const [savedEquipment, setSavedEquipment] = useAsyncStorage<Record<string, string>[]>("equipment", []);
  const [brewNotes, setBrewNotes] = useAsyncStorage<Record<string, any>[]>("brewNotes", []);

  // Modal states
  const [coffeeModalVisible, setCoffeeModalVisible] = useState(false);
  const [equipmentModalVisible, setEquipmentModalVisible] = useState(false);
  const [brewNotesModalVisible, setBrewNotesModalVisible] = useState(false);

  // Handlers for saving data
  const handleSaveCoffee = (details: Record<string, string>) => {
    setSavedCoffees((prev) => [...prev, details]);
    Alert.alert("Success", "Your coffee has been saved!");
    setCoffeeModalVisible(false); // Close modal after saving
  };
  
  const handleSaveEquipment = (details: Record<string, string>) => {
    setSavedEquipment((prev) => [...prev, details]);
    Alert.alert("Success", "Your equipment has been saved!");
    setEquipmentModalVisible(false); // Close modal after saving
  };

  const handleSaveBrewNote = (details: Record<string, any>) => {
    const newNote = { id: uuidv4(), ...details };
    setBrewNotes((prev) => [...prev, newNote]);
    Alert.alert("Success", "Your brew notes have been saved!");
    setBrewNotesModalVisible(false); // Close modal after saving
  };
  useEffect(() => {
    console.log(brewNotes);
  }, [brewNotes]);
  

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
  const coffeeFormNames = {
    header: 'Add new coffee',
    alert: 'coffee', 
    saveButton: 'Save Coffee', 
  }
  const equipmentFormNames = {
    header: 'Add new equipment',
    alert: 'equipment', 
    saveButton: 'Save Equipment', 
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
    button: {
      //borderWidth: 1, // border width
      //borderColor: 'black', // border color
      //borderStyle: 'solid', // border style
      minWidth: '89%',
      paddingRight: 10,
      paddingLeft: 10,
      paddingTop: 5,
      paddingBottom: 5,
      alignSelf: 'center',
      borderRadius: 2,
      // iOS shadow
    //shadowColor: '#ffffff', // Shadow color
    shadowOffset: { width: -3, height: 4 }, // Shadow offset
    shadowOpacity: 1, // Shadow opacity
    shadowRadius: 0.5, // Shadow blur radius
    // Android shadow
    elevation: 5, // Elevation creates shadow on Android
    },

    h1: {
      fontSize: 18,
      color: "#ECECEC",
    },
 
  outerContainer: { // not using atm
    flexGrow: 1,
    backgroundColor: "#212121",
    padding: 10,
    paddingBottom: 50,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
  },
  sectionText: { 
    color: '#ECECEC',
    fontSize: 16,
    marginBottom: 10,
  },

  brewItem: {
    marginBottom: 5,
    margin: 10,
    padding: 10,
    backgroundColor: "#404040",
    borderRadius: 2,
  },
  brewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ECECEC",
  },
  brewDetail: {
    fontSize: 14,
    color: "#AFAFAF",
  },
  emptyText: {
    fontSize: 16,
    color: "#AFAFAF",
    textAlign: "center",
  },
  modalOverlay: {//slet
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
  },
  modalContent: {//slet
    width: '90%',
    flex: 0.9,
    borderRadius: 10, // Rounded corners
    paddingBottom: 10, // Padding inside the modal
    padding: 2,
    marginTop:'15%',
    gap: 10,
  },
  coffeeColors:{//slet
    backgroundColor: '#791740', // Background color for the modal
  },
  equipmentColors:{//slet
    backgroundColor: '#0E3A55',
  },
  brewNotesColors:{//slet
    backgroundColor: '#024E3C',
  },
  myBrewsColors:{//slet
    color: '#fff',
    backgroundColor: '#000',
  },

  myBrewsContainer: {
    borderRadius: 3,
    backgroundColor:"#303030",
    width: '80%',
    flex: 1,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F22D3D', 
    borderStyle: 'solid', 
  },
  myBrewsHeader: {
    //alignSelf: 'center',
  },
  headerWrapper: {
    //flexGrow:1,
    width: '100%',
    backgroundColor: '#7F151E',
    padding: 10,
    alignItems: 'center',
    borderRadius: 2,
  },

});
