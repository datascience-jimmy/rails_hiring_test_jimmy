# app/controllers/polling_locations_controller.rb
class PollingLocationsController < ApplicationController
  before_action :set_riding
  before_action :set_polling_location, only: [:update]

  # PATCH/PUT /ridings/:riding_id/polling_locations/:id
  def update
    operation = UpdatePollingLocationOperation.new(
      riding: @riding,
      polling_location: @polling_location,
      params: polling_location_params
    )

    result = operation.call

    render json: result[:response_message], status: result[:status]
  end

  private

  def set_riding
    @riding = Riding.find_by(id: params[:riding_id])
    render json: { error: "Riding not found." }, status: :not_found unless @riding
  end

  def set_polling_location
    @polling_location = PollingLocation.find_by(id: params[:id])
    render json: { error: "Polling location not found." }, status: :not_found  unless @polling_location
  end

  def polling_location_params
    params.require(:polling_location).permit(:title, :address, :city, :postal_code, :polls)
  end
end
