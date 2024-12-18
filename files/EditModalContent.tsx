import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";

type EditModalContentProps = {
	item: Record<string, string>;
	onSave: (updatedItem: Record<string, string>) => void;
	onCancel: () => void;
};

const EditModalContent: React.FC<EditModalContentProps> = ({item,onSave,onCancel,}) => {
	const [updatedItem, setUpdatedItem] = useState<Record<string, string>>({ ...item });

	const handleFieldChange = (key: string, value: string) => {
		setUpdatedItem((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<View style={styles.modalContainer}>
			<ScrollView contentContainerStyle={styles.contentContainer}>
				<Text style={styles.modalHeader}>Edit Item</Text>
				{Object.entries(updatedItem)
					.filter(([key]) => key !== "id" && key !== "images")
					.map(([key, value]) => (
						<View key={key} style={styles.field}>
							<Text style={styles.label}>{key}</Text>
							<TextInput
								style={styles.input}
								value={value || ""}
								onChangeText={(text) => handleFieldChange(key, text)}
							/>
						</View>
					))}
			</ScrollView>
			<View style={styles.buttonsContainer}>
				<View style={[styles.button, { backgroundColor: "#05A57E", shadowColor: '#9DF1DD'}]}>
				<Button title="Save" onPress={() => onSave(updatedItem)} color="#ECECEC" />
				</View>
				<View style={[styles.button, { backgroundColor: "#F44336", shadowColor: '#F38C95'}]}>
				<Button title="Cancel" onPress={onCancel} color="#ECECEC" />
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		padding: 10,
		backgroundColor: "#303030",
		borderRadius: 10,
		flex: 1,
		marginBottom:10,
	},
	contentContainer: {
		padding: 20,
	},
	modalHeader: {
		fontSize: 18,
		color: "#ECECEC",
		padding:10,
		alignSelf: 'center',
	},
	field: {
		marginBottom: 15,
	},
	label: {
		fontSize: 14,
		color: "#ECECEC",
		marginBottom: 5,
	},
	input: {
		backgroundColor: "#404040",
		color: "#ECECEC",
		borderRadius: 5,
		padding: 10,
		borderWidth: 1,
		borderColor: "#505050",
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 20,
		paddingRight:20,
		paddingLeft:20,

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
	},
});

export default EditModalContent;
