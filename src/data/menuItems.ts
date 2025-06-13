import { MenuItem } from '../types';

// Spezialitäten (Doner Dishes)
export const donerDishes: MenuItem[] = [
            {
              id: 80,
              number: "80",
              name: "Gyros Teller",
              description: "mit Zaziki und Krautsalat, dazu Pommes",
              price: 13.00
            },
            {
              id: 81,
              number: "81",
              name: "Gyros Hollandaise",
              description: "in Sauce Hollandaise mit Käse überbacken",
              price: 14.00
            },
            {
              id: 82,
              number: "82",
              name: "Gyros Topf",
              description: "mit fr. Champignons in Sauce Hollandaise mit Käse überbacken",
              price: 14.00
            },
            {
              id: 83,
              number: "83",
              name: "Gyros Box",
              description: "mit Gyros, Pommes, Zaziki und Salat",
              price: 7.90
            },
            {
              id: 84,
              number: "84",
              name: "Spareribs (Rippchen 450g)",
              description: "mit BBQ Sauce, Pommes und Krautsalat",
              price: 14.90
            },
            {
              id: 85,
              number: "85",
              name: "Currywurst",
              description: "mit Curry Sauce und Pommes",
              price: 9.90
            }
          ];
        
 // Dips (Saucen)
export const dips: MenuItem[] = [
            {
              id: 201,
              number: "201",
              name: "Mayo",
              description: "",
              price: 1.50
            },
            {
              id: 202,
              number: "202",
              name: "Ketchup",
              description: "",
              price: 1.50
            },
            {
              id: 203,
              number: "203",
              name: "Knobi",
              description: "",
              price: 1.50
            },
            {
                id: 204,
                number: "204",
                name: "Hollandaise",
                description: "",
                price: 1.50
            },
            {
              id: 205,
              number: "205",
              name: "Chilli",
              description: "",
              price: 1.50
            },
            {
              id: 206,
              number: "206",
              name: "Tzaziki",
              description: "",
              price: 1.50
            },
            {
              id: 207,
              number: "207",
              name: "BBQ",
              description: "",
              price: 1.50
            }
          ];
 // Desserts (Desserts und Süßspeisen)
 export const desserts: MenuItem[] = [
            {
              id: 301,
              number: "D1",
              name: "Rote Grütze",
              description: "mit Vanillesauce",
              price: 4.90
            },
            {
              id: 302,
              number: "D2",
              name: "Milchreis",
              description: "mit Zimt und Zucker",
              price: 4.90
            },
            {
              id: 303,
              number: "D3",
              name: "Schokopudding",
              description: "mit Vanillesauce",
              price: 4.90
            },
            {
              id: 304,
              number: "D4",
              name: "Oreo Schokoladen Muffin",
              description: "",
              price: 3.90
            },
            {
              id: 305,
              number: "D5",
              name: "Milka Schokoladen Muffin",
              description: "",
              price: 3.90
            }
          ];
      
// Salate (Salads)
export const salads: MenuItem[] = [
  {
    id: 1,
    number: "90",
    name: "Gebackene Camembert",
    description: "2 Stück, mit Salat und Preiselbeeren",
    price: 10.90,
    allergens: "1,2,3/A,C,F"
  },
  {
    id: 2,
    number: "91",
    name: "Fjorda",
    description: "mit Räucherlachs, gemischtem Salat, Rösti und Meerrettich",
    price: 11.90,
    allergens: "1,2,3/A,C,F"
  },
  {
    id: 3,
    number: "92",
    name: "Chefsalat",
    description: "mit Schinken und Käse",
    price: 10.90,
    allergens: "1,2,3/C,H,F"
  },
  {
    id: 4,
    number: "93",
    name: "Thunfischsalat",
    description: "mit Thunfisch und Hirtenkäse",
    price: 10.90,
    allergens: "1,2,3/C,F,G"
  },
  {
    id: 5,
    number: "94",
    name: "Tomate-Mozzarella",
    description: "mit frischen Tomaten, Mozzarella, Basilikum und Olivenöl",
    price: 10.90,
    allergens: "1,2,3/C,F"
  },
  {
    id: 6,
    number: "95",
    name: "Gemischter Salat",
    description: "",
    price: 7.90,
    allergens: "1,2,3/C,F"
  }
];

