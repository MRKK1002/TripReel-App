const categories = [
{
  "id": 1,
  "name": "Mystery Wanderlust",
  "description": "A surprise Thailand adventure where the destination is revealed only when you arrive.",
  "image": "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
  "mood": "adventure",
  "packages": [
    {
      "id": "MW-101",
      "title": "Secret Island Escape",
      "price": 450,
      "discount": "15%",
      "people": 2,
      "images": [
        "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1701&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1586968425481-3285b99f3b44?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": ["3N/4D Stay", "Transfers", "Meals", "Island Activities"],
      "excludes": ["Airfare", "Personal expenses"],
      "agents": [
        { "name": "Mystery Tours Thailand", "price": 430 },
        { "name": "Adventure Seekers", "price": 445 },
        { "name": "Island Hopper Co.", "price": 460 }
      ],
      "touristPlaces": [
        "Phang Nga Bay",
        "James Bond Island",
        "Koh Panyee",
        "Similan Islands"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Island Exploration",
          "morning": "Arrive at Phuket International Airport, transfer to your hotel on the island.",
          "afternoon": "Lunch at a local Thai restaurant, relax on the beach and explore nearby shops.",
          "evening": "Welcome dinner at the hotel, orientation about the island activities.",
          "dining": "Welcome Dinner included at the hotel",
          "budget": 120
        },
        {
          "day": 2,
          "theme": "Phang Nga Bay & James Bond Island",
          "morning": "Boat trip to Phang Nga Bay, explore limestone cliffs and caves.",
          "afternoon": "Visit James Bond Island, take photos and enjoy kayaking around the bay.",
          "evening": "Return to hotel, free time at leisure.",
          "dining": "Breakfast & Lunch included",
          "budget": 150
        },
        {
          "day": 3,
          "theme": "Koh Panyee & Similan Islands",
          "morning": "Visit the floating village of Koh Panyee, interact with locals.",
          "afternoon": "Snorkeling and swimming at Similan Islands.",
          "evening": "Return to hotel, optional evening beach walk.",
          "dining": "Breakfast included",
          "budget": 130
        },
        {
          "day": 4,
          "theme": "Departure",
          "morning": "Pack and enjoy a final breakfast on the island.",
          "afternoon": "Check-out and transfer to Phuket International Airport.",
          "evening": "End of trip",
          "dining": "Breakfast included",
          "budget": 50
        }
      ],
      "packingTips": [
        "Light clothing and swimwear",
        "Sunscreen and hat",
        "Waterproof phone case",
        "Comfortable sandals and sneakers",
        "Snorkeling gear (optional)"
      ],
      "culturalNotes": [
        "Respect local customs and dress modestly when visiting temples.",
        "Always ask permission before photographing locals.",
        "Tipping is appreciated but not mandatory.",
        "Avoid touching sacred objects and religious statues."
      ]
    }
  ]
},

 {
  "id": 2,
  "name": "Local Buddy Connect",
  "description": "Explore hidden gems of Thailand with a local companion.",
  "image": "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
  "mood": "cultural",
  "packages": [
    {
      "id": "LBC-201",
      "title": "Bangkok Beyond Tourist Spots",
      "price": 300,
      "discount": "10%",
      "people": 4,
      "images": [
        "https://plus.unsplash.com/premium_photo-1661921538251-4b63b1884019?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1661881114924-536307040c49?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": ["City tour with local", "Street food experience", "Temple visits"],
      "excludes": ["Flights", "Shopping"],
      "agents": [
        { "name": "Local Guides Thailand", "price": 290 },
        { "name": "Bangkok Insiders", "price": 310 },
        { "name": "Cultural Connections", "price": 295 }
      ],
      "touristPlaces": [
        "Grand Palace",
        "Wat Arun",
        "Chatuchak Market",
        "Chinatown (Yaowarat)"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & City Introduction",
          "morning": "Arrive in Bangkok, check-in at hotel, meet your local guide.",
          "afternoon": "Explore hidden temples and backstreet markets.",
          "evening": "Street food dinner tour with your guide.",
          "dining": "Dinner included",
          "budget": 80
        },
        {
          "day": 2,
          "theme": "Cultural Immersion & Temples",
          "morning": "Visit the Grand Palace and Wat Phra Kaew.",
          "afternoon": "Boat ride through Thonburi canals, visit Wat Arun.",
          "evening": "Optional local cooking class.",
          "dining": "Breakfast included",
          "budget": 90
        },
        {
          "day": 3,
          "theme": "Markets & Local Experiences",
          "morning": "Morning at Chatuchak Market, try local snacks.",
          "afternoon": "Walk through Chinatown, discover hidden cafes and shops.",
          "evening": "Farewell dinner with your guide.",
          "dining": "Breakfast & Dinner included",
          "budget": 70
        },
        {
          "day": 4,
          "theme": "Departure",
          "morning": "Pack and enjoy final breakfast.",
          "afternoon": "Check-out and transfer to airport.",
          "evening": "End of trip",
          "dining": "Breakfast included",
          "budget": 50
        }
      ],
      "packingTips": [
        "Light and breathable clothing",
        "Comfortable walking shoes",
        "Sunscreen and hat",
        "Reusable water bottle",
        "Camera or phone for photos"
      ],
      "culturalNotes": [
        "Remove shoes when entering temples.",
        "Dress modestly at religious sites.",
        "Respect monks and avoid physical contact.",
        "Try local etiquette when greeting locals."
      ]
    }
  ]
}
,
{
  "id": 3,
  "name": "Luxury Spa Retreat",
  "description": "Indulge in world-class spa treatments and wellness experiences.",
  "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
  "mood": "relaxation",
  "packages": [
    {
      "id": "LSR-301",
      "title": "Koh Samui Wellness Escape",
      "price": 950,
      "discount": "18%",
      "people": 2,
      "images": [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": ["Luxury resort stay", "Daily spa treatments", "Healthy meals", "Yoga classes"],
      "excludes": ["Flights", "Additional treatments", "Excursions"],
      "agents": [
        { "name": "Spa Sanctuaries", "price": 920 },
        { "name": "Wellness Retreats Thailand", "price": 940 },
        { "name": "Luxury Escapes", "price": 965 }
      ],
      "touristPlaces": [
        "Koh Samui",
        "Chaweng Beach",
        "Big Buddha Temple",
        "Na Muang Waterfall",
        "Fisherman's Village"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Relaxation",
          "morning": "Arrive at Koh Samui Airport and transfer to your luxury resort.",
          "afternoon": "Check-in, relax by the pool, enjoy a welcome spa treatment.",
          "evening": "Dinner at the resort with wellness-focused menu.",
          "dining": "Dinner included",
          "budget": 150
        },
        {
          "day": 2,
          "theme": "Spa Treatments & Yoga",
          "morning": "Morning yoga session followed by a healthy breakfast.",
          "afternoon": "Full body spa treatment and meditation session.",
          "evening": "Dinner with resort chef's special wellness menu.",
          "dining": "Breakfast & Dinner included",
          "budget": 200
        },
        {
          "day": 3,
          "theme": "Island Exploration & Wellness",
          "morning": "Visit Chaweng Beach and Big Buddha Temple.",
          "afternoon": "Optional hiking to Na Muang Waterfall or guided wellness walk.",
          "evening": "Sunset dinner at Fisherman's Village.",
          "dining": "Breakfast & Dinner included",
          "budget": 180
        },
        {
          "day": 4,
          "theme": "Departure",
          "morning": "Pack and enjoy final breakfast at the resort.",
          "afternoon": "Check-out and transfer to Koh Samui Airport.",
          "evening": "End of trip",
          "dining": "Breakfast included",
          "budget": 70
        }
      ],
      "packingTips": [
        "Comfortable spa and yoga clothes",
        "Swimwear and flip-flops",
        "Sunscreen and sunglasses",
        "Reusable water bottle",
        "Light casual evening wear"
      ],
      "culturalNotes": [
        "Respect local customs when visiting temples.",
        "Tip spa therapists and guides if you enjoyed the service.",
        "Keep noise levels low in wellness and meditation areas.",
        "Follow resort guidelines for yoga and wellness sessions."
      ]
    }
  ]
},

{
  "id": 4,
  "name": "Adventure Jungle Trek",
  "description": "Explore Thailand's wild side with thrilling jungle adventures.",
  "image": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  "mood": "adventure",
  "packages": [
    {
      "id": "AJT-401",
      "title": "Northern Thailand Jungle Explorer",
      "price": 600,
      "discount": "12%",
      "people": 6,
      "images": [
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": ["Jungle trekking", "Elephant sanctuary visit", "Hill tribe villages", "River rafting"],
      "excludes": ["Flights", "Travel insurance", "Personal gear"],
      "agents": [
        { "name": "Wild Thailand Adventures", "price": 580 },
        { "name": "Jungle Explorers Co.", "price": 595 },
        { "name": "Northern Trails", "price": 610 }
      ],
      "touristPlaces": [
        "Chiang Mai",
        "Doi Inthanon National Park",
        "Mae Taeng Valley",
        "Pha Dok Siew Waterfall",
        "Karen Village"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Jungle Orientation",
          "morning": "Arrive at Chiang Mai Airport, transfer to jungle base camp.",
          "afternoon": "Orientation session and light trek around the base camp.",
          "evening": "Dinner at campfire, briefing for next day's adventure.",
          "dining": "Dinner included",
          "budget": 100
        },
        {
          "day": 2,
          "theme": "Jungle Trekking & Hill Tribe Village",
          "morning": "Full day jungle trekking with local guide.",
          "afternoon": "Visit hill tribe villages, learn about local culture.",
          "evening": "Camp overnight in jungle tents.",
          "dining": "Breakfast & Dinner included",
          "budget": 150
        },
        {
          "day": 3,
          "theme": "River Rafting & Elephant Sanctuary",
          "morning": "River rafting adventure in Mae Taeng Valley.",
          "afternoon": "Visit elephant sanctuary, interact with elephants ethically.",
          "evening": "Return to base camp, dinner and relaxation.",
          "dining": "Breakfast & Lunch included",
          "budget": 180
        },
        {
          "day": 4,
          "theme": "Waterfall Hike & Departure",
          "morning": "Hike to Pha Dok Siew Waterfall, morning swim.",
          "afternoon": "Pack and transfer to Chiang Mai Airport.",
          "evening": "End of adventure",
          "dining": "Breakfast included",
          "budget": 70
        }
      ],
      "packingTips": [
        "Lightweight trekking clothes",
        "Sturdy hiking boots",
        "Rain jacket and hat",
        "Insect repellent",
        "Reusable water bottle and snacks"
      ],
      "culturalNotes": [
        "Respect local hill tribe customs.",
        "Avoid feeding or touching wild animals without guidance.",
        "Follow guides’ instructions during jungle treks.",
        "Keep the jungle clean and do not litter."
      ]
    }
  ]
},

{
  "id": 5,
  "name": "Street Food Paradise",
  "description": "A culinary journey through Thailand's best street food scenes.",
  "image": "https://images.unsplash.com/photo-1496318447583-f524534e9ce1",
  "mood": "cultural",
  "packages": [
    {
      "id": "SFP-501",
      "title": "Bangkok Food Adventure",
      "price": 250,
      "discount": "8%",
      "people": 4,
      "images": [
        "https://images.unsplash.com/photo-1496318447583-f524534e9ce1?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1559847844-d963892c9a3e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": ["Food tours", "Cooking class", "Market visits", "Local guide"],
      "excludes": ["Accommodation", "Transport", "Beverages"],
      "agents": [
        { "name": "Thai Food Tours", "price": 235 },
        { "name": "Culinary Bangkok", "price": 245 },
        { "name": "Street Eats Adventures", "price": 260 }
      ],
      "touristPlaces": [
        "Chatuchak Market",
        "Chinatown Food Street",
        "Khlong Toei Market",
        "Saphan Phut Night Market",
        "Or Tor Kor Market"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Street Food Introduction",
          "morning": "Arrive in Bangkok and check-in at the hotel.",
          "afternoon": "Guided walking tour of Chatuchak Market, sample local snacks.",
          "evening": "Dinner at Chinatown Food Street.",
          "dining": "Dinner included",
          "budget": 50
        },
        {
          "day": 2,
          "theme": "Market Visits & Cooking Class",
          "morning": "Visit Khlong Toei Market to explore fresh ingredients.",
          "afternoon": "Participate in Thai cooking class with local chef.",
          "evening": "Free time to explore nearby night markets.",
          "dining": "Breakfast & Lunch included",
          "budget": 70
        },
        {
          "day": 3,
          "theme": "Food Streets & Farewell",
          "morning": "Explore Saphan Phut Night Market for breakfast and snacks.",
          "afternoon": "Visit Or Tor Kor Market for specialty items and souvenirs.",
          "evening": "Farewell dinner with guide, pack and prepare for departure.",
          "dining": "Breakfast & Dinner included",
          "budget": 60
        }
      ],
      "packingTips": [
        "Comfortable walking shoes",
        "Light clothing suitable for hot weather",
        "Reusable water bottle",
        "Small backpack for carrying snacks",
        "Hand sanitizer and wet wipes"
      ],
      "culturalNotes": [
        "Respect local food vendors and try asking before taking photos.",
        "Bargaining is acceptable at markets but remain polite.",
        "Sample a variety of dishes to experience Thai culinary culture.",
        "Dispose of trash properly to maintain cleanliness in markets."
      ]
    }
  ]
},

{
  "id": 6,
  "name": "Beach Hopper Special",
  "description": "Visit Thailand's most pristine and beautiful beaches.",
  "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "mood": "relaxation",
  "packages": [
    {
      "id": "BHS-601",
      "title": "Southern Beaches Circuit",
      "price": 720,
      "discount": "16%",
      "people": 2,
      "images": [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": ["Beach resort stays", "Island transfers", "Water sports", "Sunset cruises"],
      "excludes": ["Flights", "Meals", "Spa services"],
      "agents": [
        { "name": "Beach Bliss Thailand", "price": 700 },
        { "name": "Coastal Adventures", "price": 715 },
        { "name": "Paradise Beaches Co.", "price": 735 }
      ],
      "touristPlaces": [
        "Krabi",
        "Railay Beach",
        "Ao Nang",
        "Koh Phi Phi",
        "Emerald Pool",
        "Tiger Cave Temple"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Beach Relaxation",
          "morning": "Arrive at Krabi Airport and transfer to your beach resort.",
          "afternoon": "Relax on Railay Beach and explore the surroundings.",
          "evening": "Dinner at the resort, sunset view on the beach.",
          "dining": "Dinner included",
          "budget": 150
        },
        {
          "day": 2,
          "theme": "Island Hopping & Water Sports",
          "morning": "Boat tour to Koh Phi Phi and nearby islands.",
          "afternoon": "Snorkeling, swimming, and other water activities.",
          "evening": "Return to resort and enjoy sunset cruise.",
          "dining": "Breakfast & Lunch included",
          "budget": 180
        },
        {
          "day": 3,
          "theme": "Adventure & Exploration",
          "morning": "Visit Emerald Pool for swimming and photo opportunities.",
          "afternoon": "Explore Tiger Cave Temple and nearby trails.",
          "evening": "Leisure time at resort, enjoy local cuisine.",
          "dining": "Breakfast & Dinner included",
          "budget": 160
        },
        {
          "day": 4,
          "theme": "Departure",
          "morning": "Pack and enjoy final breakfast at the resort.",
          "afternoon": "Transfer to Krabi Airport for departure.",
          "evening": "End of trip",
          "dining": "Breakfast included",
          "budget": 70
        }
      ],
      "packingTips": [
        "Swimwear and beachwear",
        "Sunscreen and sunglasses",
        "Flip-flops and water shoes",
        "Light clothing for hot weather",
        "Camera or waterproof phone case"
      ],
      "culturalNotes": [
        "Respect local customs and beaches.",
        "Follow guides’ instructions during water sports.",
        "Do not litter on beaches or islands.",
        "Be mindful of local wildlife and marine life."
      ]
    }
  ]
},

{
  "id": 7,
  "name": "Zen & Adrenaline",
  "description": "Balance meditation with thrilling adventures.",
  "image": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
  "mood": "adventure",
  "packages": [
    {
      "id": "ZA-701",
      "title": "Phuket Yoga & Scuba Combo",
      "price": 700,
      "discount": "20%",
      "people": 2,
      "images": [
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1661894232140-73d96a67731b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": ["Yoga sessions", "Scuba diving", "Stay & transfers"],
      "excludes": ["Flights", "Insurance"],
      "agents": [
        { "name": "Active Thailand", "price": 680 },
        { "name": "Yoga Adventure Co.", "price": 695 },
        { "name": "Dive & Relax Tours", "price": 710 }
      ],
      "touristPlaces": [
        "Phuket",
        "Kata Beach",
        "Big Buddha Phuket",
        "Similan Islands",
        "Coral Island"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Beach Yoga",
          "morning": "Arrive at Phuket Airport and check in to resort.",
          "afternoon": "Relax and attend your first yoga session on Kata Beach.",
          "evening": "Dinner at the resort and sunset meditation.",
          "dining": "Dinner included",
          "budget": 120
        },
        {
          "day": 2,
          "theme": "Scuba Diving Adventure",
          "morning": "Scuba diving session at Similan Islands with guide.",
          "afternoon": "Lunch on the boat and explore coral reefs.",
          "evening": "Return to resort and enjoy evening yoga.",
          "dining": "Breakfast & Lunch included",
          "budget": 180
        },
        {
          "day": 3,
          "theme": "Island Exploration & Relaxation",
          "morning": "Visit Coral Island for beach activities and snorkeling.",
          "afternoon": "Free time for meditation or spa treatments.",
          "evening": "Farewell dinner with ocean view.",
          "dining": "Breakfast & Dinner included",
          "budget": 160
        },
        {
          "day": 4,
          "theme": "Departure",
          "morning": "Final yoga session and breakfast at the resort.",
          "afternoon": "Check-out and transfer to Phuket Airport.",
          "evening": "End of trip",
          "dining": "Breakfast included",
          "budget": 60
        }
      ],
      "packingTips": [
        "Yoga attire and swimwear",
        "Sunscreen and sunglasses",
        "Snorkeling gear or mask",
        "Flip-flops and water shoes",
        "Light clothing for hot weather"
      ],
      "culturalNotes": [
        "Respect local customs at temples and sacred sites.",
        "Follow instructor guidance during yoga and diving sessions.",
        "Do not touch marine life during snorkeling or diving.",
        "Dispose of trash properly on islands."
      ]
    }
  ]
},

{
  "id": 8,
  "name": "Cultural Heritage Tour",
  "description": "Discover Thailand's rich history and ancient temples.",
  "image": "https://images.unsplash.com/photo-1563492065-f722967e12bb",
  "mood": "cultural",
  "packages": [
    {
      "id": "CHT-801",
      "title": "Ancient Capitals Journey",
      "price": 550,
      "discount": "14%",
      "people": 4,
      "images": [
        "https://images.unsplash.com/photo-1563492065-f722967e12bb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1518604666860-b6ac5b9b6136?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": ["Temple visits", "Historical sites", "Cultural guide", "Traditional shows"],
      "excludes": ["Flights", "Entrance fees", "Meals"],
      "agents": [
        { "name": "Heritage Thailand", "price": 530 },
        { "name": "Ancient Wonders Tours", "price": 545 },
        { "name": "Cultural Discoveries", "price": 560 }
      ],
      "touristPlaces": [
        "Ayutthaya",
        "Sukhothai",
        "Wat Chaiwatthanaram",
        "Wat Mahathat",
        "Historical Park",
        "Bang Pa-In Palace"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Temple Visit",
          "morning": "Arrive at Bangkok or Ayutthaya and check in to hotel.",
          "afternoon": "Visit Wat Chaiwatthanaram and explore nearby temples.",
          "evening": "Welcome dinner with traditional Thai performance.",
          "dining": "Dinner included",
          "budget": 130
        },
        {
          "day": 2,
          "theme": "Historical Park & Sukhothai",
          "morning": "Travel to Sukhothai Historical Park, guided tour of ruins.",
          "afternoon": "Cycling and photo tour around ancient temples.",
          "evening": "Traditional Thai dinner and cultural show.",
          "dining": "Breakfast & Lunch included",
          "budget": 150
        },
        {
          "day": 3,
          "theme": "Bang Pa-In Palace & Local Markets",
          "morning": "Visit Bang Pa-In Palace and royal gardens.",
          "afternoon": "Explore local markets and street food delicacies.",
          "evening": "Return to hotel and relax.",
          "dining": "Breakfast & Lunch included",
          "budget": 140
        },
        {
          "day": 4,
          "theme": "Departure",
          "morning": "Pack and enjoy final breakfast.",
          "afternoon": "Transfer to Bangkok Airport for departure.",
          "evening": "End of trip",
          "dining": "Breakfast included",
          "budget": 80
        }
      ],
      "packingTips": [
        "Light, comfortable clothing for temples",
        "Hat and sunscreen",
        "Camera or smartphone for photography",
        "Comfortable walking shoes",
        "Reusable water bottle"
      ],
      "culturalNotes": [
        "Dress modestly when visiting temples.",
        "Remove shoes before entering sacred sites.",
        "Ask permission before taking photos of locals.",
        "Respect local customs and traditions.",
        "Tipping is appreciated but optional."
      ]
    }
  ]
},

{
  "id": 9,
  "name": "Island Hopping Bliss",
  "description": "Discover Thailand's most beautiful islands.",
  "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "mood": "adventure",
  "packages": [
    {
      "id": "IHB-901",
      "title": "Phuket - Phi Phi - Krabi Cruise",
      "price": 850,
      "discount": "22%",
      "people": 2,
      "images": [
        "https://images.unsplash.com/photo-1585824435346-2b9f8246b115?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1709811140788-521759256b0b?q=80&w=2238&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": ["Island transfers", "Snorkeling", "Meals"],
      "excludes": ["Flights", "Visa fees"],
      "agents": [
        { "name": "Island Paradise Tours", "price": 830 },
        { "name": "Andaman Adventures", "price": 845 },
        { "name": "Southern Thailand Travel", "price": 860 }
      ],
      "touristPlaces": [
        "Phuket",
        "Phi Phi Islands",
        "Maya Bay",
        "Railay Beach",
        "Bamboo Island",
        "Monkey Beach"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Phuket Exploration",
          "morning": "Arrive at Phuket International Airport and check in to hotel.",
          "afternoon": "Relax on Patong Beach and explore local shops.",
          "evening": "Welcome dinner at the hotel.",
          "dining": "Dinner included",
          "budget": 150
        },
        {
          "day": 2,
          "theme": "Phi Phi Islands Cruise",
          "morning": "Boat trip to Phi Phi Islands with snorkeling stops.",
          "afternoon": "Lunch on the boat and explore Maya Bay.",
          "evening": "Return to Phuket, leisure time at hotel.",
          "dining": "Breakfast & Lunch included",
          "budget": 180
        },
        {
          "day": 3,
          "theme": "Krabi Beaches & Bamboo Island",
          "morning": "Travel to Krabi and visit Railay Beach.",
          "afternoon": "Boat to Bamboo Island and enjoy swimming/snorkeling.",
          "evening": "Sunset at Monkey Beach, return to hotel.",
          "dining": "Breakfast & Lunch included",
          "budget": 200
        },
        {
          "day": 4,
          "theme": "Departure",
          "morning": "Pack and enjoy final breakfast.",
          "afternoon": "Transfer to Phuket or Krabi Airport for departure.",
          "evening": "End of trip",
          "dining": "Breakfast included",
          "budget": 80
        }
      ],
      "packingTips": [
        "Swimwear and beachwear",
        "Sunscreen and sunglasses",
        "Waterproof bag for valuables",
        "Snorkeling gear (optional)",
        "Flip-flops and water shoes"
      ],
      "culturalNotes": [
        "Respect marine life and avoid littering beaches.",
        "Ask permission before taking photos of locals.",
        "Dress modestly when visiting temples in Phuket/Krabi.",
        "Follow local safety guidelines during water activities."
      ]
    }
  ]
},

{
  "id": 10,
  "name": "Backpacker Budget Trip",
  "description": "Explore Thailand on a shoestring budget with fellow travelers.",
  "image": "https://images.unsplash.com/photo-1488646953014-85cb44e25828",
  "mood": "adventure",
  "packages": [
    {
      "id": "BBT-1001",
      "title": "Northern Thailand Backpack",
      "price": 180,
      "discount": "5%",
      "people": 8,
      "images": [
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": ["Hostel stays", "Local transport", "Group activities", "Basic meals"],
      "excludes": ["Flights", "Personal expenses", "Extra activities"],
      "agents": [
        { "name": "Backpacker Thailand", "price": 170 },
        { "name": "Budget Travelers", "price": 175 },
        { "name": "Hostel Hoppers", "price": 185 }
      ],
      "touristPlaces": [
        "Chiang Mai",
        "Pai",
        "Chiang Rai",
        "Golden Triangle",
        "White Temple",
        "Night Bazaar"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Chiang Mai Exploration",
          "morning": "Arrive at Chiang Mai Airport and check in to a hostel.",
          "afternoon": "Explore Old City, temples, and local markets.",
          "evening": "Group dinner and orientation.",
          "dining": "Dinner included",
          "budget": 30
        },
        {
          "day": 2,
          "theme": "Pai Adventure",
          "morning": "Travel to Pai via minivan and check into hostel.",
          "afternoon": "Visit Pai Canyon and hot springs.",
          "evening": "Street food exploration in Pai town.",
          "dining": "Breakfast & Dinner included",
          "budget": 40
        },
        {
          "day": 3,
          "theme": "Chiang Rai Highlights",
          "morning": "Travel to Chiang Rai and visit White Temple.",
          "afternoon": "Explore Blue Temple and local markets.",
          "evening": "Overnight stay in Chiang Rai hostel.",
          "dining": "Breakfast & Lunch included",
          "budget": 45
        },
        {
          "day": 4,
          "theme": "Golden Triangle & Departure",
          "morning": "Visit Golden Triangle and Mekong River viewpoint.",
          "afternoon": "Return to Chiang Mai or onward travel.",
          "evening": "End of trip",
          "dining": "Breakfast included",
          "budget": 25
        }
      ],
      "packingTips": [
        "Backpack suitable for 4-5 days",
        "Light clothing and walking shoes",
        "Water bottle and sunscreen",
        "Travel documents and cash",
        "Basic toiletries"
      ],
      "culturalNotes": [
        "Respect local customs and temples.",
        "Ask permission before photographing locals.",
        "Support local businesses and vendors.",
        "Be mindful of environmental conservation."
      ]
    }
  ]
},

{
  "id": 11,
  "name": "Romantic Thai Escape",
  "description": "Perfect honeymoon & couples packages.",
  "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3h",
  "mood": "honeymoon",
  "packages": [
    {
      "id": "RTE-1101",
      "title": "Phuket Honeymoon Delight",
      "price": 1200,
      "discount": "25%",
      "people": 2,
      "images": [
        "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
        "https://images.unsplash.com/photo-1493558103817-58b2924bce99"
      ],
      "includes": ["Private villa", "Candlelight dinner", "Spa"],
      "excludes": ["Flights", "Visa fees"],
      "agents": [
        { "name": "Romantic Getaways", "price": 1150 },
        { "name": "Luxury Honeymoons", "price": 1180 },
        { "name": "Couples Retreat Thailand", "price": 1220 }
      ],
      "touristPlaces": [
        "Phuket",
        "Patong Beach",
        "Promthep Cape",
        "Phi Phi Islands",
        "James Bond Island"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Private Villa",
          "morning": "Arrive at Phuket Airport and transfer to your private villa.",
          "afternoon": "Relax at the villa or take a private beach walk.",
          "evening": "Romantic candlelight dinner at the villa.",
          "dining": "Candlelight dinner included",
          "budget": 200
        },
        {
          "day": 2,
          "theme": "Phi Phi Islands Excursion",
          "morning": "Boat trip to Phi Phi Islands with snorkeling.",
          "afternoon": "Picnic lunch on the beach and sightseeing.",
          "evening": "Return to villa for spa treatments.",
          "dining": "Breakfast & Picnic Lunch included",
          "budget": 250
        },
        {
          "day": 3,
          "theme": "Patong Beach & Promthep Cape",
          "morning": "Explore Patong Beach and nearby local markets.",
          "afternoon": "Sunset at Promthep Cape and photography session.",
          "evening": "Private dinner at a beachfront restaurant.",
          "dining": "Breakfast & Dinner included",
          "budget": 220
        },
        {
          "day": 4,
          "theme": "James Bond Island & Departure",
          "morning": "Day trip to James Bond Island with sightseeing.",
          "afternoon": "Return to Phuket, pack, and check out.",
          "evening": "Departure from Phuket Airport.",
          "dining": "Breakfast included",
          "budget": 180
        }
      ],
      "packingTips": [
        "Light and comfortable clothing",
        "Swimwear and beach cover-ups",
        "Sunscreen and hats",
        "Travel documents and personal items",
        "Camera for couple photos"
      ],
      "culturalNotes": [
        "Respect local customs and traditions.",
        "Tipping is appreciated in restaurants and for guides.",
        "Be mindful when visiting religious sites.",
        "Support local businesses and artisans."
      ]
    }
  ]
},

