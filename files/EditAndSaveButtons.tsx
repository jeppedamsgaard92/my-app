import React from "react";
import { View, Button, StyleSheet } from "react-native";

type EditAndSaveButtonsProps = {
	onEdit: () => void;
	onDelete: () => void;
};

const EditAndSaveButtons: React.FC<EditAndSaveButtonsProps> = ({onEdit,onDelete,}) => {
	return (
		<View style={styles.buttonContainer}>
			<View style={[styles.button, { backgroundColor: "#2E95D3", shadowColor: '#84C9F3'}]}>
				<Button title="Edit" onPress={onEdit} color='#ECECEC'  />
			</View>
			<View style={[styles.button, { backgroundColor: "#F44336", shadowColor: '#F38C95'}]}>
				<Button title="Delete" onPress={onDelete} color="#ECECEC" />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	button:{
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 5,
    paddingBottom: 5,
    width:100,
    alignSelf: 'center',
    borderRadius: 2,
    shadowOffset: { width: -3, height: 4 }, 
    shadowOpacity: 1, 
    shadowRadius: 0.5, 
	}
});

export default EditAndSaveButtons;