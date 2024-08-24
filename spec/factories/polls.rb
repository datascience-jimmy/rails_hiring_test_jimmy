# spec/factories/polls.rb
FactoryBot.define do
  factory :poll do
    number { Faker::Number.unique.number(digits: 3).to_s }
    riding
  end
end
