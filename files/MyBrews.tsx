import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TextInput, Image, Modal, TouchableOpacity, ScrollView, Button } from "react-native";
import ModalForAddNew from './ModalForAddNew'

type Props = {
	brewNotes: Record<string, any>[];
};

const MyBrews: React.FC<Props> = ({ brewNotes }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedNote, setSelectedNote] = useState<Record<string, any> | null>(null);
	const [noteModalVisible, setNoteModalVisible] = useState(false);

	// Filter based on search query
	const filteredBrewNotes = brewNotes.filter((note) =>
		Object.values(note).join(" ").toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Open modal with selected note
	const openNoteModal = (note: Record<string, any>) => {
		setSelectedNote(note);
		setNoteModalVisible(true);
	};

	return (
		<View style={styles.container}>
			<View style={styles.headerWrapper}>
				<Text style={styles.h1}>My brews</Text>
			</View>
			{/* Search Bar */}
			<TextInput
				style={styles.searchBar}
				placeholder="Search brews..."
				value={searchQuery}
				onChangeText={setSearchQuery}
			/>

			{/* Brew List */}
			{filteredBrewNotes.length > 0 ? (
				<FlatList
					data={filteredBrewNotes.reverse()}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<TouchableOpacity style={styles.brewItem} onPress={() => openNoteModal(item)}>
							<Text style={styles.brewTitle}>{item.coffee || "Unknown Coffee"}</Text>
							<Text style={styles.brewDetail}>Date: {item.date}</Text>
							<Text style={styles.brewDetail}>Rating: {item.rating}</Text>
							<Text style={styles.brewDetail} numberOfLines={1}>
								Comments: {item.comments}
							</Text>
						</TouchableOpacity>
					)}
				/>
			) : (
				<Text style={styles.emptyText}>No brew notes saved yet.</Text>
			)}

			{/* Modal for displaying detailed brew note */}
			<ModalForAddNew modalVisible={noteModalVisible} setModalVisible={setNoteModalVisible} modalBackgroundColor='#7F151E'>
        <ScrollView style={styles.brewNotesContainer}>
          <Text style={styles.modalHeader}>Brew Details</Text>
          {selectedNote && (
            <>
              <Text style={styles.modalText}>Coffee: {selectedNote.coffee}</Text>
              <Text style={styles.modalText}>Equipment: {selectedNote.equipment}</Text>
              <Text style={styles.modalText}>Date: {selectedNote.date}</Text>
              <Text style={styles.modalText}>Rating: {selectedNote.rating}</Text>
              <Text style={styles.modalText}>Comments: {selectedNote.comments}</Text>
            
              {/* Display Images */}
              {selectedNote.images && selectedNote.images.length > 0 && (
                <View style={styles.imageContainer}>
                  {selectedNote.images.map((uri: string, index: number) => (
                    <Image
                      key={index}
                      source={{ uri }}
                      style={styles.thumbnail}
                    />
                  ))}
                </View>
              )}
            </>
          )}
        </ScrollView>
			</ModalForAddNew>  
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
	  borderRadius: 3,
	  backgroundColor:"#404040",
	  width: '80%',
	  flex: 1,
	  marginBottom: 20,
	  borderWidth: 1,
	  borderColor: '#F22D3D', 
	  borderStyle: 'solid', 
	},
	headerWrapper: {
	  width: '100%',
	  backgroundColor: '#7F151E',
	  padding: 10,
	  alignItems: 'center',
	  borderRadius: 2,
	},
	h1: {
		fontSize: 18,
		color: "#ECECEC",
	},
	searchBar: {
	  margin: 10, 
	  padding: 8,
	  backgroundColor: '#212121',
	  color:"#ECECEC",
	  borderWidth: 1, 
	  borderRadius: 5 
	},
	brewItem: {
		marginBottom: 10,
		marginRight: 9,
		marginLeft: 12,
		marginTop:10,
		padding: 10,
		backgroundColor: "#AB2631",
		borderRadius: 2,
		shadowOffset: { width: -3, height: 4 }, // Shadow offset
		shadowOpacity: 1, // Shadow opacity
		shadowRadius: 0.5, // Shadow blur radius
		shadowColor: '#F05F6B',
	},
	brewTitle: {
		fontSize: 16, //18?
		color: "#ECECEC",
		fontWeight: "bold",
	},
	brewDetail: {
		fontSize: 14,
		color: "#ECECEC",
	},
	emptyText: {
		textAlign: "center",
		color: "#AFAFAF",
		fontSize: 16,
	},	
	modalHeader: {
	  fontSize: 18,
	  color: "#ECECEC",
	  padding:10,
	  alignSelf: 'center',
	},
	modalText: {
		fontSize: 16,
		color: "#ECECEC",
		marginBottom: 5,
	},
	imageContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginVertical: 10,
		justifyContent: "flex-start",
	},
	thumbnail: {
		width: 100,
		height: 100,
		margin: 5,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#05A57E",
	},
	brewNotesContainer:{
	  padding: 10,
	  backgroundColor: "#303030",
	  borderRadius: 10,
	  flex: 1,
	  marginBottom:10,
	},
});

export default MyBrews;
