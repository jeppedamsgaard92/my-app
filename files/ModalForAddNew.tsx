import {Modal, KeyboardAvoidingView, View, Button, Platform, StyleSheet } from 'react-native'
import React, { ReactNode } from "react";

type props = {
	modalVisible: boolean;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	children: ReactNode;
	modalBackgroundColor:string;
}

const ModalForAddNew: React.FC<props> = ({modalVisible, setModalVisible, children, modalBackgroundColor}) => {
	return(
		<Modal 
		visible={modalVisible}
		animationType="slide"
		transparent={true} // Enables the transparent background
		onRequestClose={() => setModalVisible(false)}
		>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
			  <View style={styles.modalOverlay}>
			    <View style={[styles.modalContent, {backgroundColor: modalBackgroundColor}]}>
				
				    {children}
				
            <View style={styles.closeButton}>
              <Button color='#ECECEC' accessibilityLabel="button" title="Close" onPress={() => setModalVisible(false)} />
            </View>
			    </View>
			  </View>
			</KeyboardAvoidingView>
		</Modal>
	)
}

const styles = StyleSheet.create ({
	modalOverlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.6)', 
	  },
  modalContent: {
    width: '90%',
    flex: 0.9,
    borderRadius: 10, 
    paddingBottom: '3%', 
    padding: 2,
    marginTop:'10%',
	},
  closeButton: {
    marginBottom:0,
  },
})

export default ModalForAddNew;