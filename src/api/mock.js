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
    documents: {
      idCardImage: null,
      drivingLicenseImage: null,
      vehicleRegistrationImage: null,
    }
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
    orderItems: [
      { name: "Pepperoni Pizza", quantity: 1, price: 8.99 },
      { name: "Garlic Bread", quantity: 1, price: 3.50 },
    ],
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
    orderItems: [
      { name: "Sushi Combo", quantity: 1, price: 12.00 },
      { name: "Miso Soup", quantity: 2, price: 2.50 },
    ],
    message: "Urgent delivery needed. Accept now if you're nearby.",
    status: "pending",
    createdAt: new Date(Date.now() - 60 * 60 * 1000),
  },
];

let deliveryHistory = [
  {
    orderIndex: "0001",
    orderId: "0001",
    orderStatus: "completed",
    orderItems: ["Potato Salad", "Tteokbokki", "Fried Chicken"],
    total: 16.5,
    paid: true,
  },
  {
    orderIndex: "0002",
    orderId: "0002",
    orderStatus: "completed",
    orderItems: ["Burger", "French Fries", "Coke"],
    total: 21.0,
    paid: true,
  },
];

const sections = [
  {
    title: "Before you get started",
    text: "Get ready for your first delivery with these essential checks and guidelines.",
    linkText: "Before you get started overview",
    linkTo: "basics/before-you-get-started",
    buttons: [
      {
        imageSrc: "https://i.pinimg.com/736x/b2/a4/df/b2a4df2ac895d9bd291bfbefce1ba483.jpg",
        name: "Run a Vehicle Safety Check",
        text: "Make sure your vehicle is road-ready before every delivery.",
        link: "run-safety-check",
        description: [
          {
            title: "Check Lights",
            text: "Ensure all lights (headlights, indicators) are working properly.",
            svg: "lightbulb"
          },
          {
            title: "Inspect Tires",
            text: "Tire pressure and tread depth should meet safety standards.",
            svg: "tire"
          },
          {
            title: "Brake Test",
            text: "Test your brakes for responsiveness and stopping power.",
            svg: "brake"
          },
        ]
      },
      {
        imageSrc: "https://i.pinimg.com/736x/b2/a4/df/b2a4df2ac895d9bd291bfbefce1ba483.jpg",
        name: "Check delivery equipment",
        text: "Inspect your bags and gear to keep food secure and warm.",
        link: "check-equipment",
        description: [
          {
            title: "Insulated Bag",
            text: "Use thermal bags to maintain food temperature.",
            svg: "bag"
          },
          {
            title: "Phone Mount",
            text: "Keep your phone safely mounted for navigation.",
            svg: "mount"
          },
          {
            title: "Charger",
            text: "Always carry a backup power bank or charger.",
            svg: "battery"
          },
        ]
      },
    ],
  },
  {
    title: "Making deliveries",
    text: "Learn how to handle multiple deliveries efficiently and on time.",
    linkText: "Making deliveries overview",
    linkTo: "basics/making-delivery",
    buttons: [
      {
        imageSrc: "https://i.pinimg.com/736x/b2/a4/df/b2a4df2ac895d9bd291bfbefce1ba483.jpg",
        name: "Delivering multiple orders",
        link: "deliver-multiple-orders",
        description: [
          {
            title: "Group Orders",
            text: "Plan your route to handle multiple deliveries smoothly.",
            svg: "map"
          },
          {
            title: "Time Management",
            text: "Use time-saving strategies during peak hours.",
            svg: "clock"
          },
          {
            title: "Customer Updates",
            text: "Keep customers informed if you're running behind.",
            svg: "chat"
          },
        ]
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
    text: "Understand how your earnings are calculated and tracked.",
    linkText: "Earnings overview",
    linkTo: "basics/earnings",
    buttons: [
      {
        imageSrc: "https://i.pinimg.com/736x/b2/a4/df/b2a4df2ac895d9bd291bfbefce1ba483.jpg",
        name: "Track your earnings",
        link: "track-earnings",
        description: [
          {
            text: "Daily, weekly, and monthly summaries available",
            svg: "graph"
          },
          {
            text: "Earnings split by completed vs canceled orders",
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
    text: "Explore how ratings work and how to connect with other drivers.",
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
