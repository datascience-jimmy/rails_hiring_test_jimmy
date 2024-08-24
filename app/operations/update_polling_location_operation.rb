class UpdatePollingLocationOperation
  def initialize(riding:, polling_location:, params:)
    @riding = riding
    @polling_location = polling_location
    @params = params
  end

  def call
    ActiveRecord::Base.transaction do
      if @riding.id != @polling_location.riding_id
        return { status: :unprocessable_entity, response_message: { errors: ["Riding mismatch error."] } }
      end

      @polling_location.assign_attributes(polling_location_params)
      if @polling_location.invalid?
        return { status: :unprocessable_entity, response_message: { errors: @polling_location.errors.full_messages } }
      end

      @polling_location.save!

      update_polls(@polling_location, normalized_poll_numbers)

      # Return success response with updated polling location data
      return {
        status: :ok,
        response_message: {
          data: {
            id: @polling_location.id,
            title: @polling_location.title,
            address: @polling_location.address,
            city: @polling_location.city,
            postal_code: @polling_location.postal_code,
            polls: @polling_location.polls.pluck(:number).join(", ")
          }
        }
      }
    end
  rescue => e
    { status: :unprocessable_entity, response_message: { errors: ["An error occurred: #{e.message}"] } }
  end

  private

  def polling_location_params
    @params.slice(:title, :address, :city, :postal_code)
  end

  def normalized_poll_numbers
    @params[:polls].to_s.split(',')
                   .map(&:strip)
                   .reject(&:empty?)
                   .map(&:to_i)
                   .reject(&:zero?)
                   .uniq
  end

  def update_polls(polling_location, poll_numbers)
    existing_polls = Poll.where(riding_id: polling_location.riding_id, polling_location_id: polling_location.id)
    existing_polls.destroy_all

    poll_numbers.each do |number|
      poll = Poll.new(riding_id: polling_location.riding_id, polling_location_id: polling_location.id, number: number)
      unless poll.save
        raise ActiveRecord::Rollback, "Failed to create poll with number #{number}: #{poll.errors.full_messages.join(', ')}"
      end
    end
  rescue ActiveRecord::Rollback => e
    { status: :unprocessable_entity, response_message: { errors: [e.message] } }
  end
end
