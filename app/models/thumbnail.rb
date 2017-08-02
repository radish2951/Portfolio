class ThumbnailValidator < ActiveModel::Validator
  def validate(record)
    unless Post.find_by(id: record.post_id).thumbnail.nil?
      record.errors[:base] << "Post can have at most 1 thumbnail."
    end
  end
end

class Thumbnail < Image
  validates_with ThumbnailValidator
end
