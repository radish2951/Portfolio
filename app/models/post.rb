class Post < ApplicationRecord
  belongs_to :category
  has_many :images, dependent: :destroy
  has_one :thumbnail, dependent: :destroy

  validates :title, presence: true, uniqueness: true
  validates :category_id, presence: true

  before_save :remove_windows_newline_from_description

  def has_thumbnail?
    !self.thumbnail.nil?
  end

  private

  def remove_windows_newline_from_description
    self.description.delete!("\r")
  end

end
