module CategoriesHelper

  def category_name_path(category)
    '/' + category.name.downcase
  end

end
