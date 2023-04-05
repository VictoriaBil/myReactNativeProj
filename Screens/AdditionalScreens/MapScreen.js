import React from "react";
import Header from "../../components/Header/Header";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";

const MapScreen = () => {
  return (
    <View>
      <Header title="Карта" />
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
            title="travel photo"
          />
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapScreen;
