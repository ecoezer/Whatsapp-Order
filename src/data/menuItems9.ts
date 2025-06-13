import { MenuItem } from '../types';

// Dönergerichte (Doner Dishes)
export const donerDishes: MenuItem[] = [
  {
    id: 25,
    number: 1,
    name: "Drehspieß Tasche",
    description: "im Fladenbrot mit gemischtem Salat & Soße nach Wahl",
    price: 7.50,
    allergens: "1,2,3,4/B/A,B,C,F,G"
  },
  {
    id: 26,
    number: 2,
    name: "Drehspieß Dürüm",
    description: "Döner-Rolle mit gemischtem Salat & Soße nach Wahl",
    price: 8.00,
    allergens: "1,2,3,4/B/A,B,C,F,G"
  },
  {
    id: 27,
    number: 3,
    name: "Drehspieß Box",
    description: "mit Drehspießfleisch, Pommes frites & Soße nach Wahl",
    price: 8.50,
    allergens: "1,2,3,4/B/A,B,C,F,G"
  },
  {
    id: 28,
    number: 4,
    name: "Drehspieß Teller (mit Pommes)",
    description: "mit 300g Drehspießfleisch, Pommes frites & Soße nach Wahl",
    price: 11.50,
    allergens: "1,2,3,4/B/A,B,C,F,G"
  },
  {
    id: 29,
    number: 5,
    name: "Drehspieß Teller (mit Salat)",
    description: "mit Drehspießfleisch, Salat & Soße nach Wahl",
    price: 11.50,
    allergens: "1,2,3,4/B/A,B,C,F,G"
  },
  {
    id: 30,
    number: 6,
    name: "Vegetarische Tasche",
    description: "im Fladenbrot mit gemischtem Salat, Weichkäse & Soße nach Wahl",
    price: 6.50,
    allergens: "1,2,3,4/A,C,F,G"
  },
  {
    id: 31,
    number: 7,
    name: "Vegetarische Dürüm",
    description: "Vegetarische Rolle mit gemischtem Salat, Weichkäse & Soße nach Wahl",
    price: 7.00,
    allergens: "1,2,3,4/A,C,F,G"
  }
];

// Salate (Salads)
export const salads: MenuItem[] = [
  {
    id: 1,
    number: 90,
    name: "Gebackene Camembert",
    description: "2 Stück, mit Salat und Preiselbeeren",
    price: 10.90,
    allergens: "1,2,3/A,C,F"
  },
  {
    id: 2,
    number: 91,
    name: "Fjorda",
    description: "mit Räucherlachs, gemischtem Salat, Rösti und Meerrettich",
    price: 11.90,
    allergens: "1,2,3/A,C,F"
  },
  {
    id: 3,
    number: 92,
    name: "Chefsalat",
    description: "mit Schinken und Käse",
    price: 10.90,
    allergens: "1,2,3/C,H,F"
  },
  {
    id: 4,
    number: 93,
    name: "Thunfischsalat",
    description: "mit Thunfisch und Hirtenkäse",
    price: 10.90,
    allergens: "1,2,3/C,F,G"
  },
  {
    id: 5,
    number: 94,
    name: "Tomate-Mozzarella",
    description: "mit frischen Tomaten, Mozzarella, Basilikum und Olivenöl",
    price: 10.90,
    allergens: "1,2,3/C,F"
  },
  {
    id: 6,
    number: 95,
    name: "Gemischter Salat",
    description: "",
    price: 7.90,
    allergens: "1,2,3/C,F"
  }
];

// Dips & Soßen (Dips & Sauces)
export const dips: MenuItem[] = [
  {
    id: 6,
    number: 38,
    name: "Tzatziki",
    price: 1.25,
    allergens: "1,2/C,F"
  },
  {
    id: 7,
    number: 39,
    name: "Chili-Sauce",
    price: 1.25,
    allergens: "1,2/F"
  },
  {
    id: 8,
    number: 40,
    name: "Ketchup",
    price: 1.25,
    allergens: "1,2,4/F"
  },
  {
    id: 9,
    number: 41,
    name: "Mayonnaise",
    price: 1.25,
    allergens: "1,2,4/F"
  }
];

