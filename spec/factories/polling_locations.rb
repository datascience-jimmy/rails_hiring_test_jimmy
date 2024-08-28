# spec/factories/polling_locations.rb
FactoryBot.define do
  factory :polling_location do
    title { Faker::Address.community }
    address { Faker::Address.street_address }
    city { Faker::Address.city }
    postal_code { [
      "A1A 1A1", "B2B 2B2", "C3C 3C3", "E4E 4E4", "G5G 5G5",
      "H6H 6H6", "J7J 7J7", "K8K 8K8", "L9L 9L9", "M1M 1M1",
      "N2N 2N2", "P3P 3P3", "R4R 4R4", "S5S 5S5", "T6T 6T6",
      "V7V 7V7", "X8X 8X8", "Y9Y 9Y9"
    ].sample }
    riding
  end
end
