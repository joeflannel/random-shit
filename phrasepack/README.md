# 🌍 Tiny Country Phrasepack

A **multilingual phrase learning app** that helps travelers learn essential phrases in the local language of any country they visit. Built with React, TypeScript, and Vite.

## ✨ Features

### 🗺️ **Smart Country Selection**
- **200+ countries** with intelligent language mapping using ISO 3166-1 alpha-2 standards
- **Dynamic filtering** - countries speaking your native language are automatically hidden
- **Search functionality** to quickly find specific countries
- **Organized by continents** for easy navigation


### 🌐 **Multi-Language Interface**
- **5 interface languages**: English, Russian, Spanish, Chinese, German
- **First-run language selection** modal for new users
- **Persistent language preferences** saved in local storage
- **Easy language switching** from the header

### 📚 **Comprehensive Phrase Library**
- **essential phrases** in 5 categories:
  - **Greetings**: Hello, good morning, how are you, etc.
  - **Politeness**: Please, thank you, excuse me, sorry, etc.
  - **Directions**: Where is..., left, right, straight ahead, etc.
  - **Food & Dining**: Water, coffee, menu, bill, vegetarian, etc.
  - **Emergency**: Help, police, ambulance, doctor, hospital, etc.

### 🔤 **Advanced Language Features**
- **Transliteration support** for non-Latin scripts
- **Contextual sentences** with real-world usage examples
- **High-quality TTS** using ElevenLabs AI voices with browser TTS fallback
- **100+ supported languages** with native-sounding AI voices

### 📱 **Progressive Web App (PWA)**
- **Offline capable** - works without internet after first load
- **Installable** on mobile and desktop devices
- **Responsive design** optimized for all screen sizes
- **Fast loading** with Vite build optimization

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- ElevenLabs API key (optional, for enhanced TTS)

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd phrasepack

# Install dependencies
npm install

# Set up ElevenLabs API key (optional)
cp .env.example .env
# Edit .env and add your ElevenLabs API key

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### ElevenLabs TTS Setup (Optional)
For enhanced text-to-speech with AI-generated voices:

