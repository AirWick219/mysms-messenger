User.create!(
  [
    {
      email_address: "test@example.com",
      password: "TestUser123",
      password_confirmation: "TestUser123"
    },
    {
      email_address: "admin@example.com",
      password: "adminUser123",
      password_confirmation: "adminUser123"
    }
  ]
)
puts "Seeded users successfully."
