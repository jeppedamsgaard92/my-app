import { StyleSheet, Text, View, ScrollView } from "react-native";

export default function HowTo() {
    return(
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.textContainer}>
            <Text style={styles.h1}>How to use this app</Text>
            <Text style={styles.p}>
                In this app you can add notes to your brews! You can log all your notes so you can keep track of your thoughts. No more forgetting about grind settings, temperatures, ratio or any of that.
            </Text>
            <Text style={styles.p}>
                Here's how it works...
            </Text>
            <Text style={styles.h2}>Editing and deleting in "My saved"</Text>
            <Text style={styles.p}>
                Before you begin, know that everything is stored in the “My saved” tab, located on the bottom of your screen. Here you'll find all of your saved coffees, equipment and brew notes. In this tab you can edit and delete your saved entries.
            </Text>
            <Text style={styles.h2}>The three tabs on the bottom</Text>
            <Text style={styles.p}>
                On the bottom of your screen are three tabs: "Add new", "My saved" and "How to use app". In "Add new", you can: <View style={[styles.button, { backgroundColor: '#D32E96', shadowColor: '#F384F3',}]}><Text>Add new coffee</Text></View>,  <View style={[styles.button, { backgroundColor: '#2E95D3', shadowColor: '#84C9F3',}]}><Text>Add new equipment</Text></View> (by equipment, understand brew equipment - maybe your filter setup, espresso setup etc) and <View style={[styles.button, { backgroundColor: '#05A57E', shadowColor: '#9DF1DD',}]}><Text>Add new brew notes</Text></View>. In "My saved" you can edit and delete whatever you've saved. In "How to use app", well, you're looking at it.
            </Text>
            <Text style={styles.h2}>Add new</Text>
            <Text style={styles.p}>
                Here you can add new coffees, the equipment you're using for brewing and brew notes. When you add your brew notes, you can then select one of your saved coffees and the brewing equipment you've used. You have to add a coffee to your brew note. On the bottom half of the screen, all of your brew notes are displayed in the "My brews" box. Here you can easily keep track of your previous notes. You can press each note to have it displayed on the entire screen.
            </Text>
            <Text style={styles.h2}>My saved</Text>
            <Text style={styles.p}>In "My saved" you can edit and delete everything that you've previously saved. Press one of the three buttons: <View style={[styles.button, { backgroundColor: '#D32E96', shadowColor: '#F384F3',}]}><Text>Saved coffees</Text></View>, to edit coffees, <View style={[styles.button, { backgroundColor: '#2E95D3', shadowColor: '#84C9F3',}]}><Text>Saved equipment</Text></View>, to edit equipment, and <View style={[styles.button, { backgroundColor: '#05A57E', shadowColor: '#9DF1DD',}]}><Text>Saved brew notes</Text></View>, to edit brew notes.</Text>
            <Text style={styles.h2}>Good luck and happy brewing</Text>
            <Text style={styles.p}>Thanks very much for installing this app. We wish you the best and most delicious brews! For questions, complaints or suggestions please contact the developer team on:</Text>
            <Text style={[styles.p, {alignSelf: 'center'}]}>jeppedamsgaard92gmail.com</Text>
        </ScrollView>
    </View>
    ) 
}

const styles = StyleSheet.create({
    container: {
        paddingTop:'20%',
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#212121",
        padding: 17,
      },
      textContainer: {
        margin: 3,
        gap: 15,
        paddingBottom:50,
      },
      p: {
        fontSize: 16,
        color: "#ECECEC",
        lineHeight: 22,
      },
      h1: {
        fontSize: 20,
        color: "#0D0D0D",
        backgroundColor: '#05A57E',
        padding: 5,
        borderRadius: 2,
      },
      h2: {
        fontSize: 16,
        width: 'auto',
        color: "#0D0D0D",
        backgroundColor: '#9DF1DD',
        padding: 5,
        borderRadius: 2,
      },
      button: {
        borderRadius: 2,
        // iOS shadow
        shadowOffset: { width: -3, height: 4 }, 
        shadowOpacity: 1, 
        shadowRadius: 0.5, 
        // Android shadow
        elevation: 5, // Elevation creates shadow on Android
      },
})