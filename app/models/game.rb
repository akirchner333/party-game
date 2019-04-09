class Game < ApplicationRecord
  before_create do
    self.code = SecureRandom.hex(3).upcase
  end
end