{
  "id": 12,
  "name": "Family Fun Adventures",
  "description": "Kid-friendly activities and family bonding experiences.",
  "image": "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5",
  "mood": "family",
  "packages": [
    {
      "id": "FFA-1201",
      "title": "Bangkok Family Explorer",
      "price": 480,
      "discount": "12%",
      "people": 4,
      "images": [
        "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": ["Theme parks", "Animal encounters", "Cultural shows", "Family activities"],
      "excludes": ["Flights", "Meals", "Shopping"],
      "agents": [
        { "name": "Family Adventures Thailand", "price": 460 },
        { "name": "Kids First Tours", "price": 475 },
        { "name": "Happy Family Travel", "price": 490 }
      ],
      "touristPlaces": [
        "Safari World",
        "Siam Ocean World",
        "Dusit Zoo",
        "Dream World",
        "Chatuchak Weekend Market",
        "Lumpini Park"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Orientation",
          "morning": "Arrive at Bangkok Airport and transfer to family-friendly hotel.",
          "afternoon": "Relax at the hotel pool and explore nearby attractions.",
          "evening": "Family dinner at the hotel restaurant.",
          "dining": "Dinner included",
          "budget": 100
        },
        {
          "day": 2,
          "theme": "Safari World & Ocean World",
          "morning": "Visit Safari World for animal encounters and shows.",
          "afternoon": "Lunch at Safari World, then head to Siam Ocean World for underwater exploration.",
          "evening": "Return to hotel for leisure time.",
          "dining": "Breakfast & Lunch included",
          "budget": 120
        },
        {
          "day": 3,
          "theme": "Dream World & Cultural Activities",
          "morning": "Explore Dream World amusement park.",
          "afternoon": "Participate in cultural shows and interactive activities.",
          "evening": "Evening stroll at Lumpini Park.",
          "dining": "Breakfast & Snacks included",
          "budget": 130
        },
        {
          "day": 4,
          "theme": "Shopping & Departure",
          "morning": "Visit Chatuchak Weekend Market for souvenirs and snacks.",
          "afternoon": "Return to hotel, pack, and check out.",
          "evening": "Departure from Bangkok Airport.",
          "dining": "Breakfast included",
          "budget": 80
        }
      ],
      "packingTips": [
        "Comfortable walking shoes for the family",
        "Light clothing and sun hats",
        "Sunscreen and swimwear",
        "Snacks and water bottles",
        "Camera for family photos"
      ],
      "culturalNotes": [
        "Respect local customs and family-friendly rules.",
        "Be mindful of safety in crowded areas and parks.",
        "Support local markets and small vendors.",
        "Children should always be supervised during activities."
      ]
    }
  ]
},

