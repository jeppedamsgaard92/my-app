import React from "react";
import { Button, Alert, View, } from "react-native";

type props = {
	handleSave: (index: number) => void;
	deleteSave: (index: number) => void;
	index: number;
};

const SaveAndDeleteBundle: React.FC<props> = ({ handleSave, deleteSave, index }) => {
	return (
		<View style={{flexDirection:'row', width:'100%', gap:20, justifyContent:'center',}}>
			<Button
				title="Save"
				onPress={() => handleSave(index)}
				color="#4CAF50"
			/>
			<Button
				title="Delete"
				onPress={() =>
					Alert.alert(
						"Confirm Deletion",
						"Are you sure you want to delete this?",
						[
							{ text: "Cancel", style: "cancel" },
							{
								text: "Delete",
								style: "destructive",
								onPress: () => deleteSave(index),
							},
						]
					)
				}
				color="#FF0000"
			/>
		
		</View>
			
	);
};


export default SaveAndDeleteBundle;