// Spätzle (Spatzle)
export const spatzle: MenuItem[] = [
  {
    id: 7,
    number: "60",
    name: "Gebackene Camembert",
    description: "2 Stück, mit Salat und Preiselbeeren",
    price: 10.90,
    allergens: "1,2,3/A,C,F"
  },
  {
    id: 2,
    number: "91",
    name: "Fjorda",
    description: "mit Räucherlachs, gemischtem Salat, Rösti und Meerrettich",
    price: 11.90,
    allergens: "1,2,3/A,C,F"
  },
  {
    id: 3,
    number: "92",
    name: "Chefsalat",
    description: "mit Schinken und Käse",
    price: 10.90,
    allergens: "1,2,3/C,H,F"
  },
  {
    id: 4,
    number: "93",
    name: "Thunfischsalat",
    description: "mit Thunfisch und Hirtenkäse",
    price: 10.90,
    allergens: "1,2,3/C,F,G"
  },
  {
    id: 5,
    number: "94",
    name: "Tomate-Mozzarella",
    description: "mit frischen Tomaten, Mozzarella, Basilikum und Olivenöl",
    price: 10.90,
    allergens: "1,2,3/C,F"
  },
  {
    id: 6,
    number: "95",
    name: "Gemischter Salat",
    description: "",
    price: 7.90,
    allergens: "1,2,3/C,F"
  }
];


// Dips & Soßen (Dips & Sauces)
export const dips2: MenuItem[] = [
  {
    id: 6,
    number: "38",
    name: "Tzatziki",
    price: 1.25,
    allergens: "1,2/C,F"
  },
  {
    id: 7,
    number: "39",
    name: "Chili-Sauce",
    price: 1.25,
    allergens: "1,2/F"
  },
  {
    id: 8,
    number: "40",
    name: "Ketchup",
    price: 1.25,
    allergens: "1,2,4/F"
  },
  {
    id: 9,
    number: "41",
    name: "Mayonnaise",
    price: 1.25,
    allergens: "1,2,4/F"
  }
];

// Getränke (Drinks)
export const drinks: MenuItem[] = [
  {
    id: 10,
    number: "42",
    name: "Coca-Cola",
    description: "0,33 L",
    price: 2.50
  },
  {
    id: 11,
    number: "43",
    name: "Coca-Cola Zero",
    description: "0,33 L",
    price: 2.50
  },
  {
    id: 12,
    number: "44",
    name: "Fanta Orange",
    description: "0,33 L",
    price: 2.50
  },
  {
    id: 13,
    number: "45",
    name: "Sprite",
    description: "0,33 L",
    price: 2.50
  },
  {
    id: 14,
    number: "46",
    name: "Mezzo-mix",
    description: "0,33 L",
    price: 2.50
  },
  {
    id: 15,
    number: "47",
    name: "Apfelschorle",
    description: "0,33 L",
    price: 2.50
  },
  {
    id: 16,
    number: "48",
    name: "Eistee Zitrone",
    description: "0,33 L",
    price: 2.50
  },
  {
    id: 17,
    number: "49",
    name: "Eistee Pfirsich",
    description: "0,33 L",
    price: 2.50
  },
  {
    id: 18,
    number: "50",
    name: "Capri-Sonne",
    description: "0,20 L",
    price: 2.00
  },
  {
    id: 19,
    number: "51",
    name: "Ayran",
    description: "0,25 L",
    price: 2.00
  },
  {
    id: 20,
    number: "52",
    name: "Bier",
    description: "0,33 L",
    price: 2.50
  },
  {
    id: 21,
    number: "53",
    name: "Bier alkoholfrei",
    description: "0,33 L",
    price: 2.50
  },
  {
    id: 22,
    number: "54",
    name: "Radler",
    description: "0,33 L",
    price: 2.50
  },
  {
    id: 23,
    number: "55",
    name: "Hefeweizen",
    description: "0,50 L",
    price: 3.50
  },
  {
    id: 24,
    number: "56",
    name: "Hefeweizen alkoholfrei",
    description: "0,50 L",
    price: 3.50
  }
];