{
  "id": 13,
  "name": "Photography Expeditions",
  "description": "Capture Thailand's beauty with guided photography tours.",
  "image": "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
  "mood": "cultural",
  "packages": [
    {
      "id": "PE-1301",
      "title": "Golden Hour Thailand",
      "price": 620,
      "discount": "15%",
      "people": 6,
      "images": [
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1563492065-f722967e12bb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": ["Professional guide", "Photography workshops", "Sunrise/sunset spots", "Equipment tips"],
      "excludes": ["Camera equipment", "Flights", "Accommodation"],
      "agents": [
        { "name": "Photo Safari Thailand", "price": 600 },
        { "name": "Lens Adventures", "price": 615 },
        { "name": "Capture Thailand Tours", "price": 635 }
      ],
      "touristPlaces": [
        "Wat Arun at Sunrise",
        "Floating Markets",
        "Rice Terraces",
        "Traditional Villages",
        "Ancient Temples",
        "Long-tail Boats"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Orientation",
          "morning": "Arrive at Bangkok Airport and transfer to hotel.",
          "afternoon": "Orientation and photography basics workshop.",
          "evening": "Golden hour photography session at nearby scenic spots.",
          "dining": "Dinner included",
          "budget": 120
        },
        {
          "day": 2,
          "theme": "Floating Markets & Temples",
          "morning": "Early visit to floating markets for sunrise shots.",
          "afternoon": "Temple photography at Wat Pho and Wat Arun.",
          "evening": "Sunset photography on the Chao Phraya River.",
          "dining": "Breakfast & Lunch included",
          "budget": 130
        },
        {
          "day": 3,
          "theme": "Countryside & Rice Terraces",
          "morning": "Travel to traditional villages and rice terraces.",
          "afternoon": "Interactive photography workshops and local portraits.",
          "evening": "Golden hour session at scenic countryside spots.",
          "dining": "Breakfast & Snacks included",
          "budget": 140
        },
        {
          "day": 4,
          "theme": "Wrap-up & Departure",
          "morning": "Final shots and review session with guide.",
          "afternoon": "Pack, check-out, and transfer to airport.",
          "evening": "Departure from Bangkok.",
          "dining": "Breakfast included",
          "budget": 80
        }
      ],
      "packingTips": [
        "Camera with extra batteries and memory cards",
        "Tripod for stable shots",
        "Light clothing and sun protection",
        "Comfortable walking shoes",
        "Notebook for photography notes"
      ],
      "culturalNotes": [
        "Ask permission before photographing locals.",
        "Respect temples and sacred sites during shoots.",
        "Keep noise to a minimum in quiet or sacred areas.",
        "Support local guides and vendors."
      ]
    }
  ]
},

