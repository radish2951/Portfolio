module PostsHelper

  def post_title_path(post)
    '/' + post.title
  end

  def current_category
    path = request.path[1...request.path.length]
    
    # if path is a category name
    if !(category = Category.find_by(name: path.singularize.capitalize)).nil?
      return category

    # if path is a post title
    elsif !(post = Post.find_by(title: URI::unescape(path))).nil?
      return Category.find_by(id: post.category_id)

    # if no match to path
    else
      nil
    end
  end

  def current_category_name
    current_category.name if !current_category.nil?
  end

  def link_to_flip(post, option = { class: nil })
    flip_text = post.published ? "非公開にする" : "公開する"
    link_to flip_text, flip_post_path(post), method: :patch, class: option[:class]
  end

  def convert_to_html(text)
    lines = text.split("\n")
    reg = /(?<tag>\S+)\s+(?<string>.+)/
    lines.each_with_index do |line, i|
      if !(match = reg.match(line)).nil?
        tags = html_templates_hash[match[:tag]]
        string = match[:string].to_s
        if tags.to_a.length == 2
          lines[i] = tags[0] + string + tags[1]
        elsif match[:tag] == "#img"
          lines[i] = image_tag(string)
        elsif match[:tag] == "#a"
          link = string.split(" ")[0]
          href = string.split(" ")[1]
          lines[i] = link_to link, href
        end
      elsif line == ""
        lines[i] = "<br>"
      end
    end

    lines.join("\n")
  end

  def html_templates_hash
    {
      "#" => ["<h1>", "</h1>"],
      "##" => ["<h2>", "</h2>"],
      "###" => ["<h3>", "</h3>"],
      "####" => ["<h4>", "</h4>"],
      "#p" => ["<p>", "</p>"],
      "#youtube" => [
        "<iframe src=\"https:\/\/www.youtube.com\/embed\/", 
        "\" frameborder=\"0\" allowfullscreen><\/iframe>"
      ]
    }            
  end

  def isIndexPage?
      path = request.path[1...request.path.length]
      categories = Category.all.map { |c| c.name }

      if path.length > 1
          return categories.include?(path.split("/")[0].singularize.capitalize)
      else
          false
      end
  end

end
