import {FlatList, View, TextInput, Button, Alert, StyleSheet} from 'react-native'

type props = {
    savedEntry: Record<string, string>[];
    editState: Record<number, Record<string, string>>;
    setEditState: React.Dispatch<React.SetStateAction<Record<number, Record<string, string>>>>;
    handleSave: (value: number) => void;
    deleteSave: (index: number) => void;
}

const FlatListA: React.FC<props>=({savedEntry, editState, setEditState, handleSave, deleteSave})=> {
    return(
        <FlatList
                style={{maxHeight: '80%'}}
                data={[...savedEntry].filter((item) => Object.values(item).some((value) => value))} // Exclude empty entries
                keyExtractor={(item, index) => `${item.Name}-${index}`}
                renderItem={({ item, index }) => (
                <View style={styles.brewItem}>
                    {/* Editable Name */}
                    <TextInput
                    style={styles.brewTitle}
                    value={editState[index]?.Name || ''} // Display from editState
                    onChangeText={(text) =>
                        setEditState((prev) => ({
                        ...prev,
                        [index]: { ...prev[index], Name: text },
                        }))
                    }
                    />
                    {/* Editable Fields */}
                    {Object.entries(item)
                    .filter(([key, value]) => key !== "Name" && value) // Filter non-empty fields
                    .map(([key, value]) => (
                        <TextInput
                        key={key}
                        style={styles.input}
                        value={editState[index]?.[key] || ''}
                        onChangeText={(text) =>
                            setEditState((prev) => ({
                            ...prev,
                            [index]: { ...prev[index], [key]: text },
                            }))
                        }
                        />
                    ))}

                    {/* Save Button */}
                    <Button
                    title="Save"
                    onPress={() => handleSave(index)}
                    color="#4CAF50"
                    />

                    {/* Delete Button */}
                    <Button
                    title="Delete"
                    onPress={() =>
                        Alert.alert(
                        "Confirm Deletion", // Title
                        "Are you sure you want to delete this?", // Message
                        [
                            { text: "Cancel", style: "cancel" }, // Cancel button
                            { 
                            text: "Delete", 
                            style: "destructive", 
                            onPress: () => deleteSave(index) // Proceed with deletion
                            }
                        ]
                        )
                    }
                    color="#FF0000"
                    />
                </View>
                )}
                />
    )
}

export default FlatListA;

const styles = StyleSheet.create ({
    dataContainer: {
        backgroundColor: "#303030",
        borderRadius: 10,
        flexGrow: 1,
    },
    header: {
        fontSize: 18,
        color: "#ECECEC",
        padding:10,
        alignSelf: 'center',
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
        backgroundColor: "#505050",
        marginBottom: 10,
        padding: 8,
        borderRadius: 5,
    },
    input: {
        fontSize: 14,
        color: "#ECECEC",
        backgroundColor: "#505050",
        marginBottom: 10,
        padding: 8,
        borderRadius: 5,
    },
    emptyText: {
        fontSize: 16,
        color: "#AFAFAF",
        textAlign: "center",
      },
});