{
  "id": 14,
  "name": "Muay Thai Training Camp",
  "description": "Learn the art of Thai boxing from professional trainers.",
  "image": "https://images.unsplash.com/photo-1544737151672-6e4b99de8e86",
  "mood": "adventure",
  "packages": [
    {
      "id": "MTC-1401",
      "title": "Bangkok Boxing Intensive",
      "price": 380,
      "discount": "10%",
      "people": 8,
      "images": [
        "https://images.unsplash.com/photo-1544737151672-6e4b99de8e86?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": ["Training sessions", "Professional coaches", "Equipment", "Certificate"],
      "excludes": ["Accommodation", "Meals", "Medical insurance"],
      "agents": [
        { "name": "Thai Boxing Academy", "price": 360 },
        { "name": "Muay Thai Masters", "price": 375 },
        { "name": "Fighting Fit Thailand", "price": 395 }
      ],
      "touristPlaces": [
        "Lumpinee Boxing Stadium",
        "Rajadamnern Stadium",
        "Training Camps",
        "Traditional Gyms",
        "Fighter Villages"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Orientation",
          "morning": "Arrive in Bangkok and check into hotel.",
          "afternoon": "Orientation session and introduction to Muay Thai techniques.",
          "evening": "Light training session and meet the trainers.",
          "dining": "Dinner included",
          "budget": 100
        },
        {
          "day": 2,
          "theme": "Intensive Training",
          "morning": "Warm-up, cardio, and basic Muay Thai techniques.",
          "afternoon": "Sparring practice and pad training.",
          "evening": "Strength training and cool-down.",
          "dining": "Breakfast & Lunch included",
          "budget": 120
        },
        {
          "day": 3,
          "theme": "Advanced Techniques & Local Culture",
          "morning": "Advanced Muay Thai combos and clinching.",
          "afternoon": "Visit Lumpinee Boxing Stadium and traditional gyms.",
          "evening": "Sunset session and review of training progress.",
          "dining": "Breakfast included",
          "budget": 130
        },
        {
          "day": 4,
          "theme": "Wrap-up & Departure",
          "morning": "Final training session and certificate awarding.",
          "afternoon": "Pack, check-out, and transfer to airport.",
          "evening": "Departure from Bangkok.",
          "dining": "Breakfast included",
          "budget": 50
        }
      ],
      "packingTips": [
        "Light and flexible training clothes",
        "Boxing gloves and wraps (optional, can be provided)",
        "Water bottle and towel",
        "Sunscreen for outdoor training",
        "Comfortable shoes for travel"
      ],
      "culturalNotes": [
        "Respect trainers and local gym rules.",
        "Remove shoes before entering training areas.",
        "Be mindful of local customs during stadium visits.",
        "Stay hydrated and follow safety guidelines."
      ]
    }
  ]
},

