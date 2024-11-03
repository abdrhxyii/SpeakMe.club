import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import axios from 'axios'

export default function NativeLanguage() {
    // const handleLanguagesAPI =  async() => {
    //     let res = await axios.get('https://global.metadapi.com/lang/v1/languages')
    //         .then( (data) => {
    //             console.log(data, "conrtrtrt")
    //         })
    //         .catch( (err) => {
    //             console.log(err, "errrrr")
    //         })
    // }
    // useEffect(() => {
    //     handleLanguagesAPI()
    // }, [])
    
  return (
    <View>
      <Text>NativeLanguage</Text>
    </View>
  )
}

