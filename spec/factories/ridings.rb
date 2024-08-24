# spec/factories/ridings.rb
FactoryBot.define do
  factory :riding do
    name { Faker::Address.community }
    riding_code { Faker::Alphanumeric.alphanumeric(number: 4).upcase }
    province { [
      "Newfoundland and Labrador",
      "Nova Scotia",
      "Prince Edward Island",
      "New Brunswick",
      "Quebec",
      "Ontario",
      "Manitoba",
      "Saskatchewan",
      "Alberta",
      "British Columbia",
      "Yukon",
      "Northwest Territories",
      "Nunavut"
    ].sample }
  end
end
