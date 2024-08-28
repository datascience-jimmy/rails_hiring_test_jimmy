class Poll < ApplicationRecord
  belongs_to :riding
  belongs_to :polling_location, optional: true

  validates :number, presence: true, uniqueness: { scope: :riding_id, message: "Poll number must be unique within a riding" }
end