{
  "id": 15,
  "name": "Floating Market Explorer",
  "description": "Experience Thailand's traditional floating markets.",
  "image": "https://images.unsplash.com/photo-1559847844-d963892c9a3e",
  "mood": "cultural",
  "packages": [
    {
      "id": "FME-1501",
      "title": "Traditional Markets Tour",
      "price": 220,
      "discount": "8%",
      "people": 6,
      "images": [
        "https://images.unsplash.com/photo-1559847844-d963892c9a3e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1496318447583-f524534e9ce1?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": ["Boat rides", "Market visits", "Local snacks", "Cultural guide"],
      "excludes": ["Transport to markets", "Shopping", "Main meals"],
      "agents": [
        { "name": "River Markets Tours", "price": 210 },
        { "name": "Traditional Thailand", "price": 215 },
        { "name": "Floating Adventures", "price": 230 }
      ],
      "touristPlaces": [
        "Damnoen Saduak",
        "Amphawa Market",
        "Taling Chan Market",
        "Khlong Lat Mayom",
        "Bang Khu Wiang Market"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Orientation",
          "morning": "Arrive in Bangkok and check into your hotel.",
          "afternoon": "Orientation about floating markets and local culture.",
          "evening": "Dinner at local Thai restaurant.",
          "dining": "Dinner included",
          "budget": 80
        },
        {
          "day": 2,
          "theme": "Damnoen Saduak & Amphawa Markets",
          "morning": "Boat trip to Damnoen Saduak Floating Market, explore local shops.",
          "afternoon": "Visit Amphawa Floating Market, taste local snacks and desserts.",
          "evening": "Return to hotel, optional night market visit.",
          "dining": "Breakfast & Lunch included",
          "budget": 100
        },
        {
          "day": 3,
          "theme": "Taling Chan & Khlong Lat Mayom Markets",
          "morning": "Visit Taling Chan Market, enjoy boat rides and local experiences.",
          "afternoon": "Explore Khlong Lat Mayom Market, interact with vendors.",
          "evening": "Return to hotel, free time at leisure.",
          "dining": "Breakfast included",
          "budget": 90
        },
        {
          "day": 4,
          "theme": "Departure",
          "morning": "Pack and enjoy breakfast at hotel.",
          "afternoon": "Check-out and transfer to airport.",
          "evening": "End of trip.",
          "dining": "Breakfast included",
          "budget": 50
        }
      ],
      "packingTips": [
        "Light and comfortable clothing",
        "Hat and sunscreen",
        "Waterproof bag for valuables",
        "Comfortable shoes for walking and boat rides",
        "Camera for photography"
      ],
      "culturalNotes": [
        "Respect vendors and ask permission before taking photos.",
        "Bargaining is common but should be polite.",
        "Keep noise levels low in traditional markets.",
        "Do not litter and respect waterways."
      ]
    }
  ]
},

{
  "id": 16,
  "name": "Eco Wildlife Sanctuary",
  "description": "Experience Thailand's wildlife in ethical sanctuaries.",
  "image": "https://images.unsplash.com/photo-1564349683136-77e08daa1097",
  "mood": "adventure",
  "packages": [
    {
      "id": "EWS-1601",
      "title": "Elephant Sanctuary Experience",
      "price": 420,
      "discount": "13%",
      "people": 4,
      "images": [
        "https://images.unsplash.com/photo-1564349683136-77e08daa1097?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": ["Elephant feeding", "Sanctuary tours", "Wildlife education", "Ethical experiences"],
      "excludes": ["Transport", "Accommodation", "Meals"],
      "agents": [
        { "name": "Ethical Wildlife Tours", "price": 400 },
        { "name": "Sanctuary Adventures", "price": 415 },
        { "name": "Wildlife Conservation Co.", "price": 435 }
      ],
      "touristPlaces": [
        "Elephant Nature Park",
        "Patara Elephant Farm",
        "Wildlife Friends Foundation",
        "Gibbon Rehabilitation Project",
        "Tiger Temple Alternative"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Sanctuary Introduction",
          "morning": "Arrive in Chiang Mai, check into local eco-lodge.",
          "afternoon": "Orientation about wildlife sanctuaries and ethical animal interactions.",
          "evening": "Dinner and briefing for next day activities.",
          "dining": "Dinner included",
          "budget": 90
        },
        {
          "day": 2,
          "theme": "Elephant Care & Observation",
          "morning": "Feeding and bathing elephants under expert guidance.",
          "afternoon": "Guided sanctuary tour and wildlife education session.",
          "evening": "Return to lodge, optional nature walk.",
          "dining": "Breakfast & Lunch included",
          "budget": 120
        },
        {
          "day": 3,
          "theme": "Wildlife & Conservation Activities",
          "morning": "Visit Gibbon Rehabilitation Project and learn about primate care.",
          "afternoon": "Explore Tiger Temple Alternative and other local wildlife projects.",
          "evening": "Relaxation and reflection at the lodge.",
          "dining": "Breakfast included",
          "budget": 110
        },
        {
          "day": 4,
          "theme": "Departure",
          "morning": "Pack and enjoy final breakfast in Chiang Mai.",
          "afternoon": "Check-out and transfer to airport.",
          "evening": "End of trip",
          "dining": "Breakfast included",
          "budget": 50
        }
      ],
      "packingTips": [
        "Comfortable, lightweight clothing",
        "Sturdy walking shoes",
        "Hat and sunscreen",
        "Reusable water bottle",
        "Camera for wildlife photography"
      ],
      "culturalNotes": [
        "Respect sanctuary rules and staff instructions.",
        "Do not feed or touch animals without guidance.",
        "Dispose of waste properly and avoid single-use plastics.",
        "Support ethical wildlife tourism and avoid attractions with exploitation."
      ]
    }
  ]
},

{
  "id": 17,
  "name": "Night Market Crawler",
  "description": "Explore Thailand's vibrant night markets and street life.",
  "image": "https://images.unsplash.com/photo-1541696652-cbf216cb2739",
  "mood": "cultural",
  "packages": [
    {
      "id": "NMC-1701",
      "title": "Bangkok After Dark",
      "price": 180,
      "discount": "7%",
      "people": 6,
      "images": [
        "https://images.unsplash.com/photo-1541696652-cbf216cb2739?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": ["Night market tours", "Street food samples", "Shopping guide", "Local transport"],
      "excludes": ["Shopping budget", "Accommodation", "Main meals"],
      "agents": [
        { "name": "Night Owl Tours", "price": 170 },
        { "name": "After Dark Adventures", "price": 175 },
        { "name": "Market Hoppers", "price": 190 }
      ],
      "touristPlaces": [
        "Chatuchak Weekend Market",
        "Rod Fai Night Market",
        "Patpong Night Market",
        "Khao San Road",
        "Asiatique Riverfront",
        "Huai Khwang Night Market"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Market Orientation",
          "evening": "Check-in at Bangkok hotel, evening briefing about night market tour.",
          "dining": "Dinner on own",
          "budget": 50
        },
        {
          "day": 2,
          "theme": "Night Market Exploration",
          "evening": "Guided tour of Chatuchak & Rod Fai Night Markets, street food sampling, local souvenirs shopping.",
          "dining": "Street food included",
          "budget": 70
        },
        {
          "day": 3,
          "theme": "Cultural Streets & Riverside Markets",
          "evening": "Explore Patpong Night Market, Khao San Road, and Asiatique Riverfront.",
          "dining": "Optional local meals",
          "budget": 60
        },
        {
          "day": 4,
          "theme": "Departure",
          "morning": "Pack and check-out, optional last-minute market visit.",
          "budget": 30
        }
      ],
      "packingTips": [
        "Lightweight evening clothing",
        "Comfortable walking shoes",
        "Reusable shopping bag",
        "Small backpack for valuables",
        "Cash in small denominations"
      ],
      "culturalNotes": [
        "Bargaining is common at markets; stay polite.",
        "Respect local customs and vendors.",
        "Do not litter and dispose of waste responsibly.",
        "Be mindful of personal belongings in crowded areas."
      ]
    }
  ]
},

