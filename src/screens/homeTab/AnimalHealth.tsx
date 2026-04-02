import { useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native';
import HealthRecord from '../../components/app/HealthRecord';

const AnimalHealth: React.FC = () => {
  const route = useRoute();
  const { animalOwnerId } = route.params as { animalOwnerId: string };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <HealthRecord animalOwnerUserId={animalOwnerId} />
    </ScrollView>
  );
};

export default AnimalHealth;
