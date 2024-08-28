require 'rails_helper'

RSpec.describe PollingLocation, type: :model do
  context 'validations' do
    it 'is valid with valid attributes' do
      polling_location = create(:polling_location, riding: create(:riding))
      expect(polling_location).to be_valid
    end

    it 'is invalid with a duplicate combination of title, address, city, and postal_code' do
      create(:polling_location, title: "Community Center", address: "123 Main St", city: "Avalon", postal_code: "A1A 1A1")

      duplicate_polling_location = build(:polling_location, title: "Community Center", address: "123 Main St", city: "Avalon", postal_code: "A1A 1A1")

      expect(duplicate_polling_location).not_to be_valid
      expect(duplicate_polling_location.errors[:title]).to include("A polling location with this combination of title, address, city, and postal code already exists.")
    end

    it 'is valid with the same title, address, city, and postal_code in different cities' do
      create(:polling_location, title: "Community Center", address: "123 Main St", city: "Avalon", postal_code: "A1A 1A1")

      polling_location_in_another_city = build(:polling_location, title: "Community Center", address: "123 Main St", city: "Toronto", postal_code: "A1A 1A1")

      expect(polling_location_in_another_city).to be_valid
    end

    it 'formats the postal_code before validation' do
      polling_location = create(:polling_location, title: "Community Center", address: "123 Main St", city: "Avalon", postal_code: "a1a1a1")
      expect(polling_location.postal_code).to eq("A1A 1A1")
    end
  end
end
