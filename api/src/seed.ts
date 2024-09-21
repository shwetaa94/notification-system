import prisma from "./db";

async function seed() {
  const user = {
    email: process.env.EMAIL || "", // Use environment variable for email or default to an empty string
    phone: process.env.PHONE || "", // Use environment variable for mobile number or default to an empty string
    name: "Shweta ", // Hardcoded name for the user
  };

  // Create a new user in the database
  const createdUser = await prisma.user.create({
    data: user, // Pass user data to the Prisma client to create the user
  });

  // Create notification preferences for the newly created user
  await prisma.notificationPreferences.create({
    data: {
      userId: createdUser.id, // Link preferences to the newly created user using userId
      email: true, // Enable email notifications
      whatsapp: true, // Enable WhatsApp notifications
      sms: true, // Enable SMS notifications
    },
  });

  // Log a message indicating that the seeding process is complete
  console.log("SEEDING Complete");
}

// Execute the seed function
seed().catch(console.error);