// Getränke (Drinks)
export const drinks: MenuItem[] = [
  {
    id: 10,
    number: 42,
    name: "Coca-Cola",
    description: "0,33 L",
    price: 2.50
  },
  {
    id: 11,
    number: 43,
    name: "Coca-Cola Zero",
    description: "0,33 L",
    price: 2.50
  },
  {
    id: 12,
    number: 44,
    name: "Fanta Orange",
    description: "0,33 L",
    price: 2.50
  },
  {
    id: 13,
    number: 45,
    name: "Sprite",
    description: "0,33 L",
    price: 2.50
  },
  {
    id: 14,
    number: 46,
    name: "Mezzo-mix",
    description: "0,33 L",
    price: 2.50
  },
  {
    id: 15,
    number: 47,
    name: "Apfelschorle",
    description: "0,33 L",
    price: 2.50
  },
  {
    id: 16,
    number: 48,
    name: "Eistee Zitrone",
    description: "0,33 L",
    price: 2.50
  },
  {
    id: 17,
    number: 49,
    name: "Eistee Pfirsich",
    description: "0,33 L",
    price: 2.50
  },
  {
    id: 18,
    number: 50,
    name: "Capri-Sonne",
    description: "0,20 L",
    price: 2.00
  },
  {
    id: 19,
    number: 51,
    name: "Ayran",
    description: "0,25 L",
    price: 2.00
  },
  {
    id: 20,
    number: 52,
    name: "Bier",
    description: "0,33 L",
    price: 2.50
  },
  {
    id: 21,
    number: 53,
    name: "Bier alkoholfrei",
    description: "0,33 L",
    price: 2.50
  },
  {
    id: 22,
    number: 54,
    name: "Radler",
    description: "0,33 L",
    price: 2.50
  },
  {
    id: 23,
    number: 55,
    name: "Hefeweizen",
    description: "0,50 L",
    price: 3.50
  },
  {
    id: 24,
    number: 56,
    name: "Hefeweizen alkoholfrei",
    description: "0,50 L",
    price: 3.50
  }
];

// Hamburger (Burgers)
export const burgers: MenuItem[] = [
  {
    id: 32,
    number: 8,
    name: "Hamburger",
    description: "110g Burger-Patty",
    price: 6.00,
    allergens: "1,2,3,4/B/A,B,C,F,G"
  },
  {
    id: 33,
    number: 9,
    name: "Cheeseburger",
    description: "110g Burger-Patty mit Schmelzkäse",
    price: 6.50,
    allergens: "1,2,3,4/B/A,B,C,F,G"
  },
  {
    id: 34,
    number: 10,
    name: "Currywurst & Pommes",
    description: "mit würziger Currysoße und knusprigen Pommes frites",
    price: 8.50,
    allergens: "1,2,3,4/B/A,B,C,F"
  },
  {
    id: 35,
    number: 11,
    name: "Hamburger Menü",
    description: "110g Burger-Patty, Pommes frites und Getränk",
    price: 11.00,
    allergens: "1,2,3,4/B/A,B,C,F,G"
  },
  {
    id: 36,
    number: 12,
    name: "Cheeseburger Menü",
    description: "110g Burger-Patty mit Schmelzkäse, Pommes frites und Getränk",
    price: 11.50,
    allergens: "1,2,3,4/B/A,B,C,F,G"
  },
  {
    id: 37,
    number: 13,
    name: "Currywurst Menü",
    description: "mit würziger Currysoße, knusprigen Pommes frites und Getränk",
    price: 9.50,
    allergens: "1,2,3,4/B/A,B,C,F"
  },
  {
    id: 38,
    number: 14,
    name: "Pommes frites",
    price: 4.00,
    allergens: "1,2,3,4"
  },
  {
    id: 39,
    number: 15,
    name: "Chicken-Nuggets",
    price: 6.00,
    allergens: "1,2,3,4/B/A,B,C,G"
  }
];

