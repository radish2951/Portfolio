class Image < ApplicationRecord
  belongs_to :post

  IMAGE_FORMAT = /\A.+\.(jpg|jpeg|JPG|JPEG|png|PNG|gif|GIF|tif|tiff|TIF|TIFF)\z/ 
  validates :name, presence: true,
                   format: { with: IMAGE_FORMAT }
  validates :post_id, presence: true
end