// Hamburger (Burgers)
export const burgers: MenuItem[] = [
  {
    id: 32,
    number: "8",
    name: "Hamburger",
    description: "110g Burger-Patty",
    price: 6.00,
    allergens: "1,2,3,4/B/A,B,C,F,G"
  },
  {
    id: 33,
    number: "9",
    name: "Cheeseburger",
    description: "110g Burger-Patty mit Schmelzkäse",
    price: 6.50,
    allergens: "1,2,3,4/B/A,B,C,F,G"
  },
  {
    id: 34,
    number: "10",
    name: "Currywurst & Pommes",
    description: "mit würziger Currysoße und knusprigen Pommes frites",
    price: 8.50,
    allergens: "1,2,3,4/B/A,B,C,F"
  },
  {
    id: 35,
    number: "11",
    name: "Hamburger Menü",
    description: "110g Burger-Patty, Pommes frites und Getränk",
    price: 11.00,
    allergens: "1,2,3,4/B/A,B,C,F,G"
  },
  {
    id: 36,
    number: "12",
    name: "Cheeseburger Menü",
    description: "110g Burger-Patty mit Schmelzkäse, Pommes frites und Getränk",
    price: 11.50,
    allergens: "1,2,3,4/B/A,B,C,F,G"
  },
  {
    id: 37,
    number: "13",
    name: "Currywurst Menü",
    description: "mit würziger Currysoße, knusprigen Pommes frites und Getränk",
    price: 9.50,
    allergens: "1,2,3,4/B/A,B,C,F"
  },
  {
    id: 38,
    number: "14",
    name: "Pommes frites",
    price: 4.00,
    allergens: "1,2,3,4"
  },
  {
    id: 39,
    number: "15",
    name: "Chicken-Nuggets",
    price: 6.00,
    allergens: "1,2,3,4/B/A,B,C,G"
  }
];

