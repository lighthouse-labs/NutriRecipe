class Recipe < ApplicationRecord
  belongs_to :category
  belongs_to :user
  has_many :ratings, dependent: :delete_all
  has_many :comments, dependent: :delete_all
end
