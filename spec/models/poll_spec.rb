# spec/models/poll_spec.rb
require 'rails_helper'

RSpec.describe Poll, type: :model do
  let(:riding) { create(:riding) }

  context 'validations' do
    it 'is valid with valid attributes' do
      poll = create(:poll, number: "1", riding: riding)
      expect(poll).to be_valid
    end

    it 'is invalid with a duplicate number within the same riding' do
      create(:poll, number: "1", riding: riding)
      duplicate_poll = build(:poll, number: "1", riding: riding)

      expect(duplicate_poll).not_to be_valid
      expect(duplicate_poll.errors[:number]).to include("Poll number must be unique within a riding")
    end

    it 'is valid with the same number in different ridings' do
      another_riding = create(:riding, name: "Toronto-Centre", riding_code: "TC01", province: "Ontario")
      create(:poll, number: "1", riding: riding)
      poll_in_another_riding = build(:poll, number: "1", riding: another_riding)

      expect(poll_in_another_riding).to be_valid
    end
  end
end
