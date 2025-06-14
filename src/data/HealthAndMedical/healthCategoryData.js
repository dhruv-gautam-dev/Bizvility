import { useParams } from "react-router-dom";

export const healthCategoryData = [
  {
    id: 1,
    name: "Dr. Shivani",
    image: "https://www.shutterstock.com/image-photo/head-shot-woman-wearing-white-600nw-1529466836.jpg",
    alt: "Pharmacy storefront",
    rating: 4.5,
    reviewsCount: 32,
    verified: true,
    claimed: false,
    address: "Shop No.8 & 9, Cross Mall Road, Sikandra Bodla Road",
    phone: "+916398124569",
    website: null,
    location: "Hospital Road, Agra",
    openUntil: "9 PM",
    years: 10,
    price: 10,
    hours: "Open Now • 9 AM – 9 PM",
    photos: [
      
      "https://plus.unsplash.com/premium_photo-1661346028312-5fa83435f5c0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM1fHx8ZW58MHx8fHx8",
      "https://insidefmcg.com.au/wp-content/uploads/2022/01/ezgif.com-gif-maker.jpg",
      "https://www.indiafilings.com/learn/wp-content/uploads/2015/04/starting-a-pharmacy-business.jpg",
      "https://media.istockphoto.com/id/941741416/photo/so-many-choices.jpg?s=612x612&w=0&k=20&c=EMec13qZyGdgn92QCY3xaphpyjB_c6hR1w_Eohqrg5Q=",
      "https://kenresearchreport.wordpress.com/wp-content/uploads/2018/10/hong-kong-health-and-beauty-retailing-market.jpg",
      "https://www.hawaiipacifichealth.org/media/19340/hidden-nutritional-pitfalls-of-health-foods-v2-web.jpg",
      "https://www.hawaiipacifichealth.org/media/19340/hidden-nutritional-pitfalls-of-health-foods-v2-web.jpg",
      "https://www.cvshealth.com/content/dam/enterprise/cvs-enterprise/images/ingestion/2019-17/cvs-health-discover-cvs-press-release-image-1_0.png",
      "https://plus.unsplash.com/premium_photo-1661346028312-5fa83435f5c0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM1fHx8ZW58MHx8fHx8",
      "https://insidefmcg.com.au/wp-content/uploads/2022/01/ezgif.com-gif-maker.jpg",
      "https://www.indiafilings.com/learn/wp-content/uploads/2015/04/starting-a-pharmacy-business.jpg",
      "https://media.istockphoto.com/id/941741416/photo/so-many-choices.jpg?s=612x612&w=0&k=20&c=EMec13qZyGdgn92QCY3xaphpyjB_c6hR1w_Eohqrg5Q=",
      "https://kenresearchreport.wordpress.com/wp-content/uploads/2018/10/hong-kong-health-and-beauty-retailing-market.jpg",
      "https://www.hawaiipacifichealth.org/media/19340/hidden-nutritional-pitfalls-of-health-foods-v2-web.jpg",
      "https://www.hawaiipacifichealth.org/media/19340/hidden-nutritional-pitfalls-of-health-foods-v2-web.jpg",
      "https://www.cvshealth.com/content/dam/enterprise/cvs-enterprise/images/ingestion/2019-17/cvs-health-discover-cvs-press-release-image-1_0.png",
      "https://plus.unsplash.com/premium_photo-1661346028312-5fa83435f5c0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM1fHx8ZW58MHx8fHx8",
      "https://insidefmcg.com.au/wp-content/uploads/2022/01/ezgif.com-gif-maker.jpg",
      "https://www.indiafilings.com/learn/wp-content/uploads/2015/04/starting-a-pharmacy-business.jpg",
      "https://media.istockphoto.com/id/941741416/photo/so-many-choices.jpg?s=612x612&w=0&k=20&c=EMec13qZyGdgn92QCY3xaphpyjB_c6hR1w_Eohqrg5Q=",
      "https://kenresearchreport.wordpress.com/wp-content/uploads/2018/10/hong-kong-health-and-beauty-retailing-market.jpg",
      "https://www.hawaiipacifichealth.org/media/19340/hidden-nutritional-pitfalls-of-health-foods-v2-web.jpg",
      "https://www.hawaiipacifichealth.org/media/19340/hidden-nutritional-pitfalls-of-health-foods-v2-web.jpg",
      "https://www.cvshealth.com/content/dam/enterprise/cvs-enterprise/images/ingestion/2019-17/cvs-health-discover-cvs-press-release-image-1_0.png"
    ],
    businessHours:[
            ['Monday', '09:00AM - 05:00PM'],
            ['Tuesday', '09:00AM - 05:00PM'],
            ['Wednesday', '09:00AM - 05:00PM'],
            ['Thursday', '09:00AM - 05:00PM'],
            ['Friday', '09:00AM - 05:00PM'],
            ['Saturday', 'Closed'],
            ['Sunday', 'Closed']
          ],
    reviews :[
              {
                id: 1,
                name: "Rahul",
                image: "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg",
                rating: 5,
                date: "February 13, 2025",
                time: "11:32 AM",
                text: "Absolutely fantastic service—staff were prompt and helpful!"
              },
              {
                id: 2,
                name: "Bbbb",
                image: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740",
                rating: 4,
                date: "February 4, 2025",
                time: "6:55 PM",
                text: "Very good experience overall, although a few minutes wait at the start."
              },
              {
                id: 3,
                name: "Anil",
                image: "https://sb.kaleidousercontent.com/67418/1920x1545/c5f15ac173/samuel-raita-ridxdghg7pw-unsplash.jpg",
                rating: 5,
                date: "January 28, 2025",
                time: "2:45 PM",
                text: "User-friendly environment and the equipment was well-maintained."
              },
              {
                id: 4,
                name: "Priya",
                image: "https://slazzer.com/blog/wp-content/uploads/2022/11/Professional-Profile-Picture-005.jpg",
                rating: 4.5,
                date: "March 2, 2025",
                time: "10:15 AM",
                text: "Great staff and very clean space; will definitely return."
              },
              {
                id: 5,
                name: "Sunil",
                image: "https://www.shutterstock.com/image-photo/happy-mid-aged-business-man-600nw-2307212331.jpg",
                rating: 3.5,
                date: "March 10, 2025",
                time: "1:20 PM",
                text: "Good value for money, but the waiting area could use improvements."
              },
              {
                id: 6,
                name: "Deepa",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-RIdqrd20g6TFnlMLDSGLkhNCEbcDFPbp7w&s",
                rating: 5,
                date: "March 15, 2025",
                time: "9:05 AM",
                text: "Highly recommend! Friendly, professional, and efficient service."
              },
              {
                id: 7,
                name: "Rahul",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw6rKo4oAZitzIx6Y6LB5xPtHKNNuatMHTDw&s",
                rating: 4,
                date: "February 20, 2025",
                time: "5:30 PM",
                text: "Solid experience—staff knew what they were doing."
              },
              {
                id: 8,
                name: "Meera",
                image: "https://profiles.open.ac.uk/storage/profile_pictures/67678606e7a57.jpg",
                rating: 5,
                date: "March 18, 2025",
                time: "11:00 AM",
                text: "Exceptional environment, polite staff, very satisfied overall!"
              }
        ],
    openHours: "Mon–Sat 9 AM–9 PM; Sun Closed",

    // data for the quick details sub nav
    email: "dr.shivani@example.com",  
    registerNumber: "MP1234567",  
    walkin: "no",
    appointmentLink: "https://drshivaniappointments.com/book", 
    experience: "10 years",  
    award: "Best Physician 2022",
    affiliation: "Agra Central Hospital",
    speciality: "General Medicine", 
    socialMedia: {
      facebook: "https://facebook.com/drshivani",  
      instagram: "https://instagram.com/drshivani" 
    }
  },
  {
    id: 2,
    name: "Dr. Manisha",
    image: "https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827774.jpg?semt=ais_hybrid&w=740",
    alt: "Medical store interior",
    rating: 4.4,
    reviewsCount: 18,
    verified: true,
    claimed: false,
    address: "Bhore Ram Gopal Market, Hospital Road, Agra, UP",
    phone: "+91 562 2254572",
    website: null,
    location: "Hospital Road, Agra",
    openUntil: "10 PM",
    years: 6,
    price: 0,
    hours: "Open Now • 8 AM – 10 PM",
    photos: [
      "https://wallpapers.com/images/featured/doctor-background-lenymxef6pkzfcjq.jpg",
      "https://insidefmcg.com.au/wp-content/uploads/2022/01/ezgif.com-gif-maker.jpg",
      "https://media.istockphoto.com/id/941741416/photo/so-many-choices.jpg?s=612x612&w=0&k=20&c=EMec13qZyGdgn92QCY3xaphpyjB_c6hR1w_Eohqrg5Q=",
      "https://kenresearchreport.wordpress.com/wp-content/uploads/2018/10/hong-kong-health-and-beauty-retailing-market.jpg",
      "https://www.hawaiipacifichealth.org/media/19340/hidden-nutritional-pitfalls-of-health-foods-v2-web.jpg",
      "https://www.hawaiipacifichealth.org/media/19340/hidden-nutritional-pitfalls-of-health-foods-v2-web.jpg",
      "https://www.hawaiipacifichealth.org/media/19340/hidden-nutritional-pitfalls-of-health-foods-v2-web.jpg",
      "https://www.hawaiipacifichealth.org/media/19340/hidden-nutritional-pitfalls-of-health-foods-v2-web.jpg",
      "https://www.cvshealth.com/content/dam/enterprise/cvs-enterprise/images/ingestion/2019-17/cvs-health-discover-cvs-press-release-image-1_0.png",
      "https://plus.unsplash.com/premium_photo-1661346028312-5fa83435f5c0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM1fHx8ZW58MHx8fHx8",
      "https://insidefmcg.com.au/wp-content/uploads/2022/01/ezgif.com-gif-maker.jpg",
      "https://www.indiafilings.com/learn/wp-content/uploads/2015/04/starting-a-pharmacy-business.jpg",
      "https://media.istockphoto.com/id/941741416/photo/so-many-choices.jpg?s=612x612&w=0&k=20&c=EMec13qZyGdgn92QCY3xaphpyjB_c6hR1w_Eohqrg5Q=",
      "https://kenresearchreport.wordpress.com/wp-content/uploads/2018/10/hong-kong-health-and-beauty-retailing-market.jpg",
      "https://www.hawaiipacifichealth.org/media/19340/hidden-nutritional-pitfalls-of-health-foods-v2-web.jpg",
      "https://www.hawaiipacifichealth.org/media/19340/hidden-nutritional-pitfalls-of-health-foods-v2-web.jpg",
      "https://www.cvshealth.com/content/dam/enterprise/cvs-enterprise/images/ingestion/2019-17/cvs-health-discover-cvs-press-release-image-1_0.png"
    ],
    businessHours:[
            ['Monday', '09:00AM - 05:00PM'],
            ['Tuesday', '09:00AM - 05:00PM'],
            ['Wednesday', '09:00AM - 05:00PM'],
            ['Thursday', '09:00AM - 05:00PM'],
            ['Friday', '09:00AM - 05:00PM'],
            ['Saturday', 'Closed'],
            ['Sunday', 'open']
          ],
    reviews :[
              {
                id: 1,
                name: "Rahul",
                image: "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg",
                rating: 5,
                date: "February 13, 2025",
                time: "11:32 AM",
                text: "Absolutely fantastic service—staff were prompt and helpful!"
              },
              {
                id: 2,
                name: "Bbbb",
                image: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740",
                rating: 4,
                date: "February 4, 2025",
                time: "6:55 PM",
                text: "Very good experience overall, although a few minutes wait at the start."
              },
              {
                id: 3,
                name: "Anil",
                image: "https://sb.kaleidousercontent.com/67418/1920x1545/c5f15ac173/samuel-raita-ridxdghg7pw-unsplash.jpg",
                rating: 5,
                date: "January 28, 2025",
                time: "2:45 PM",
                text: "User-friendly environment and the equipment was well-maintained."
              },
              {
                id: 4,
                name: "Priya",
                image: "https://slazzer.com/blog/wp-content/uploads/2022/11/Professional-Profile-Picture-005.jpg",
                rating: 4.5,
                date: "March 2, 2025",
                time: "10:15 AM",
                text: "Great staff and very clean space; will definitely return."
              },
              {
                id: 5,
                name: "Sunil",
                image: "https://www.shutterstock.com/image-photo/happy-mid-aged-business-man-600nw-2307212331.jpg",
                rating: 3.5,
                date: "March 10, 2025",
                time: "1:20 PM",
                text: "Good value for money, but the waiting area could use improvements."
              },
              {
                id: 6,
                name: "Deepa",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-RIdqrd20g6TFnlMLDSGLkhNCEbcDFPbp7w&s",
                rating: 5,
                date: "March 15, 2025",
                time: "9:05 AM",
                text: "Highly recommend! Friendly, professional, and efficient service."
              },
              {
                id: 7,
                name: "Rahul",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw6rKo4oAZitzIx6Y6LB5xPtHKNNuatMHTDw&s",
                rating: 4,
                date: "February 20, 2025",
                time: "5:30 PM",
                text: "Solid experience—staff knew what they were doing."
              },
              {
                id: 8,
                name: "Meera",
                image: "https://profiles.open.ac.uk/storage/profile_pictures/67678606e7a57.jpg",
                rating: 5,
                date: "March 18, 2025",
                time: "11:00 AM",
                text: "Exceptional environment, polite staff, very satisfied overall!"
              }
        ],

    openHours: "Mon–Sun 8 AM–10 PM"
  },

  {
    id: 3,
    name: "Prise Fair Chemist",
    image: "https://img.freepik.com/free-photo/doctor-offering-medical-teleconsultation_23-2149329007.jpg?semt=ais_hybrid&w=740 ",
    alt: "Chemist shop",
    rating: 4.3,
    reviewsCount: 12,
    verified: false,
    claimed: false,
    address: "Fobbara, Hospital Road, Agra, UP",
    phone: "+91 562 2365907",
    website: null,
    location: "Hospital Road, Agra",
    openUntil: "8 PM",
    years: 4,
    price: 0,
    hours: "Open Now • 10 AM – 8 PM",
    photos: [
      "https://wallpapercave.com/wp/wp2655106.jpg",
      "https://wallpapers.com/images/featured/doctor-background-lenymxef6pkzfcjq.jpg",
      "https://insidefmcg.com.au/wp-content/uploads/2022/01/ezgif.com-gif-maker.jpg",
      "https://www.indiafilings.com/learn/wp-content/uploads/2015/04/starting-a-pharmacy-business.jpg",
      "https://media.istockphoto.com/id/941741416/photo/so-many-choices.jpg?s=612x612&w=0&k=20&c=EMec13qZyGdgn92QCY3xaphpyjB_c6hR1w_Eohqrg5Q=",
      "https://kenresearchreport.wordpress.com/wp-content/uploads/2018/10/hong-kong-health-and-beauty-retailing-market.jpg",
      "https://www.hawaiipacifichealth.org/media/19340/hidden-nutritional-pitfalls-of-health-foods-v2-web.jpg",
      "https://www.hawaiipacifichealth.org/media/19340/hidden-nutritional-pitfalls-of-health-foods-v2-web.jpg"
    ],
    businessHours:[
            ['Monday', '09:00AM - 05:00PM'],
            ['Tuesday', '09:00AM - 05:00PM'],
            ['Wednesday', '09:00AM - 05:00PM'],
            ['Thursday', '09:00AM - 05:00PM'],
            ['Friday', '09:00AM - 05:00PM'],
            ['Saturday', 'Closed'],
            ['Sunday', 'open']
          ],
    reviews :[
              {
                id: 1,
                name: "Rahul",
                image: "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg",
                rating: 5,
                date: "February 13, 2025",
                time: "11:32 AM",
                text: "Absolutely fantastic service—staff were prompt and helpful!"
              },
              {
                id: 2,
                name: "Bbbb",
                image: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740",
                rating: 4,
                date: "February 4, 2025",
                time: "6:55 PM",
                text: "Very good experience overall, although a few minutes wait at the start."
              },
              {
                id: 3,
                name: "Anil",
                image: "https://sb.kaleidousercontent.com/67418/1920x1545/c5f15ac173/samuel-raita-ridxdghg7pw-unsplash.jpg",
                rating: 5,
                date: "January 28, 2025",
                time: "2:45 PM",
                text: "User-friendly environment and the equipment was well-maintained."
              },
              {
                id: 4,
                name: "Priya",
                image: "https://slazzer.com/blog/wp-content/uploads/2022/11/Professional-Profile-Picture-005.jpg",
                rating: 4.5,
                date: "March 2, 2025",
                time: "10:15 AM",
                text: "Great staff and very clean space; will definitely return."
              },
              {
                id: 5,
                name: "Sunil",
                image: "https://www.shutterstock.com/image-photo/happy-mid-aged-business-man-600nw-2307212331.jpg",
                rating: 3.5,
                date: "March 10, 2025",
                time: "1:20 PM",
                text: "Good value for money, but the waiting area could use improvements."
              },
              {
                id: 6,
                name: "Deepa",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-RIdqrd20g6TFnlMLDSGLkhNCEbcDFPbp7w&s",
                rating: 5,
                date: "March 15, 2025",
                time: "9:05 AM",
                text: "Highly recommend! Friendly, professional, and efficient service."
              },
              {
                id: 7,
                name: "Rahul",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw6rKo4oAZitzIx6Y6LB5xPtHKNNuatMHTDw&s",
                rating: 4,
                date: "February 20, 2025",
                time: "5:30 PM",
                text: "Solid experience—staff knew what they were doing."
              },
              {
                id: 8,
                name: "Meera",
                image: "https://profiles.open.ac.uk/storage/profile_pictures/67678606e7a57.jpg",
                rating: 5,
                date: "March 18, 2025",
                time: "11:00 AM",
                text: "Exceptional environment, polite staff, very satisfied overall!"
              }
        ],
    openHours: "Mon–Sat 10 AM–8 PM; Sun Closed"
  },
  {
    id: 4,
    name: "Agarwal Medical Store",
    image: "https://media.istockphoto.com/id/537738697/photo/heroes-are-ordinary-people-who-make-themselves-extraordinary.jpg?s=612x612&w=0&k=20&c=x3VSEwMniwNg4JEy_IDSGPLof8tiVaFDXCHmhUwSAQk=",
    alt: "Medical shop front",
    rating: 4.6,
    reviewsCount: 25,
    verified: true,
    claimed: true,
    address: "Near Sindhi Bazar, Hospital Road, Agra, UP",
    phone: "+91 93194 23351",
    website: "http://www.helpagra.org",
    location: "Sindhi Bazar, Agra",
    openUntil: "9 PM",
    years: 7,
    price: 0,
    hours: "Open Now • 7 AM – 9 PM",
    photos: [
      "https://t4.ftcdn.net/jpg/01/33/33/41/360_F_133334155_X23HzbJKawbIgXVaub4bPM8CjpkS5uMS.jpg",
      "https://insidefmcg.com.au/wp-content/uploads/2022/01/ezgif.com-gif-maker.jpg",
      "https://www.indiafilings.com/learn/wp-content/uploads/2015/04/starting-a-pharmacy-business.jpg",
      "https://media.istockphoto.com/id/941741416/photo/so-many-choices.jpg?s=612x612&w=0&k=20&c=EMec13qZyGdgn92QCY3xaphpyjB_c6hR1w_Eohqrg5Q=",
      "https://kenresearchreport.wordpress.com/wp-content/uploads/2018/10/hong-kong-health-and-beauty-retailing-market.jpg",
      "https://www.hawaiipacifichealth.org/media/19340/hidden-nutritional-pitfalls-of-health-foods-v2-web.jpg",
      "https://www.hawaiipacifichealth.org/media/19340/hidden-nutritional-pitfalls-of-health-foods-v2-web.jpg"
    ],
    businessHours:[
            ['Monday', '09:00AM - 05:00PM'],
            ['Tuesday', '09:00AM - 05:00PM'],
            ['Wednesday', '09:00AM - 05:00PM'],
            ['Thursday', '09:00AM - 05:00PM'],
            ['Friday', '09:00AM - 05:00PM'],
            ['Saturday', 'Closed'],
            ['Sunday', 'open']
          ],
    reviews :[
              {
                id: 1,
                name: "Rahul",
                image: "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg",
                rating: 5,
                date: "February 13, 2025",
                time: "11:32 AM",
                text: "Absolutely fantastic service—staff were prompt and helpful!"
              },
              {
                id: 2,
                name: "Bbbb",
                image: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740",
                rating: 4,
                date: "February 4, 2025",
                time: "6:55 PM",
                text: "Very good experience overall, although a few minutes wait at the start."
              },
              {
                id: 3,
                name: "Anil",
                image: "https://sb.kaleidousercontent.com/67418/1920x1545/c5f15ac173/samuel-raita-ridxdghg7pw-unsplash.jpg",
                rating: 5,
                date: "January 28, 2025",
                time: "2:45 PM",
                text: "User-friendly environment and the equipment was well-maintained."
              },
              {
                id: 4,
                name: "Priya",
                image: "https://slazzer.com/blog/wp-content/uploads/2022/11/Professional-Profile-Picture-005.jpg",
                rating: 4.5,
                date: "March 2, 2025",
                time: "10:15 AM",
                text: "Great staff and very clean space; will definitely return."
              },
              {
                id: 5,
                name: "Sunil",
                image: "https://www.shutterstock.com/image-photo/happy-mid-aged-business-man-600nw-2307212331.jpg",
                rating: 3.5,
                date: "March 10, 2025",
                time: "1:20 PM",
                text: "Good value for money, but the waiting area could use improvements."
              },
              {
                id: 6,
                name: "Deepa",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-RIdqrd20g6TFnlMLDSGLkhNCEbcDFPbp7w&s",
                rating: 5,
                date: "March 15, 2025",
                time: "9:05 AM",
                text: "Highly recommend! Friendly, professional, and efficient service."
              },
              {
                id: 7,
                name: "Rahul",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw6rKo4oAZitzIx6Y6LB5xPtHKNNuatMHTDw&s",
                rating: 4,
                date: "February 20, 2025",
                time: "5:30 PM",
                text: "Solid experience—staff knew what they were doing."
              },
              {
                id: 8,
                name: "Meera",
                image: "https://profiles.open.ac.uk/storage/profile_pictures/67678606e7a57.jpg",
                rating: 5,
                date: "March 18, 2025",
                time: "11:00 AM",
                text: "Exceptional environment, polite staff, very satisfied overall!"
              }
        ],
    openHours: "Mon–Sun 7 AM–9 PM"
  },
  {
    id: 5,
    name: "Help Agra Pharmacy",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGM3LjhLQR8Jn_8eiu8XS8Bf05KBunfOpTOA&s",
    alt: "NGO-run 24‑hour pharmacy",
    rating: 4.1,
    reviewsCount: 64,
    verified: true,
    claimed: true,
    address: "Emergency Road, Near Sarojini Naidu Medical College, Moti Katra, Agra, UP",
    phone: "+91 562 400 0102",
    website: "http://www.helpagra.org",
    location: "Moti Katra, Agra",
    openUntil: "24 Hours",
    years: 8,
    price: 0,
    hours: "Open Now • 24 Hours",
    photos: [
      "https://wallpapers.com/images/hd/doctor-with-globe-in-hand-hd-medical-dff7ahiwc5xsfjm0.jpg",
      "https://insidefmcg.com.au/wp-content/uploads/2022/01/ezgif.com-gif-maker.jpg",
      "https://www.indiafilings.com/learn/wp-content/uploads/2015/04/starting-a-pharmacy-business.jpg",
      "https://media.istockphoto.com/id/941741416/photo/so-many-choices.jpg?s=612x612&w=0&k=20&c=EMec13qZyGdgn92QCY3xaphpyjB_c6hR1w_Eohqrg5Q=",
      "https://kenresearchreport.wordpress.com/wp-content/uploads/2018/10/hong-kong-health-and-beauty-retailing-market.jpg",
      "https://www.hawaiipacifichealth.org/media/19340/hidden-nutritional-pitfalls-of-health-foods-v2-web.jpg",
      "https://www.hawaiipacifichealth.org/media/19340/hidden-nutritional-pitfalls-of-health-foods-v2-web.jpg"
    ],
    businessHours:[
            ['Monday', '09:00AM - 05:00PM'],
            ['Tuesday', '09:00AM - 05:00PM'],
            ['Wednesday', '09:00AM - 05:00PM'],
            ['Thursday', '09:00AM - 05:00PM'],
            ['Friday', '09:00AM - 05:00PM'],
            ['Saturday', 'Closed'],
            ['Sunday', 'open']
          ],
    reviews :[
              {
                id: 1,
                name: "Rahul",
                image: "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg",
                rating: 5,
                date: "February 13, 2025",
                time: "11:32 AM",
                text: "Absolutely fantastic service—staff were prompt and helpful!"
              },
              {
                id: 2,
                name: "Bbbb",
                image: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740",
                rating: 4,
                date: "February 4, 2025",
                time: "6:55 PM",
                text: "Very good experience overall, although a few minutes wait at the start."
              },
              {
                id: 3,
                name: "Anil",
                image: "https://sb.kaleidousercontent.com/67418/1920x1545/c5f15ac173/samuel-raita-ridxdghg7pw-unsplash.jpg",
                rating: 5,
                date: "January 28, 2025",
                time: "2:45 PM",
                text: "User-friendly environment and the equipment was well-maintained."
              },
              {
                id: 4,
                name: "Priya",
                image: "https://slazzer.com/blog/wp-content/uploads/2022/11/Professional-Profile-Picture-005.jpg",
                rating: 4.5,
                date: "March 2, 2025",
                time: "10:15 AM",
                text: "Great staff and very clean space; will definitely return."
              },
              {
                id: 5,
                name: "Sunil",
                image: "https://www.shutterstock.com/image-photo/happy-mid-aged-business-man-600nw-2307212331.jpg",
                rating: 3.5,
                date: "March 10, 2025",
                time: "1:20 PM",
                text: "Good value for money, but the waiting area could use improvements."
              },
              {
                id: 6,
                name: "Deepa",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-RIdqrd20g6TFnlMLDSGLkhNCEbcDFPbp7w&s",
                rating: 5,
                date: "March 15, 2025",
                time: "9:05 AM",
                text: "Highly recommend! Friendly, professional, and efficient service."
              },
              {
                id: 7,
                name: "Rahul",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw6rKo4oAZitzIx6Y6LB5xPtHKNNuatMHTDw&s",
                rating: 4,
                date: "February 20, 2025",
                time: "5:30 PM",
                text: "Solid experience—staff knew what they were doing."
              },
              {
                id: 8,
                name: "Meera",
                image: "https://profiles.open.ac.uk/storage/profile_pictures/67678606e7a57.jpg",
                rating: 5,
                date: "March 18, 2025",
                time: "11:00 AM",
                text: "Exceptional environment, polite staff, very satisfied overall!"
              }
        ],
    openHours: "Open 24 Hours (Everyday)"
  }
];


