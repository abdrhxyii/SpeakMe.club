import React, { useMemo, useState, forwardRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Star, X } from 'lucide-react-native';
import CustomBackdrop from '@/components/CustomBackdrop';
import { Colors } from '@/constants/Colors';
import axios from 'axios';
import { baseUrl } from '@/utils/BaseUrl';
import { useUserStore } from '@/store/userStore';

const traitsList = [
  "Friendly Design", "Effective Matching System", "Good Audio Quality", "Lack of Features", "Poor Audio Quality", 
  "Frequent Crashes", "Fun to Talk To", "Good Listener", "Difficult to Understand", "Not Engaging",
];

const ReviewBottomSheet = forwardRef<BottomSheetModal>((_, ref) => {
  const { session } = useUserStore();
  
  const snapPoints = useMemo(() => ['100%'], []);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]); 
  const [rating, setRating] = useState(0); 
  const [feedback, setFeedback] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const toggleTrait = (trait: string) => {
    setSelectedTraits((prevTraits) =>
      prevTraits.includes(trait)
        ? prevTraits.filter((t) => t !== trait)
        : [...prevTraits, trait]
    );
  };

  const handleStarPress = (index: number) => {
    setRating(index + 1); 
  };

    const handleSubmit = async () => {
      console.log(session?.user?.id, "session?.user?.id")
      const reviewData = {
        userId: session?.id,
        rating: rating,
        selectedTraits: selectedTraits,
        feedback: feedback,
      };

      setLoading(true); 

      try {
        await axios.post(`${baseUrl}/customerReviews`, reviewData);
        setRating(0); 
        setSelectedTraits([]); 
        setFeedback('');
        (ref as any)?.current?.close();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('Error submitting review:', error.response?.data || error.message);
        } else {
          console.log('Unexpected error:', error);
        }
      } finally {
        setLoading(false);
      }
    };

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      index={0}
      backdropComponent={(props) => <CustomBackdrop {...props} />}
      enablePanDownToClose
      handleIndicatorStyle={{ display: 'none' }}
      style={{ backgroundColor: 'white', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
    >
      <BottomSheetScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Leave a Review</Text>
          <TouchableOpacity onPress={() => (ref as any)?.current?.close()}>
            <X size={30} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Connection Quality</Text>
        <Text style={styles.sectionDescription}>Was the audio call clear and stable?</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, i) => (
            <TouchableOpacity key={i} activeOpacity={0.9} onPress={() => handleStarPress(i)}>
              <Star
                size={40}
                color={i < rating ? 'gold' : 'gray'}
                fill={i < rating ? 'gold' : 'gray'}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>How was your experience with SpeakMe?</Text>
        <Text style={styles.sectionDescription}>Pick traits that best describe SpeakMe app.</Text>
        <View style={styles.traitContainer}>
          {traitsList.map((trait) => (
            <TouchableOpacity
              key={trait}
              style={[styles.traitButton, selectedTraits.includes(trait) && styles.selectedTraitButton]}
              onPress={() => toggleTrait(trait)}
            >
              <Text
                style={[styles.traitText, selectedTraits.includes(trait) && styles.selectedTraitText]}
              >
                {trait}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Anything else?</Text>
        <Text style={styles.sectionDescription}>
          We'll check every feedback. Please share any pain points or improvements we should look into.
        </Text>
        <TextInput
          placeholder="Type your feedback here..."
          style={styles.textInput}
          multiline
          value={feedback}
          onChangeText={setFeedback}
        />

        <TouchableOpacity style={styles.publishButton} activeOpacity={0.8} onPress={handleSubmit}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.publishButtonText}>SUBMIT REVIEW</Text>
          )}
        </TouchableOpacity>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 17,
    marginTop: 15,
    fontWeight: '600',
  },
  sectionDescription: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    gap: 10,
  },
  recommendationContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 15,
  },
  recommendationButton: {
    backgroundColor: Colors.light.lightgray,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  selectedButton: {
    backgroundColor: '#d1d1d1',
  },
  emoji: {
    fontSize: 24,
  },
  traitContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  traitButton: {
    backgroundColor: Colors.light.lightgray,
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 8,
  },
  selectedTraitButton: {
    backgroundColor: Colors.light.primary, 
  },
  traitText: {
    color: '#000000',
    fontSize: 14
  },
  selectedTraitText: {
    color: '#FFFFFF', 
  },
  textInput: {
    height: 120,
    borderColor: Colors.light.darkGray,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    textAlignVertical: 'top',
  },
  publishButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  publishButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ReviewBottomSheet;