// Pizza
export const pizzas: MenuItem[] = [
        {
          id: 501,
          number: "00",
          name: "Wunsch Pizza",
          description: "mit 4 Zutaten nach Wahl",
          price: { medium: 9.90, large: 11.90, family: 21.90, mega: 30.90 }
        },
        {
          id: 502,
          number: "01",
          name: "Margharita",
          description: "",
          price: { medium: 8.90, large: 9.90, family: 17.90, mega: 26.90 }
        },
        {
          id: 503,
          number: "02",
          name: "Salami",
          description: "mit Rindersalami",
          price: { medium: 9.90, large: 11.90, family: 18.90, mega: 28.90 }
        },
        {
          id: 504,
          number: "03",
          name: "Schinken",
          description: "mit Formfleisch-Vorderschinken",
          price: { medium: 9.90, large: 11.90, family: 18.90, mega: 28.90 }
        },
        {
          id: 505,
          number: "04",
          name: "Bomba",
          description: "mit Rindersalami und Peperoni (scharf)",
          price: { medium: 9.90, large: 11.90, family: 18.90, mega: 28.90 }
        },
        {
          id: 506,
          number: "05",
          name: "Sucuk",
          description: "mit Knoblauchwurst, Tomaten und Zwiebeln",
          price: { medium: 9.90, large: 11.90, family: 18.90, mega: 28.90 }
        },
        {
          id: 507,
          number: "06",
          name: "Casa",
          description: "mit Rindersalami, fr. Champignons und Paprika",
          price: { medium: 9.90, large: 11.90, family: 18.90, mega: 28.90 }
        },
        {
          id: 508,
          number: "07",
          name: "Mais",
          description: "mit Formfleisch-Vorderschinken, Mais und Sauce Hollandaise",
          price: { medium: 9.90, large: 11.90, family: 18.90, mega: 28.90 }
        },
        {
          id: 509,
          number: "08",
          name: "Monopoly",
          description: "mit Formfleisch-Vorderschinken, Rindersalami, fr. Champignons und Paprika",
          price: { medium: 9.90, large: 11.90, family: 18.90, mega: 28.90 }
        },
        {
          id: 510,
          number: "09",
          name: "Hawaii",
          description: "mit Formfleisch-Vorderschinken und Ananas",
          price: { medium: 9.90, large: 11.90, family: 18.90, mega: 28.90 }
        },
        {
          id: 511,
          number: "10",
          name: "Parma",
          description: "mit Original Parmaschinken, Tomaten, Mozzarella, Rucola",
          price: { medium: 10.90, large: 12.90, family: 21.90, mega: 30.90 }
        },
        {
          id: 512,
          number: "11",
          name: "Italia",
          description: "mit Formfleisch-Vorderschinken, Rindersalami, fr. Champignons",
          price: { medium: 9.90, large: 11.90, family: 18.90, mega: 28.90 }
        },
        {
          id: 513,
          number: "12",
          name: "Chilli-Cheese",
          description: "Chilli-Cheese Sauce, Sucuk, Jalapenos und Zwiebeln",
          price: { medium: 9.90, large: 11.90, family: 19.90, mega: 29.90 }
        },
        {
          id: 514,
          number: "13",
          name: "Gyros",
          description: "mit Gyros und Zwiebeln",
          price: { medium: 9.90, large: 11.90, family: 18.90, mega: 28.90 }
        },
        {
          id: 515,
          number: "14",
          name: "Hollandaise",
          description: "mit Hähnchenbrust, Jalapenos und Sauce Hollandaise",
          price: { medium: 10.90, large: 12.90, family: 20.90, mega: 30.90 }
        },
        {
          id: 516,
          number: "15",
          name: "Polo",
          description: "mit Hähnchenbrust, Sucuk, Broccoli, Paprika",
          price: { medium: 10.90, large: 12.90, family: 20.90, mega: 30.90 }
        },
        {
          id: 517,
          number: "16",
          name: "Palermo",
          description: "mit Hähnchenbrust, fr. Champignons und Paprika, Jalapenos und Sauce Hollandaise",
          price: { medium: 10.90, large: 12.90, family: 20.90, mega: 30.90 }
        },
        {
          id: 518,
          number: "17",
          name: "Desperado",
          description: "mit Hähnchenbrust, fr. Paprika, Zwiebeln und Sauce Hollandaise",
          price: { medium: 10.90, large: 12.90, family: 20.90, mega: 30.90 }
        },
          {
          id: 519,
          number: "18",
          name: "Tonno",
          description: "mit Thunfisch und Zwiebeln",
          price: { medium: 9.90, large: 11.90, family: 18.90, mega: 28.90 }
        },
        {
          id: 520,
          number: "19",
          name: "Shrimps",
          description: "mit Shrimps und Knoblauch",
          price: { medium: 10.90, large: 13.90, family: 21.90, mega: 30.90 }
        },
        {
          id: 521,
          number: "20",
          name: "Frutti di Mare",
          description: "mit Meeresfrüchten und Knoblauch",
          price: { medium: 10.90, large: 13.90, family: 21.90, mega: 30.90 }
        },
                {
          id: 522,
          number: "21",
          name: "Funghi",
          description: "mit fr.Champignons",
          price: { medium: 9.90, large: 11.90, family: 18.90, mega: 28.90 }
        },
        {
          id: 523,
          number: "22",
          name: "Vier Jahreszeiten",
          description: "mit fr.Champignons, Paprika, Tomaten, Artischocken",
          price: { medium: 9.90, large: 11.90, family: 18.90, mega: 28.90 }
        },
        {
          id: 524,
          number: "23",
          name: "Spinat",
          description: "mit Spinat, Hirtenkäse°, Knoblauch und Zwiebeln",
          price: { medium: 9.90, large: 11.90, family: 18.90, mega: 28.90 }
        },
        {
          id: 525,
          number: "24",
          name: "Quattro Formaggi",
          description: "mit Mozzarella°, Gorgonzola°, Hirtenkäse° und Edamer°",
          price: { medium: 9.90, large: 11.90, family: 18.90, mega: 28.90 }
        },
        {
          id: 526,
          number: "25",
          name: "Roma",
          description: "mit Broccoli, fr.Paprika und Mais",
          price: { medium: 9.90, large: 11.90, family: 18.90, mega: 28.90 }
        },
        {
          id: 527,
          number: "26",
          name: "Fitness",
          description: "mit fr.Tomaten, Mozzarella°, Rucola, Mais",
          price: { medium: 9.90, large: 11.90, family: 18.90, mega: 28.90 }
        },
        {
          id: 528,
          number: "27",
          name: "Vegetarisch",
          description: "mit Broccoli, Spinat, Milden Peperoni²,³",
          price: { medium: 9.90, large: 11.90, family: 18.90, mega: 28.90 }
        }
  
];

// Pide
export const pides: MenuItem[] = [
  {
    id: 53,
    number: "29",
    name: "Pide mit Käse",
    price: 8.50,
    allergens: "1,2,3/A,C"
  },
  {
    id: 54,
    number: "30",
    name: "Pide mit Sucuk",
    description: "mit Knoblauchwurst",
    price: 9.50,
    allergens: "1,2,3,4/A,C,F"
  },
  {
    id: 55,
    number: "31",
    name: "Pide mit Spinat",
    description: "mit Spinat, Weichkäse & Ei",
    price: 11.00,
    allergens: "1,2,3,4/A,C,F,G"
  },
  {
    id: 56,
    number: "32",
    name: "Pide mit Hackfleisch",
    description: "mit Rinderhackfleisch",
    price: 11.00,
    allergens: "1,2,3,4/A,C,G"
  }
];