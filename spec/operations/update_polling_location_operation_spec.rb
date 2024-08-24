# spec/operations/update_polling_location_operation_spec.rb
require 'rails_helper'

RSpec.describe UpdatePollingLocationOperation, type: :operation do
  let(:riding) { create(:riding) }
  let(:polling_location) { create(:polling_location, riding: riding) }
  let(:valid_params) do
    {
      title: "New Title",
      address: "123 New Address",
      city: "New City",
      postal_code: "A1A 1A1",
      polls: "1, 2, 3"
    }
  end

  describe '#call' do
    context 'when the operation is successful' do
      it 'updates the polling location and polls' do
        operation = described_class.new(riding: riding, polling_location: polling_location, params: valid_params)
        result = operation.call

        expect(result[:status]).to eq(:ok)
        expect(result[:message]).to eq('Polling location was successfully updated.')
        expect(polling_location.reload.title).to eq('New Title')
        expect(polling_location.polls.pluck(:number)).to contain_exactly("1", "2", "3")  # Compare strings
      end
    end

    context 'when the polling location update fails' do
      it 'returns validation errors' do
        invalid_params = valid_params.merge(title: '')
        operation = described_class.new(riding: riding, polling_location: polling_location, params: invalid_params)
        result = operation.call

        expect(result[:status]).to eq(:unprocessable_entity)
        expect(result[:errors]).to include("Title can't be blank")
      end
    end

    context 'when duplicated poll numbers are provided' do
      it 'removes the duplicated number and still consider it valid' do
        valid_params[:polls] = '1,1,2,3,3'

        operation = described_class.new(riding: riding, polling_location: polling_location, params: valid_params)
        result = operation.call

        expect(result[:status]).to eq(:ok)
        expect(result[:message]).to eq('Polling location was successfully updated.')
        expect(polling_location.reload.title).to eq('New Title')
        expect(polling_location.polls.pluck(:number)).to contain_exactly("1", "2", "3")
      end
    end

    context 'when invalid poll numbers are provided' do
      it 'normalizes the poll numbers and only create the valid poll numbers' do
        invalid_params = valid_params.merge(polls: '1,     two,    323')
        operation = described_class.new(riding: riding, polling_location: polling_location, params: invalid_params)
        result = operation.call

        expect(result[:status]).to eq(:ok)
        expect(polling_location.polls.pluck(:number)).to contain_exactly("1", "323")
      end
    end

    context 'when an exception occurs during the update process' do
      it 'returns an error message' do
        allow_any_instance_of(PollingLocation).to receive(:save).and_raise(StandardError, "Something went wrong")
        operation = described_class.new(riding: riding, polling_location: polling_location, params: valid_params)
        result = operation.call

        expect(result[:status]).to eq(:unprocessable_entity)
        expect(result[:errors]).to include("An error occurred: Something went wrong")
      end
    end
  end
end