{
  "id": 18,
  "name": "River & Canal Tours",
  "description": "Discover Thailand through its historic waterways.",
  "image": "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
  "mood": "cultural",
  "packages": [
    {
      "id": "RCT-1801",
      "title": "Chao Phraya Discovery",
      "price": 280,
      "discount": "11%",
      "people": 8,
      "images": [
        "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1559847844-d963892c9a3e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": ["Long-tail boat rides", "Canal tours", "Temple visits from water", "Historical commentary"],
      "excludes": ["Entrance fees", "Meals", "Tips"],
      "agents": [
        { "name": "Waterway Wonders", "price": 265 },
        { "name": "River Journey Tours", "price": 275 },
        { "name": "Canal Cruise Co.", "price": 290 }
      ],
      "touristPlaces": [
        "Chao Phraya River",
        "Khlong Bangkok Noi",
        "Khlong Bangkok Yai",
        "Wat Arun from Water",
        "Royal Barges Museum",
        "Taling Chan District"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Orientation",
          "afternoon": "Check-in at Bangkok hotel, introduction to canal culture and history.",
          "dining": "Dinner on own",
          "budget": 50
        },
        {
          "day": 2,
          "theme": "River & Canal Tour",
          "morning": "Long-tail boat ride along Chao Phraya River.",
          "afternoon": "Explore Khlong Bangkok Noi and Yai with stops at Wat Arun and local floating markets.",
          "dining": "Lunch included on boat",
          "budget": 70
        },
        {
          "day": 3,
          "theme": "Cultural & Historical Exploration",
          "morning": "Visit Royal Barges Museum, traditional canals, and Taling Chan District.",
          "afternoon": "Optional shopping and street food tasting along canals.",
          "budget": 60
        },
        {
          "day": 4,
          "theme": "Departure",
          "morning": "Pack and check-out, optional last boat ride or market visit.",
          "budget": 30
        }
      ],
      "packingTips": [
        "Lightweight clothing for warm weather",
        "Hat and sunscreen for sun protection",
        "Comfortable walking shoes",
        "Small waterproof backpack",
        "Insect repellent for canal areas"
      ],
      "culturalNotes": [
        "Respect temple customs during boat visits.",
        "Do not throw trash in waterways.",
        "Be polite when interacting with local boat vendors.",
        "Carry small change for boat fares and tips."
      ]
    }
  ]
},

{
  "id": 19,
  "name": "Mountain Trekking Escape",
  "description": "Conquer Thailand's scenic mountain trails and peaks.",
  "image": "https://images.unsplash.com/photo-1464822759844-d150baec393a",
  "mood": "adventure",
  "packages": [
    {
      "id": "MTE-1901",
      "title": "Northern Peaks Challenge",
      "price": 520,
      "discount": "16%",
      "people": 6,
      "images": [
        "https://images.unsplash.com/photo-1464822759844-d150baec393a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": ["Guided treks", "Mountain camping", "Equipment rental", "Local guides"],
      "excludes": ["Personal gear", "Insurance", "Emergency services"],
      "agents": [
        { "name": "Mountain Adventures Thailand", "price": 500 },
        { "name": "Peak Seekers", "price": 515 },
        { "name": "Highland Trekking Co.", "price": 535 }
      ],
      "touristPlaces": [
        "Doi Inthanon",
        "Doi Suthep",
        "Doi Chiang Dao",
        "Mae Hong Son Loop",
        "Doi Ang Khang",
        "Pha Dok Siew"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Preparation",
          "afternoon": "Check-in at Chiang Mai lodge, trek briefing and equipment distribution.",
          "dining": "Dinner included",
          "budget": 50
        },
        {
          "day": 2,
          "theme": "Doi Inthanon Trek",
          "morning": "Guided trek through trails to Doi Inthanon summit.",
          "afternoon": "Visit waterfalls and local hill tribes, overnight camping.",
          "dining": "Meals included",
          "budget": 70
        },
        {
          "day": 3,
          "theme": "Highland Exploration",
          "morning": "Hike through Doi Chiang Dao and surrounding peaks.",
          "afternoon": "Cultural visit to local villages, campfire storytelling.",
          "budget": 60
        },
        {
          "day": 4,
          "theme": "Mae Hong Son Loop & Departure",
          "morning": "Scenic trek and photography stops.",
          "afternoon": "Return to Chiang Mai, pack and check-out.",
          "budget": 40
        }
      ],
      "packingTips": [
        "Sturdy hiking boots",
        "Lightweight layered clothing",
        "Rain jacket and warm layer for higher altitudes",
        "Trekking poles",
        "Water bottles and snacks"
      ],
      "culturalNotes": [
        "Respect local hill tribe customs and privacy.",
        "Leave no trace on trails and campsites.",
        "Ask before photographing villagers.",
        "Carry small change for local markets and tips."
      ]
    }
  ]
},

{
  "id": 20,
  "name": "Cooking Class Journey",
  "description": "Master authentic Thai cuisine with expert chefs.",
  "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136",
  "mood": "cultural",
  "packages": [
    {
      "id": "CCJ-2001",
      "title": "Thai Culinary Mastery",
      "price": 320,
      "discount": "12%",
      "people": 8,
      "images": [
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1496318447583-f524534e9ce1?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": ["Cooking classes", "Market tours", "Recipe books", "Chef certificates"],
      "excludes": ["Accommodation", "Transport", "Additional ingredients"],
      "agents": [
        { "name": "Thai Cooking Academy", "price": 305 },
        { "name": "Culinary Masters Thailand", "price": 315 },
        { "name": "Chef Experience Co.", "price": 335 }
      ],
      "touristPlaces": [
        "Bangkok Cooking Schools",
        "Chiang Mai Culinary Center",
        "Local Markets",
        "Herb Gardens",
        "Traditional Kitchens",
        "Farm to Table Experiences"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Introduction & Market Tour",
          "morning": "Arrive and check-in, welcome briefing",
          "afternoon": "Visit local market, learn about Thai ingredients",
          "dining": "Included local lunch",
          "budget": 40
        },
        {
          "day": 2,
          "theme": "Hands-on Cooking Classes",
          "morning": "Thai curry & stir-fry preparation with chef",
          "afternoon": "Dessert and snack workshop, plating techniques",
          "dining": "All prepared dishes included",
          "budget": 60
        },
        {
          "day": 3,
          "theme": "Culinary Exploration",
          "morning": "Visit herb gardens and traditional kitchens",
          "afternoon": "Interactive farm-to-table cooking session",
          "budget": 50
        },
        {
          "day": 4,
          "theme": "Certification & Farewell",
          "morning": "Final cooking session and tasting",
          "afternoon": "Receive chef certificate, check-out",
          "budget": 30
        }
      ],
      "packingTips": [
        "Comfortable clothing suitable for cooking",
        "Apron (optional)",
        "Notebook and pen for recipes",
        "Reusable water bottle",
        "Camera for market and cooking photos"
      ],
      "culturalNotes": [
        "Respect local culinary traditions and chefs’ guidance",
        "Ask before photographing vendors at markets",
        "Try all local ingredients with an open mind",
        "Learn the proper etiquette for tasting and sharing dishes"
      ]
    }
  ]
},
{
  "id": 21,
  "name": "Diving & Snorkeling Paradise",
  "description": "Explore Thailand's underwater world and marine life.",
  "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
  "mood": "adventure",
  "packages": [
    {
      "id": "DSP-2101",
      "title": "Andaman Sea Explorer",
      "price": 780,
      "discount": "18%",
      "people": 4,
      "images": [
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": ["Dive equipment", "Boat trips", "Professional instructors", "Certification"],
      "excludes": ["Accommodation", "Meals", "Travel insurance"],
      "agents": [
        { "name": "Deep Blue Thailand", "price": 760 },
        { "name": "Andaman Divers", "price": 775 },
        { "name": "Coral Reef Adventures", "price": 795 }
      ],
      "touristPlaces": [
        "Similan Islands",
        "Surin Islands",
        "Richelieu Rock",
        "Koh Phi Phi Diving Sites",
        "Shark Point",
        "King Cruiser Wreck"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Orientation",
          "morning": "Arrive at Phuket/Krabi, check-in",
          "afternoon": "Safety briefing and dive theory session",
          "dining": "Local Thai lunch included",
          "budget": 50
        },
        {
          "day": 2,
          "theme": "Diving & Snorkeling Excursions",
          "morning": "Dive at Similan Islands, guided snorkeling tour",
          "afternoon": "Explore coral reefs, optional underwater photography",
          "dining": "Onboard lunch provided",
          "budget": 80
        },
        {
          "day": 3,
          "theme": "Advanced Diving & Certification",
          "morning": "Richelieu Rock dive, shark and ray spotting",
          "afternoon": "Complete certification dives",
          "dining": "Lunch on the boat",
          "budget": 70
        },
        {
          "day": 4,
          "theme": "Leisure & Departure",
          "morning": "Optional snorkeling at King Cruiser Wreck",
          "afternoon": "Check-out and transfer to airport",
          "budget": 30
        }
      ],
      "packingTips": [
        "Swimwear and rash guards",
        "Snorkeling mask & fins (optional, can rent)",
        "Sunscreen and waterproof bag",
        "Towel and flip-flops",
        "Underwater camera (optional)"
      ],
      "culturalNotes": [
        "Respect marine life, do not touch corals",
        "Follow instructors' guidance for safety",
        "Local dive operators value punctuality",
        "Avoid littering on beaches and boats"
      ]
    }
  ]
},

