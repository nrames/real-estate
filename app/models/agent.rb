class Agent < ApplicationRecord
  has_many :buyers
  has_many :properties

  def self.unsold_homes
    select('agents.id, first_name, last_name, sold, COUNT(*) AS frequency')
    .joins('INNER JOIN properties p ON p.agent_id = agents.id')
    .where('sold <> TRUE')
    .group('agents.id, first_name, last_name, sold')
    .order('COUNT(*) DESC')
  end  
end
