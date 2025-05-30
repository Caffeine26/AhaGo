
 const drivers = [
  {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    email: "john@example.com",
    phone: "1234567890",
    address: "123 Main St",
    country: "USA",
    city: "New York",
    idCard: "A1234567",
    passport: "P9876543",
    vehicleType: "Bike",
    vehicleName: "Yamaha",
    vehicleColor: "Red",
    licensePlate: "XYZ 1234",
  },
];

 let notifications = [
  {
    id: 1,
    title: "New Delivery Assigned!",
    details: {
      pickUp: "YellowCab STM ( Khan Toul Kork, Phnom Penh)",
      destination: "St 253, Building A, Khan Toul Kork, Phnom Penh",
      customer: "Boss baby",
    },
    message: "Please confirm if you are available to take this delivery",
    status: "pending",
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "You’ve accepted the order!",
    message:
      "The restaurant is preparing the order. Please go to the pickup location.",
    status: "accepted",
    createdAt: new Date(Date.now() - 3600 * 1000),
  },
];

 let incomingOrders = [
  {
    id: 1,
    title: "New Order Incoming!",
    details: {
      pickUp: "Pizza House, St 93, Phnom Penh",
      restaurantLocation: {
        lat: 11.567063,
        lng: 104.898188,
      },
      destination: "St 360, BKK1, Phnom Penh",
      clientLocation: {
        lat: 11.561187,
        lng: 104.901313,
      },
      customer: "Jane Smith",
    },
    status: "pending",
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "New Order Incoming!",
    details: {
      pickUp: "Sushi Bar, St 214",
      restaurantLocation: {
        lat: 11.567063,
        lng: 104.898188,
      },
      destination: "St 360, BKK1, Phnom Penh",
      clientLocation: {
        lat: 11.561187,
        lng: 104.901313,
      },
      customer: "Mike Ross",
    },
    message: "Urgent delivery needed. Accept now if you're nearby.",
    status: "pending",
    createdAt: new Date(Date.now() - 60 * 60 * 1000),
  },
];

 let deliveryHistory = [
  {
    orderId: "0001",
    fireId: "1",
    location: "Boeung Keng Korng, St XX, Phnom Penh",
    price: 16.5,
    items: ["Potato Salad", "Tteokbokki", "Fried Chicken"],
  },
  {
    orderId: "0002",
    fireId: "2",
    location: "Toul Tompoung, St YY, Phnom Penh",
    price: 21.0,
    items: ["Burger", "French Fries", "Coke"],
  },
];

 const sections = [
  {
    title: "Before you get started",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    linkText: "Before you get started overview",
    linkTo: "basics/before-you-get-started",
    buttons: [
      {
        imageSrc: "https://i.pinimg.com/736x/b2/a4/df/b2a4df2ac895d9bd291bfbefce1ba483.jpg",
        name: "Run a Vehicle Safety Check",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        link: "run-safety-check",
        description: [
          {
            title: "Meow",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            svg: "cloud"
          },
          {
            title: "Meow",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            svg: "cloud"
          },
          {
            title: "Meow",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            svg: "cloud"
          },
        ]
      },
      {
        imageSrc: "https://i.pinimg.com/736x/b2/a4/df/b2a4df2ac895d9bd291bfbefce1ba483.jpg",
        name: "Check delivery equipment",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        link: "check-equipment",
        description: [
          {
            title: "Crash",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            svg: "cloud"
          },
          {
            title: "Crash",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            svg: "cloud"
          },
          {
            title: "Crash",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            svg: "cloud"
          },
        ]
      },
    ],
  },
  {
    title: "Making deliveries",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    linkText: "Making deliveries overview",
    linkTo: "basics/making-delivery",
    buttons: [
      {
        imageSrc: "https://i.pinimg.com/736x/b2/a4/df/b2a4df2ac895d9bd291bfbefce1ba483.jpg",
        name: "Delivering multiple orders",
        link: "deliver-multiple-orders",
        description: [
          {
            title: "Crash",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            svg: "cloud"
          },
          {
            title: "Meow",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            svg: "cloud"
          },
          {
            title: "Meow",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            svg: "cloud"
          },
        ]
      },
      {
        imageSrc: "https://i.pinimg.com/736x/b2/a4/df/b2a4df2ac895d9bd291bfbefce1ba483.jpg",
        name: "Information about back-to-back deliveries",
        link: "back-to-back-deliveries"
      },
      {
        imageSrc: "https://i.pinimg.com/736x/b2/a4/df/b2a4df2ac895d9bd291bfbefce1ba483.jpg",
        name: "Delivering multiple orders",
        link: "deliver-multiple-orders"
      },
      {
        imageSrc: "https://i.pinimg.com/736x/b2/a4/df/b2a4df2ac895d9bd291bfbefce1ba483.jpg",
        name: "Information about back-to-back deliveries",
        link: "back-to-back-deliveries"
      },
    ],
  },
  {
    title: "Earnings",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    linkText: "Earnings overview",
    linkTo: "basics/earnings",
    buttons: [
      {
        imageSrc: "https://i.pinimg.com/736x/b2/a4/df/b2a4df2ac895d9bd291bfbefce1ba483.jpg",
        name: "Track your earnings",
        link: "track-earnings",
        description: [
          {
            text: "Track your earnings",
            svg: "cloud"
          },
          {
            text: "Track your vehicle",
          }
        ]
      },
      {
        imageSrc: "https://i.pinimg.com/736x/b2/a4/df/b2a4df2ac895d9bd291bfbefce1ba483.jpg",
        name: "How payments work",
        link: "how-payments-work"
      },
    ],
  },
  {
    title: "Ratings, communities and more",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    linkText: "Ratings, communities and more overview",
    linkTo: "basics/ratings-communities",
    buttons: [
      {
        imageSrc: "https://i.pinimg.com/736x/b2/a4/df/b2a4df2ac895d9bd291bfbefce1ba483.jpg",
        name: "Your delivery ratings from restaurants and customers",
        link: "delivery-ratings",
      },
      {
        imageSrc: "https://i.pinimg.com/736x/b2/a4/df/b2a4df2ac895d9bd291bfbefce1ba483.jpg",
        name: "Tips from others for delivering orders",
        link: "tips-for-delivering-orders"
      },
    ],
  },
];
module.exports = {
  drivers,
  notifications,
  incomingOrders,
  deliveryHistory,
  sections,
};