User.create!(
  [
    {
      email_address: "test@example.com",
      password: "password",
      password_confirmation: "password"
    },
    {
      email_address: "admin@example.com",
      password: "admin123",
      password_confirmation: "admin123"
    }
  ]
)
puts "Seeded users successfully."