{
  "id": 22,
  "name": "Festival & Events Tour",
  "description": "Experience Thailand's colorful festivals and celebrations.",
  "image": "https://images.unsplash.com/photo-1518604666860-b6ac5b9b6136",
  "mood": "cultural",
  "packages": [
    {
      "id": "FET-2201",
      "title": "Songkran Water Festival",
      "price": 420,
      "discount": "14%",
      "people": 6,
      "images": [
        "https://images.unsplash.com/photo-1518604666860-b6ac5b9b6136?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1563492065-f722967e12bb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": ["Festival participation", "Cultural shows", "Traditional activities", "Local guide"],
      "excludes": ["Accommodation", "Meals", "Festival supplies"],
      "agents": [
        { "name": "Festival Tours Thailand", "price": 400 },
        { "name": "Cultural Celebrations", "price": 415 },
        { "name": "Thai Traditions Co.", "price": 435 }
      ],
      "touristPlaces": [
        "Khao San Road",
        "Chiang Mai Old City",
        "Pattaya Beach",
        "Silom Road",
        "Traditional Temples",
        "Cultural Centers"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Festival Introduction",
          "morning": "Arrive at Bangkok/Chiang Mai, check-in",
          "afternoon": "Orientation session on Songkran festival",
          "evening": "Local welcome dinner",
          "budget": 50
        },
        {
          "day": 2,
          "theme": "Songkran Water Activities",
          "morning": "Participate in city-wide water fights",
          "afternoon": "Visit temples for traditional blessings",
          "evening": "Cultural shows and street performances",
          "budget": 60
        },
        {
          "day": 3,
          "theme": "Cultural Exploration",
          "morning": "Explore Chiang Mai Old City & temples",
          "afternoon": "Traditional craft workshops and festival markets",
          "evening": "Evening river parade or night market",
          "budget": 50
        },
        {
          "day": 4,
          "theme": "Leisure & Departure",
          "morning": "Optional sightseeing or local activities",
          "afternoon": "Check-out and transfer to airport",
          "budget": 30
        }
      ],
      "packingTips": [
        "Lightweight quick-dry clothing",
        "Waterproof bag for electronics",
        "Water shoes or sandals",
        "Sunscreen and hat",
        "Reusable water bottle"
      ],
      "culturalNotes": [
        "Songkran is Thailand's New Year celebration, a mix of fun and religious rituals",
        "Respect monks and temple rules during blessings",
        "Participate in water fights with a cheerful spirit, avoid throwing at elders or monks",
        "Support local vendors and artisans during festival markets"
      ]
    }
  ]
},

{
  "id": 23,
  "name": "Luxury Resort Getaway",
  "description": "Indulge in Thailand's most exclusive luxury resorts.",
  "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
  "mood": "luxury",
  "packages": [
    {
      "id": "LRG-2301",
      "title": "Koh Samui Luxury Escape",
      "price": 1800,
      "discount": "20%",
      "people": 2,
      "images": [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": ["5-star resort", "Private pool villa", "Butler service", "Fine dining"],
      "excludes": ["Flights", "Additional spa services", "Excursions"],
      "agents": [
        { "name": "Luxury Escapes Thailand", "price": 1750 },
        { "name": "Premium Resorts Co.", "price": 1780 },
        { "name": "Elite Vacation Rentals", "price": 1820 }
      ],
      "touristPlaces": [
        "Koh Samui",
        "Four Seasons Resort",
        "Banyan Tree Samui",
        "The Library Resort",
        "W Koh Samui",
        "Conrad Koh Samui"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Check-in",
          "morning": "Arrive at Koh Samui airport, private transfer to resort",
          "afternoon": "Check-in and private villa orientation",
          "evening": "Sunset cocktails and fine dining experience",
          "budget": 100
        },
        {
          "day": 2,
          "theme": "Relaxation & Spa Day",
          "morning": "Private yoga session and beach walk",
          "afternoon": "In-villa lunch followed by spa treatments",
          "evening": "Gourmet dinner and stargazing by the pool",
          "budget": 150
        },
        {
          "day": 3,
          "theme": "Luxury Excursion & Sightseeing",
          "morning": "Helicopter tour of Koh Samui coastline",
          "afternoon": "Private boat trip to nearby islands",
          "evening": "Dinner at a 5-star resort restaurant",
          "budget": 200
        },
        {
          "day": 4,
          "theme": "Leisure & Departure",
          "morning": "Relax at villa or beachside",
          "afternoon": "Check-out and private transfer to airport",
          "budget": 50
        }
      ],
      "packingTips": [
        "Luxury resort casual wear",
        "Swimwear & cover-ups",
        "Sunscreen and sunglasses",
        "Evening attire for fine dining",
        "Camera for scenic shots"
      ],
      "culturalNotes": [
        "Respect local customs and dress modestly when visiting temples",
        "Tipping is appreciated for personalized services",
        "Koh Samui is known for serene beaches and luxury resorts – maintain a quiet and respectful demeanor",
        "Engage with local staff for authentic Thai experiences"
      ]
    }
  ]
},

{
  "id": 24,
  "name": "Digital Nomad Hub",
  "description": "Perfect for remote workers seeking tropical productivity.",
  "image": "https://images.unsplash.com/photo-1488646953014-85cb44e25828",
  "mood": "work-travel",
  "packages": [
    {
      "id": "DNH-2401",
      "title": "Chiang Mai Co-working Experience",
      "price": 680,
      "discount": "15%",
      "people": 1,
      "images": [
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": [
        "Co-working space access",
        "High-speed internet",
        "Networking events",
        "Comfortable accommodation"
      ],
      "excludes": ["Flights", "Meals", "Personal expenses"],
      "agents": [
        { "name": "Nomad Thailand", "price": 660 },
        { "name": "Remote Work Retreats", "price": 675 },
        { "name": "Digital Nomad Co.", "price": 695 }
      ],
      "touristPlaces": [
        "Chiang Mai Co-working Spaces",
        "Nimman District",
        "Maya Mall",
        "Doi Suthep Temple",
        "Sunday Walking Street",
        "Coffee Shops & Cafes"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Setup",
          "morning": "Arrive in Chiang Mai, transfer to accommodation",
          "afternoon": "Set up workspace, check internet and equipment",
          "evening": "Explore local cafes and nearby attractions",
          "budget": 50
        },
        {
          "day": 2,
          "theme": "Work & Networking",
          "morning": "Focus on work tasks at co-working space",
          "afternoon": "Attend networking event with other digital nomads",
          "evening": "Evening stroll in Nimman District",
          "budget": 30
        },
        {
          "day": 3,
          "theme": "Productivity & Leisure",
          "morning": "Deep work session at co-working space",
          "afternoon": "Visit Doi Suthep Temple for cultural break",
          "evening": "Enjoy local street food at Sunday Walking Street",
          "budget": 40
        },
        {
          "day": 4,
          "theme": "Wrap-up & Departure",
          "morning": "Pack and finalize work commitments",
          "afternoon": "Check out and private transfer to airport",
          "budget": 20
        }
      ],
      "packingTips": [
        "Laptop and chargers",
        "Portable power bank",
        "Comfortable work clothing",
        "Light casual wear for exploring",
        "Notebook or planner for tasks"
      ],
      "culturalNotes": [
        "Respect local customs, especially when visiting temples",
        "Engage with local communities to enrich work-travel experience",
        "Chiang Mai has a relaxed vibe – keep noise levels low in co-working spaces",
        "Tip service staff politely for hospitality services"
      ]
    }
  ]
},