1. **Get an API key** from [ElevenLabs](https://elevenlabs.io/):
   - Visit [elevenlabs.io](https://elevenlabs.io/)
   - Sign up for a free account
   - Go to your profile settings
   - Copy your API key from the "API Key" section
   - Free tier includes 10,000 characters per month

2. **Create a `.env` file** in the project root:
   ```bash
   VITE_ELEVENLABS_API_KEY=your_api_key_here
   ```
   Replace `your_api_key_here` with the actual API key you copied

3. **Restart the development server**

**Note**: Never commit your `.env` file to version control. It's already added to `.gitignore` to protect your API key.

**Pricing Information:**
- **Free Tier**: 10,000 characters per month (perfect for testing)
- **Creator Plan**: $22/month for 30,000 characters
- **Independent Publisher**: $99/month for 250,000 characters
- **Growing Business**: $330/month for 1,000,000 characters

The app will automatically use ElevenLabs voices when available and fall back to browser TTS if needed.

**Supported Languages with AI Voices:**
- **European Languages**: English, Spanish, French, German, Italian, Portuguese, Polish, Dutch, Swedish, Danish, Finnish, Norwegian, Czech, Hungarian, Romanian, Slovak, Slovenian, Bulgarian, Croatian, Estonian, Latvian, Lithuanian, Maltese, Greek, Catalan, Basque, Galician, Icelandic, Irish, Welsh, Albanian, Macedonian, Serbian, Ukrainian, Belarusian
- **Asian Languages**: Japanese, Chinese, Korean, Thai, Vietnamese, Indonesian, Malay, Filipino, Burmese, Khmer, Lao, Mongolian, Georgian, Armenian, Azerbaijani
- **Middle Eastern**: Arabic, Hebrew, Persian, Turkish, Urdu
- **South Asian**: Hindi, Bengali, Gujarati, Kannada, Malayalam, Marathi, Nepali, Punjabi, Sinhala, Tamil, Telugu
- **African Languages**: Swahili, Zulu, Afrikaans, Xhosa, Yoruba, Igbo, Hausa, Somali, Amharic, and many more
- **Other Languages**: Russian, Kazakh, Kyrgyz, Uzbek, Tajik, and 50+ additional languages

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🏗️ Architecture

### **Frontend Stack**
- **React 19** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **React Router DOM** for navigation
- **CSS-in-JS** for component styling

### **Data Structure**
- **JSON-based phrase packs** for easy maintenance
- **Country-language mapping** using ISO standards
- **Modular architecture** for easy language additions

### **Key Components**
- `App.tsx` - Main app with language modal and routing
- `CountryPicker.tsx` - Country selection with smart filtering
- `PhraseList.tsx` - Phrase display with translations and TTS
- `i18n.ts` - Internationalization system with phrase translations

## 🌍 Supported Languages

### **Interface Languages** (User can choose)
- 🇺🇸 **English** - Default system language
- 🇷🇺 **Russian** - Русский
- 🇪🇸 **Spanish** - Español  
- 🇨🇳 **Chinese** - 中文
- 🇩🇪 **German** - Deutsch

### **Learning Languages** (Phrases available)
- 🇺🇸 **English** - 50+ phrases
- 🇪🇸 **Spanish** - 50+ phrases  
- 🇫🇷 **French** - 50+ phrases
- 🇩🇪 **German** - 50+ phrases
- 🇮🇹 **Italian** - 50+ phrases
- 🇯🇵 **Japanese** - 50+ phrases with transliteration
- 🇨🇳 **Chinese** - 50+ phrases with transliteration
- 🇷🇺 **Russian** - 50+ phrases with transliteration
- 🇵🇹 **Portuguese** - 50+ phrases
- 🇮🇳 **Hindi** - 50+ phrases with transliteration
- 🇧🇷 **Brazilian Portuguese** - 50+ phrases
- 🇲🇽 **Mexican Spanish** - 50+ phrases

**Plus 200+ additional countries** covering all continents with their respective languages including:
- **Europe**: Netherlands, Belgium, Switzerland, Austria, Sweden, Norway, Denmark, Finland, Poland, Czech Republic, Hungary, Romania, Bulgaria, Croatia, Slovenia, Slovakia, Estonia, Latvia, Lithuania, Ireland, Greece, Cyprus, Malta, Iceland, Luxembourg, Liechtenstein, Monaco, Andorra, San Marino, Vatican City
- **Asia**: South Korea, Thailand, Vietnam, Indonesia, Malaysia, Singapore, Philippines, Myanmar, Cambodia, Laos, Bangladesh, Sri Lanka, Nepal, Pakistan, Afghanistan, Iran, Iraq, Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, Oman, Yemen, Jordan, Lebanon, Syria, Israel, Turkey, Georgia, Armenia, Azerbaijan, Kazakhstan, Uzbekistan, Kyrgyzstan, Tajikistan, Turkmenistan, Mongolia, Bhutan, Maldives
- **Africa**: Egypt, Morocco, Algeria, Tunisia, Libya, Sudan, Ethiopia, Kenya, Tanzania, Uganda, Rwanda, Burundi, DR Congo, Republic of Congo, Gabon, Cameroon, Nigeria, Ghana, Ivory Coast, Senegal, Mali, Burkina Faso, Niger, Chad, Central African Republic, South Sudan, Somalia, Djibouti, Eritrea, South Africa, Namibia, Botswana, Zimbabwe, Zambia, Malawi, Mozambique, Eswatini, Lesotho, Madagascar, Mauritius, Seychelles, Comoros, Cape Verde, Guinea-Bissau, Guinea, Sierra Leone, Liberia, Togo, Benin, São Tomé and Príncipe, Equatorial Guinea, Angola, Mauritania, Western Sahara
- **South America**: Argentina, Chile, Peru, Colombia, Venezuela, Ecuador, Bolivia, Paraguay, Uruguay, Guyana, Suriname, Falkland Islands
- **Oceania**: Australia, New Zealand, Fiji, Papua New Guinea, Solomon Islands, Vanuatu, New Caledonia, French Polynesia, Samoa, Tonga, Kiribati, Tuvalu, Nauru, Palau, Marshall Islands, Micronesia, Cook Islands, Niue, Tokelau, American Samoa, Guam, Northern Mariana Islands
- **Caribbean**: Cuba, Jamaica, Haiti, Dominican Republic, Puerto Rico, Trinidad and Tobago, Barbados, Grenada, Saint Lucia, Saint Vincent and the Grenadines, Antigua and Barbuda, Saint Kitts and Nevis, Dominica, Bahamas, Turks and Caicos Islands, Cayman Islands, British Virgin Islands, U.S. Virgin Islands, Aruba, Curaçao, Sint Maarten, Caribbean Netherlands, French Guiana, Guadeloupe, Martinique, Saint Barthélemy, Saint Martin, Anguilla, Montserrat, Netherlands Antilles

## 🔧 Configuration

### **Adding New Languages**
1. Create `phrases-{lang}.json` in `src/data/`
2. Add translations to `i18n.ts` phrase and sentence mappings
3. Update `countryLanguages.json` with new country mappings
4. Add language to `DEFAULT_COUNTRIES` in `CountryPicker.tsx`

### **Customizing Phrases**
- Edit phrase files in `src/data/phrases-*.json`
- Follow the structure: `id`, `category`, `native`, `translation`, `transliteration`, `sentenceNative`, `sentenceTranslation`
- Categories: `greetings`, `politeness`, `directions`, `food`, `emergency`

## 📱 Usage

### **First Time Setup**
1. **Choose your native language** from the modal
2. **Select a country** you want to visit
3. **Browse phrases** by category
4. **Tap phrases** to see detailed examples
5. **Use TTS** to hear pronunciation

### **Daily Use**
- **Change language** anytime from the header button
- **Search countries** using the search bar
- **Bookmark phrases** by tapping them (saves last viewed)
- **Practice pronunciation** with text-to-speech

## 🎯 Use Cases

### **Travelers**
- Learn essential phrases before trips
- Practice pronunciation with TTS
- Access offline phrase library
- Quick reference during travel

### **Language Learners**
- Study common phrases by category
- Compare native and target languages
- Practice with contextual sentences
- Build vocabulary systematically

### **Tourism Industry**
- Provide guests with language tools
- Support multiple interface languages
- Offline-capable for remote locations
- Easy to customize for specific needs

## 🔮 Future Enhancements

- [ ] **Audio recordings** for native speaker pronunciation
- [ ] **Quiz mode** for phrase practice
- [ ] **Favorites system** for saving important phrases
- [ ] **Progress tracking** for learning goals
- [ ] **Social features** for sharing phrases
- [ ] **More languages** and regional dialects
- [ ] **Voice recognition** for pronunciation practice

## 🤝 Contributing

### **Adding New Phrases**
1. Fork the repository
2. Add phrases to appropriate language files
3. Update translations in `i18n.ts`
4. Test with different interface languages
5. Submit a pull request

### **Adding New Languages**
1. Create phrase pack JSON file
2. Add interface language support
3. Update country mappings
4. Test all features
5. Submit comprehensive PR

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vite Team** for the fast build tool
- **Open source community** for inspiration and tools

---

**Made with ❤️ for travelers and language learners around the world**
