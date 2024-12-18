import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const RatingSlider = ({ rating, onChange }: { rating: number; onChange: (value: number) => void }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={styles.sliderContainer}>
      {stars.map((star) => (
        <TouchableOpacity key={star} onPress={() => onChange(star)} style={[styles.starItem, rating === star && styles.selectedStar]}>
          <Text style={[styles.starText, rating === star && styles.selectedStarText]}>{`${star}`}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#303030",
    borderRadius: 5,
  },
  starItem: {
    paddingLeft: 15,
    paddingRight: 15,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#404040",
  },
  selectedStar: {
    backgroundColor: "#05A57E",
  },
  starText: {
    color: "#ECECEC",
    fontSize: 18,
  },
  selectedStarText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default RatingSlider;