{
  "id": 25,
  "name": "Wellness & Detox Retreat",
  "description": "Rejuvenate your body and mind with holistic wellness programs.",
  "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
  "mood": "wellness",
  "packages": [
    {
      "id": "WDR-2501",
      "title": "Koh Phangan Detox Program",
      "price": 890,
      "discount": "22%",
      "people": 2,
      "images": [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": [
        "Detox programs",
        "Yoga sessions",
        "Healthy meals",
        "Wellness consultations"
      ],
      "excludes": ["Flights", "Additional treatments", "Personal items"],
      "agents": [
        { "name": "Wellness Retreats Thailand", "price": 870 },
        { "name": "Detox Paradise Co.", "price": 885 },
        { "name": "Holistic Healing Centers", "price": 905 }
      ],
      "touristPlaces": [
        "Koh Phangan",
        "Wellness Centers",
        "Orion Healing Center",
        "The Sanctuary",
        "Spa Resorts",
        "Meditation Centers"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Orientation",
          "morning": "Arrive in Koh Phangan and transfer to wellness resort",
          "afternoon": "Orientation session and health assessment",
          "evening": "Light yoga session and detox welcome dinner",
          "budget": 50
        },
        {
          "day": 2,
          "theme": "Detox & Yoga",
          "morning": "Guided detox program and morning yoga",
          "afternoon": "Meditation and wellness consultation",
          "evening": "Healthy dinner and mindfulness session",
          "budget": 40
        },
        {
          "day": 3,
          "theme": "Wellness Exploration",
          "morning": "Detox activities and herbal treatments",
          "afternoon": "Beach walk and spa session",
          "evening": "Evening yoga and group meditation",
          "budget": 40
        },
        {
          "day": 4,
          "theme": "Wrap-Up & Departure",
          "morning": "Final wellness consultation and check-out",
          "afternoon": "Transfer to airport or next destination",
          "budget": 20
        }
      ],
      "packingTips": [
        "Comfortable yoga attire",
        "Light casual clothing for beach walks",
        "Reusable water bottle",
        "Sunscreen and sunhat",
        "Journal for reflections"
      ],
      "wellnessNotes": [
        "Follow dietary guidelines provided by the wellness center",
        "Respect quiet hours in the retreat for meditation",
        "Stay hydrated and rest between sessions",
        "Engage fully with activities for optimal benefit"
      ]
    }
  ]
},
{
  "id": 26,
  "name": "Jungle Adventure & Zipline",
  "description": "Thrilling jungle treks and high-adrenaline zipline experiences.",
  "image": "https://images.unsplash.com/photo-1503414265202-1a8c8f1c51ef",
  "mood": "adventure",
  "packages": [
    {
      "id": "JAZ-2601",
      "title": "Chiang Mai Jungle Adventure",
      "price": 550,
      "discount": "18%",
      "people": 6,
      "images": [
        "https://images.unsplash.com/photo-1503414265202-1a8c8f1c51ef?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": [
        "Guided jungle trek",
        "Zipline adventure",
        "Safety equipment",
        "Lunch in jungle camp"
      ],
      "excludes": ["Transport to Chiang Mai", "Personal gear", "Tips"],
      "agents": [
        { "name": "Chiang Mai Adventures", "price": 530 },
        { "name": "Jungle Zipline Co.", "price": 545 },
        { "name": "Thailand Thrills", "price": 565 }
      ],
      "touristPlaces": [
        "Doi Suthep-Pui National Park",
        "Mae Sa Waterfall",
        "Elephant Camps",
        "Jungle Canopy",
        "Adventure Trails"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Orientation",
          "morning": "Arrive at Chiang Mai, transfer to jungle base",
          "afternoon": "Orientation and safety briefing",
          "evening": "Welcome dinner by the campfire",
          "budget": 40
        },
        {
          "day": 2,
          "theme": "Jungle Trek & Zipline",
          "morning": "Guided jungle trek",
          "afternoon": "Zipline adventure across the canopy",
          "evening": "Relaxation and campfire storytelling",
          "budget": 60
        },
        {
          "day": 3,
          "theme": "Waterfall & Wildlife",
          "morning": "Visit Mae Sa Waterfall and jungle exploration",
          "afternoon": "Wildlife observation and photography",
          "evening": "Farewell dinner and reflection session",
          "budget": 50
        }
      ],
      "packingTips": [
        "Comfortable trekking shoes",
        "Lightweight hiking clothes",
        "Rain jacket",
        "Sunscreen & insect repellent",
        "Water bottle & snacks"
      ],
      "adventureNotes": [
        "Follow guides' instructions for safety on zipline",
        "Stay hydrated and take breaks during trek",
        "Respect local wildlife and environment",
        "Use sunscreen and insect repellent"
      ]
    }
  ]
},
{
  "id": 27,
  "name": "Island Luxury Sailing",
  "description": "Sail through Thailand’s pristine islands in style and comfort.",
  "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "mood": "luxury",
  "packages": [
    {
      "id": "ILS-2701",
      "title": "Phuket to Phi Phi Luxury Yacht",
      "price": 2200,
      "discount": "20%",
      "people": 4,
      "images": [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": [
        "Private yacht",
        "Onboard chef",
        "Island hopping",
        "Snorkeling and diving"
      ],
      "excludes": ["Flights", "Alcoholic beverages", "Spa treatments"],
      "agents": [
        { "name": "Luxury Yacht Thailand", "price": 2150 },
        { "name": "Elite Sailing Co.", "price": 2180 },
        { "name": "Phuket Yacht Tours", "price": 2220 }
      ],
      "touristPlaces": [
        "Phuket",
        "Phi Phi Islands",
        "Maya Bay",
        "Bamboo Island",
        "Monkey Beach"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Boarding & Sunset Cruise",
          "morning": "Arrive in Phuket, board the yacht",
          "afternoon": "Sail towards Phi Phi Islands, sunset on deck",
          "evening": "Dinner onboard with chef’s special",
          "budget": 120
        },
        {
          "day": 2,
          "theme": "Island Exploration",
          "morning": "Snorkeling at Maya Bay",
          "afternoon": "Beach relaxation at Bamboo Island",
          "evening": "Evening cocktails and stargazing",
          "budget": 100
        },
        {
          "day": 3,
          "theme": "Return & Leisure",
          "morning": "Morning swim and coffee on deck",
          "afternoon": "Sail back to Phuket, disembark",
          "evening": "Optional spa or city exploration",
          "budget": 80
        }
      ],
      "packingTips": [
        "Swimwear and beach towels",
        "Sun hat and sunglasses",
        "Light evening attire",
        "Snorkel gear if preferred",
        "Sunscreen and reef-safe lotion"
      ],
      "adventureNotes": [
        "Follow yacht staff instructions for safety",
        "Respect marine life while snorkeling",
        "Secure valuables onboard",
        "Stay hydrated under the sun"
      ]
    }
  ]
},
{
  "id": 28,
  "name": "Jungle Adventure & Trekking",
  "description": "Immerse yourself in Thailand’s lush jungles with guided treks and camping.",
  "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "mood": "adventure",
  "packages": [
    {
      "id": "JAT-2801",
      "title": "Chiang Mai Jungle Trekking Expedition",
      "price": 650,
      "discount": "15%",
      "people": 6,
      "images": [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1517821099603-1d195f89e1aa?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      "includes": [
        "Guided jungle treks",
        "Camping equipment",
        "Local meals",
        "Wildlife spotting"
      ],
      "excludes": ["Transport to Chiang Mai", "Insurance", "Personal trekking gear"],
      "agents": [
        { "name": "Chiang Mai Jungle Tours", "price": 630 },
        { "name": "Wild Trek Adventures", "price": 645 },
        { "name": "Northern Thailand Expeditions", "price": 670 }
      ],
      "touristPlaces": [
        "Doi Inthanon National Park",
        "Mae Sa Waterfalls",
        "Hill Tribe Villages",
        "Mon Cham viewpoints",
        "Jungle trails around Chiang Dao"
      ],
      "itinerary": [
        {
          "day": 1,
          "theme": "Arrival & Jungle Orientation",
          "morning": "Arrive in Chiang Mai, meet guides",
          "afternoon": "Introductory hike and camping setup",
          "evening": "Welcome dinner by campfire",
          "budget": 50
        },
        {
          "day": 2,
          "theme": "Full Jungle Trek",
          "morning": "Guided trek through waterfalls and trails",
          "afternoon": "Wildlife spotting & photography",
          "evening": "Camp overnight under the stars",
          "budget": 70
        },
        {
          "day": 3,
          "theme": "Hill Tribe Village Visit",
          "morning": "Visit local hill tribe villages",
          "afternoon": "Learn cultural crafts, return trek",
          "evening": "Farewell dinner in Chiang Mai",
          "budget": 60
        }
      ],
      "packingTips": [
        "Lightweight hiking clothes",
        "Sturdy trekking shoes",
        "Insect repellent",
        "Water bottle and snacks",
        "Rain jacket or poncho"
      ],
      "adventureNotes": [
        "Stay on marked trails for safety",
        "Follow guide instructions at all times",
        "Respect local communities",
        "Carry a small first-aid kit"
      ]
    }
  ]
}
];

export default categories;