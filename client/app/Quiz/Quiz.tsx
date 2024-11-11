import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "react-native-paper";
import { Link } from "expo-router";

export default function QuizApp() {
  const [aamScCode, setAamScCode] = useState("");
  const [district, setDistrict] = useState("");
  const [taluk, setTaluk] = useState("");
  const [aamScName, setAamScName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const districts = ["District 1", "District 2", "District 3"];
  const taluks = ["Taluk 1", "Taluk 2", "Taluk 3"];

  const handleSubmit = () => {
    const formData = { aamScCode, district, taluk, aamScName, age, gender };
    console.log("Form Data:", formData);
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Quiz Form
      </Text>

      <Text style={{ marginTop: 10 }}>1. Code of the AAM-SC (NIN ID):</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
        placeholder="Enter AAM-SC Code"
        value={aamScCode}
        onChangeText={setAamScCode}
      />

      <Text>2. District:</Text>
      <Picker
        selectedValue={district}
        onValueChange={(itemValue) => setDistrict(itemValue)}
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 10,
          marginVertical: 10,
        }}
      >
        <Picker.Item label="Select District" value="" />
        {districts.map((d) => (
          <Picker.Item key={d} label={d} value={d} />
        ))}
      </Picker>

      <Text>3. Taluk/Tehsil:</Text>
      <Picker
        selectedValue={taluk}
        onValueChange={(itemValue) => setTaluk(itemValue)}
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 10,
          marginVertical: 10,
        }}
      >
        <Picker.Item label="Select Taluk" value="" />
        {taluks.map((t) => (
          <Picker.Item key={t} label={t} value={t} />
        ))}
      </Picker>

      <Text>4. Name of the AAM-SC and PHC associated:</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
        placeholder="Enter Name"
        value={aamScName}
        onChangeText={setAamScName}
      />

      <Text>5. Age of the CHO:</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
        placeholder="Enter Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Text>6. Gender:</Text>
      <RadioButton.Group
        onValueChange={(newValue) => setGender(newValue)}
        value={gender}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <RadioButton value="Male" />
          <Text>Male</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <RadioButton value="Female" />
          <Text>Female</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <RadioButton value="Other" />
          <Text>Other</Text>
        </View>
      </RadioButton.Group>

      <Link href={"/Quiz/QuizDrop"}>Quiz Drop</Link>
    </ScrollView>
  );
}
