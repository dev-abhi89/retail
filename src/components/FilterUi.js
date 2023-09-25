// FilterComponent.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AppColors from '../common/AppColors';

const FilterComponent = ({onFilterChange, cancel}) => {
  const [filters, setFilters] = useState({
    type: '',
    route: '',
    area: '',
  });

  const handleInputChange = (field, value) => {
    setFilters({...filters, [field]: value});
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Type:</Text>
        <TextInput
          style={styles.input}
          value={filters.type}
          onChangeText={text => handleInputChange('type', text)}
          placeholder="Type"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Route:</Text>
        <TextInput
          style={styles.input}
          value={filters.route}
          onChangeText={text => handleInputChange('route', text)}
          placeholder="Route"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Area:</Text>
        <TextInput
          style={styles.input}
          value={filters.area}
          onChangeText={text => handleInputChange('area', text)}
          placeholder="Area"
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <TouchableOpacity style={styles.button} onPress={applyFilters}>
          <Text style={styles.buttonText}>Apply Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: AppColors.red}]}
          onPress={cancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    marginRight: 8,
    minWidth: 60,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
  },
  button: {
    backgroundColor: AppColors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
    flex: 1,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default FilterComponent;