// Pizza
export const pizzas: MenuItem[] = [
  {
    id: 40,
    number: 16,
    name: "Pizza Margherita",
    price: 8.50,
    allergens: "1,2,3/A,C"
  },
  {
    id: 41,
    number: 17,
    name: "Pizza Salami",
    description: "mit Salami",
    price: 9.50,
    allergens: "1,2,3,4/A,C"
  },
  {
    id: 42,
    number: 18,
    name: "Pizza Schinken",
    description: "mit Schinken",
    price: 9.50,
    allergens: "1,2,3,4/A,C"
  },
  {
    id: 43,
    number: 19,
    name: "Pizza Funghi",
    description: "mit Champignons & Zwiebeln",
    price: 10.00,
    allergens: "1,2,3,4/A,C"
  },
  {
    id: 44,
    number: 20,
    name: "Pizza Tonno",
    description: "mit Thunfisch & Zwiebeln",
    price: 10.00,
    allergens: "1,2,3/A,C,H"
  },
  {
    id: 45,
    number: 21,
    name: "Pizza Sucuk",
    description: "mit Knoblauchwurst",
    price: 10.00,
    allergens: "1,2,3,4/A,C,F"
  },
  {
    id: 46,
    number: 22,
    name: "Pizza Hollandaise",
    description: "mit Hähnchenstreifen, Mais, Broccoli & Sauce Hollandaise",
    price: 11.00,
    allergens: "1,2,3,4/A,C,F,G"
  },
  {
    id: 47,
    number: 23,
    name: "Pizza Hawaii",
    description: "mit Ananas & Schinken",
    price: 11.00,
    allergens: "1,2,3,4/A,C"
  },
  {
    id: 48,
    number: 24,
    name: "Pizza Spinat",
    description: "mit Spinat, Zwiebeln & Weichkäse",
    price: 11.00,
    allergens: "1,2,3,4/A,C"
  },
  {
    id: 49,
    number: 25,
    name: "Pizza Brokkoli",
    description: "mit Brokkoli, Knoblauch & Schinken",
    price: 11.00,
    allergens: "1,2,3,4/A,C,F"
  },
  {
    id: 50,
    number: 26,
    name: "Calzone",
    description: "mit Champignons, Zwiebeln, Schinken, Paprika & Soße",
    price: 10.50,
    allergens: "1,2,3,4/A,C,F"
  },
  {
    id: 51,
    number: 27,
    name: "Pizza Döner",
    description: "mit Drehspieß nach Döner Art aus Puten- und Rindfleisch",
    price: 11.00,
    allergens: "1,2,3,4/B/A,B,C,F,G"
  },
  {
    id: 52,
    number: 28,
    name: "Pizza Hamburger",
    description: "mit saftigem Rindfleisch, frischen Tomaten, Zwiebeln, Gewürzgurken, Schmelzkäse und einer würzigen Burgersoße",
    price: 11.00,
    allergens: "1,2,3,4/B/A,B,C,F,G"
  }
];

// Pide
export const pides: MenuItem[] = [
  {
    id: 53,
    number: 29,
    name: "Pide mit Käse",
    price: 8.50,
    allergens: "1,2,3/A,C"
  },
  {
    id: 54,
    number: 30,
    name: "Pide mit Sucuk",
    description: "mit Knoblauchwurst",
    price: 9.50,
    allergens: "1,2,3,4/A,C,F"
  },
  {
    id: 55,
    number: 31,
    name: "Pide mit Spinat",
    description: "mit Spinat, Weichkäse & Ei",
    price: 11.00,
    allergens: "1,2,3,4/A,C,F,G"
  },
  {
    id: 56,
    number: 32,
    name: "Pide mit Hackfleisch",
    description: "mit Rinderhackfleisch",
    price: 11.00,
    allergens: "1,2,3,4/A,C,G"
  }
];