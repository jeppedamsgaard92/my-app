import { StyleSheet } from "react-native";

const commonStyles = StyleSheet.create({
    button: {
        marginTop: 10,
        marginBottom: 30,
        minWidth: '89%',
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        alignSelf: 'center',
        borderRadius: 2,
        shadowOffset: { width: -3, height: 4 }, // iOS shadow offset
        shadowOpacity: 1, // iOS shadow opacity
        shadowRadius: 0.5, // iOS shadow blur radius
        elevation: 5, // Android shadow
    },
    greenButton: {
        backgroundColor: 'green',
    },
    redButton: {
        backgroundColor: 'red',
    },
    blueButton: {
        backgroundColor: 'blue',
    },
    buttonText: {
        color: '#ECECEC',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default commonStyles;
