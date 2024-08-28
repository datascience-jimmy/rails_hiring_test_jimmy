require 'rails_helper'

RSpec.describe PollingLocationsController, type: :controller do
  let(:riding) { create(:riding) }
  let(:polling_location) { create(:polling_location, riding: riding) }
  let(:valid_params) do
    {
      riding_id: riding.id,
      id: polling_location.id,
      polling_location: {
        title: "Updated Title",
        address: "Updated Address",
        city: "Updated City",
        postal_code: "A1A 1A1",
        poll_numbers: "1, 2, 3"
      }
    }
  end

  let(:invalid_params) do
    {
      riding_id: riding.id,
      id: polling_location.id,
      polling_location: {
        title: "",
        address: "",
        city: "",
        postal_code: "Invalid Code",
        poll_numbers: "1, 1"
      }
    }
  end

  describe 'PATCH #update' do
    context 'when the riding is found' do
      context 'when the polling location is found' do
        context 'with valid parameters' do
          it 'calls the operation and returns a success message' do
            operation_double = instance_double(UpdatePollingLocationOperation)
            allow(UpdatePollingLocationOperation).to receive(:new).and_return(operation_double)
            allow(operation_double).to receive(:call).and_return({ status: :ok, message: 'Polling location was successfully updated.' })

            patch :update, params: valid_params

            expect(response).to have_http_status(:ok)
            expect(JSON.parse(response.body)['message']).to eq('Polling location was successfully updated.')
          end
        end

        context 'with invalid parameters' do
          it 'calls the operation and returns an error message' do
            operation_double = instance_double(UpdatePollingLocationOperation)
            allow(UpdatePollingLocationOperation).to receive(:new).and_return(operation_double)
            allow(operation_double).to receive(:call).and_return({ status: :unprocessable_entity, error: 'Validation failed.' })

            patch :update, params: invalid_params

            expect(response).to have_http_status(:unprocessable_entity)
            expect(JSON.parse(response.body)['error']).to eq('Validation failed.')
          end
        end
      end

      context 'when the polling location is not found' do
        it 'returns a not found error' do
          patch :update, params: { riding_id: riding.id, id: 'invalid' }

          expect(response).to have_http_status(:not_found)
          expect(JSON.parse(response.body)['error']).to eq('Polling location not found.')
        end
      end
    end

    context 'when the riding is not found' do
      it 'returns a not found error' do
        patch :update, params: { riding_id: 'invalid', id: polling_location.id }

        expect(response).to have_http_status(:not_found)
        expect(JSON.parse(response.body)['error']).to eq('Riding not found.')
      end
    end
  end
end
