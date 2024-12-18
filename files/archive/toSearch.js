import React, { useState } from "react";

 
 
 const [searchQuery, setSearchQuery] = useState("");
    const filteredBrewNotes = brewNotes.filter(note =>
        Object.values(note)
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

//FlatList
<TextInput
                style={styles.searchBar}
                placeholder="Search brews..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />



data={filteredBrewNotes.reverse()} 


searchBar: { 
    margin: 10, 
    padding: 8,
    backgroundColor: '#212121',
    color:"#ECECEC",
    borderWidth: 1, 
    borderRadius: 5 
  },