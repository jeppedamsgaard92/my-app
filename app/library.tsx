import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, } from "react-native";
import { useAsyncStorage } from "../files/useAsyncStorage";
import ButtonForModal from "../files/ButtonForModal";
import ModalForAddNew from '../files/ModalForAddNew';
import DisplaySavedA from '../files/DisplaySavedA';
import DisplaySavedB from '../files/DisplaySavedB';
import { useStateContext } from "../files/StateContext"; 



export default function LibraryScreen() {
  const { savedCoffees, setSavedCoffees, savedEquipment, setSavedEquipment, brewNotes, setBrewNotes } = useStateContext();

  // State managed via `useAsyncStorage`
  // const [savedCoffees, setSavedCoffees] = useAsyncStorage<Record<string, string>[]>("coffees", []);
  // const [savedEquipment, setSavedEquipment] = useAsyncStorage<Record<string, string>[]>("equipment", []);
  // const [brewNotes, setBrewNotes] = useAsyncStorage<Record<string, any>[]>("brewNotes", []);

  const [editState, setEditState] = useState<Record<number, Record<string, string>>>({});

  // Sets data in fields to edit
  useEffect(() => {
    const initialEditState = savedCoffees.reduce(
      (acc: Record<number, Record<string, string>>, item, index) => {
        acc[index] = { ...item };
        return acc;
      },
      {} as Record<number, Record<string, string>>
    );
    setEditState(initialEditState);
  }, [savedCoffees]);

  // Modal states
  const [coffeeModalVisible, setCoffeeModalVisible] = useState(false);
  const [equipmentModalVisible, setEquipmentModalVisible] = useState(false);
  const [brewNotesModalVisible, setBrewNotesModalVisible] = useState(false);

  const names = {
    coffee: {
      header: 'Saved coffees',
      alert: 'coffee', 
      saveButton: 'Save Coffee', 
      storage: 'coffees',
    },
    equipment: {
      header: 'Saved equipment',
      alert: 'equipment', 
      saveButton: 'Save Equipment', 
      storage: 'equipment',
    }, 
    brewNotes: {
      header: 'Saved brew notes',
      alert: 'brew note', 
      saveButton: 'Save Brew Note', 
      storage: 'brewNotes',
    }
  }
  const colors = {
    coffee: {backgroundColor: '#D32E96', shadowColor: '#F384F3', modalBackground: '#791740'},
    equipment: {backgroundColor: '#2E95D3', shadowColor: '#84C9F3', modalBackground: '#0E3A55'},
    brewNotes: {backgroundColor: '#05A57E', shadowColor: '#9DF1DD', modalBackground: '#024E3C'},
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <ButtonForModal 
          setModalVisible={setCoffeeModalVisible} 
          buttonStyles={colors.coffee} 
          title={names.coffee.header}/>
        {/* Equipment button */}
        <ButtonForModal setModalVisible={setEquipmentModalVisible} buttonStyles={colors.equipment} title={names.equipment.header}/> 
        {/* Brew Notes Button */}
        <ButtonForModal setModalVisible={setBrewNotesModalVisible} buttonStyles={colors.brewNotes} title={names.brewNotes.header}/> 
      </View>
    
      {/* Coffee Modal */}
      <ModalForAddNew
        modalVisible={coffeeModalVisible}
        setModalVisible={setCoffeeModalVisible}
        modalBackgroundColor={colors.coffee.modalBackground}
        >
        <DisplaySavedA
            titleColor={colors.coffee.backgroundColor}
            names={names.coffee}
            savedEntry={savedCoffees}
            setSavedEntry={setSavedCoffees}
        />
      </ModalForAddNew>
      
      {/* Equipment Modal */}
      <ModalForAddNew 
        modalVisible={equipmentModalVisible} 
        setModalVisible={setEquipmentModalVisible} 
        modalBackgroundColor={colors.equipment.modalBackground}
        >
          <DisplaySavedA
            titleColor={colors.equipment.backgroundColor} 
            names={names.equipment} 
            savedEntry={savedEquipment} 
            setSavedEntry={setSavedEquipment}
          />
      </ModalForAddNew>

      {/* Brew Notes Modal */}
      <ModalForAddNew 
        modalVisible={brewNotesModalVisible} 
        setModalVisible={setBrewNotesModalVisible} 
        modalBackgroundColor={colors.brewNotes.modalBackground}
        >
        <DisplaySavedB
          names={names.brewNotes} 
          savedEntry={brewNotes} 
          setSavedEntry={setBrewNotes}
        />
      </ModalForAddNew>
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
